import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ReviewCard } from '../components/ReviewCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Database } from '../lib/database.types';

type Destination = Database['public']['Tables']['destinations']['Row'];
type State = Database['public']['Tables']['states']['Row'];
type Attraction = Database['public']['Tables']['attractions']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

export function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestination() {
      if (!slug) return;

      const { data: destData, error: destError } = await supabase
        .from('destinations')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (destError) {
        console.error('Error fetching destination:', destError);
        setLoading(false);
        return;
      }

      if (!destData) {
        setLoading(false);
        return;
      }

      const typedDestData = destData as Destination;
      setDestination(typedDestData);

      if (typedDestData.state_id) {
        const { data: stateData } = await supabase
          .from('states')
          .select('*')
          .eq('id', typedDestData.state_id)
          .maybeSingle();

        setState(stateData);
      }

      const { data: attractionsData } = await supabase
        .from('attractions')
        .select('*')
        .eq('destination_id', typedDestData.id);

      setAttractions(attractionsData || []);

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .eq('destination_id', typedDestData.id)
        .order('created_at', { ascending: false });

      setReviews(reviewsData || []);

      setLoading(false);
    }

    fetchDestination();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!destination) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h2>Destination not found</h2>
            <Link to="/destinations" className="btn btn-primary">
              Back to Destinations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="destination-hero">
        <img
          src={destination.image_url || 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg'}
          alt={destination.name}
          className="destination-hero-image"
        />
        <div className="destination-hero-overlay">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/destinations">Destinations</Link>
              <span>/</span>
              {state && (
                <>
                  <Link to={`/states/${state.slug}`}>{state.name}</Link>
                  <span>/</span>
                </>
              )}
              <span>{destination.name}</span>
            </div>
            <h1 className="destination-hero-title">{destination.name}</h1>
            <div className="destination-hero-meta">
              <span className="destination-hero-category">{destination.category}</span>
              <span className="destination-hero-rating">
                ★ {destination.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="destination-content">
            <div className="destination-main">
              <div className="destination-section">
                <h2 className="destination-section-title">About</h2>
                <p className="destination-description">{destination.description}</p>
              </div>

              <div className="destination-info-grid">
                <div className="destination-info-card">
                  <h3>Location</h3>
                  <p>{destination.location}</p>
                </div>

                <div className="destination-info-card">
                  <h3>Best Time to Visit</h3>
                  <p>{destination.best_time_to_visit || 'Year-round'}</p>
                </div>

                <div className="destination-info-card">
                  <h3>Average Cost</h3>
                  <p>{destination.average_cost || 'Varies'}</p>
                </div>

                {state && (
                  <div className="destination-info-card">
                    <h3>State</h3>
                    <p>{state.name}</p>
                  </div>
                )}
              </div>

              {attractions.length > 0 && (
                <div className="destination-section">
                  <h2 className="destination-section-title">Nearby Attractions</h2>
                  <div className="attractions-list">
                    {attractions.map((attraction) => (
                      <div key={attraction.id} className="attraction-item">
                        <h3 className="attraction-name">{attraction.name}</h3>
                        <p className="attraction-type">{attraction.type}</p>
                        <p className="attraction-description">{attraction.description}</p>
                        {attraction.entry_fee && (
                          <p className="attraction-fee">Entry: {attraction.entry_fee}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reviews.length > 0 && (
                <div className="destination-section">
                  <h2 className="destination-section-title">
                    Reviews ({reviews.length})
                  </h2>
                  <div className="reviews-list">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
