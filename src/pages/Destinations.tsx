import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DestinationCard } from '../components/DestinationCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Database } from '../lib/database.types';

type Destination = Database['public']['Tables']['destinations']['Row'];

export function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Nature Reserve', 'Landmark', 'Historical Site', 'Beach', 'City', 'Mountain'];

  useEffect(() => {
    async function fetchDestinations() {
      setLoading(true);
      let query = supabase.from('destinations').select('*').order('rating', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching destinations:', error);
      } else {
        setDestinations(data || []);
      }
      setLoading(false);
    }

    fetchDestinations();
  }, [selectedCategory]);

  return (
    <div className="page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Explore Destinations</h1>
          <p className="page-subtitle">
            Discover amazing places across Nigeria
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-label">Filter by Category:</div>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : destinations.length > 0 ? (
            <div className="destinations-grid">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No destinations found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
