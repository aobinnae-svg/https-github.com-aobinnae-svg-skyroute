import { Link } from 'react-router-dom';
import type { Database } from '../lib/database.types';

type State = Database['public']['Tables']['states']['Row'];

interface StateCardProps {
  state: State;
  destinationCount?: number;
}

export function StateCard({ state, destinationCount = 0 }: StateCardProps) {
  return (
    <Link to={`/states/${state.slug}`} className="state-card">
      <div className="state-card-image">
        <img
          src={state.image_url || 'https://images.pexels.com/photos/2387532/pexels-photo-2387532.jpeg'}
          alt={state.name}
        />
      </div>

      <div className="state-card-content">
        <h3 className="state-card-title">{state.name}</h3>
        <p className="state-card-region">{state.region}</p>
        <p className="state-card-description">{state.description}</p>

        <div className="state-card-footer">
          <span className="state-card-destinations">
            {destinationCount} {destinationCount === 1 ? 'Destination' : 'Destinations'}
          </span>
        </div>
      </div>
    </Link>
  );
}
