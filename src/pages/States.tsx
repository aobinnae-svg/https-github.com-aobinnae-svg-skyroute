import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { StateCard } from '../components/StateCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Database } from '../lib/database.types';

type State = Database['public']['Tables']['states']['Row'];

export function States() {
  const [states, setStates] = useState<State[]>([]);
  const [destinationCounts, setDestinationCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStates() {
      const { data: statesData, error: statesError } = await supabase
        .from('states')
        .select('*')
        .order('name');

      if (statesError) {
        console.error('Error fetching states:', statesError);
        setLoading(false);
        return;
      }

      setStates(statesData || []);

      const { data: destinationsData } = await supabase
        .from('destinations')
        .select('state_id');

      if (destinationsData) {
        const counts: Record<string, number> = {};
        destinationsData.forEach((dest: { state_id: string | null }) => {
          if (dest.state_id) {
            counts[dest.state_id] = (counts[dest.state_id] || 0) + 1;
          }
        });
        setDestinationCounts(counts);
      }

      setLoading(false);
    }

    fetchStates();
  }, []);

  return (
    <div className="page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Nigerian States</h1>
          <p className="page-subtitle">
            Explore all 36 states and discover their unique attractions
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="states-grid">
              {states.map((state) => (
                <StateCard
                  key={state.id}
                  state={state}
                  destinationCount={destinationCounts[state.id] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
