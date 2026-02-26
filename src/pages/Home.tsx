import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Hero } from '../components/Hero';
import { DestinationCard } from '../components/DestinationCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Database } from '../lib/database.types';

type Destination = Database['public']['Tables']['destinations']['Row'];

export function Home() {
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedDestinations() {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('rating', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching destinations:', error);
      } else {
        setFeaturedDestinations(data || []);
      }
      setLoading(false);
    }

    fetchFeaturedDestinations();
  }, []);

  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Destinations</h2>
            <p className="section-subtitle">
              Explore some of Nigeria's most captivating places
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="destinations-grid">
                {featuredDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>

              <div className="section-cta">
                <Link to="/destinations" className="btn btn-primary">
                  View All Destinations
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏖️</div>
              <h3 className="feature-title">Beautiful Beaches</h3>
              <p className="feature-description">
                Discover pristine coastlines and tropical paradises
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3 className="feature-title">Rich History</h3>
              <p className="feature-description">
                Explore ancient kingdoms and cultural heritage sites
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌄</div>
              <h3 className="feature-title">Natural Wonders</h3>
              <p className="feature-description">
                Experience breathtaking landscapes and wildlife
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3 className="feature-title">Vibrant Culture</h3>
              <p className="feature-description">
                Immerse yourself in diverse traditions and festivals
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
