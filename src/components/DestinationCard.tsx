import { Link } from 'react-router-dom';
import type { Database } from '../lib/database.types';

type Destination = Database['public']['Tables']['destinations']['Row'];

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link to={`/destinations/${destination.slug}`} className="destination-card">
      <div className="destination-card-image">
        <img
          src={destination.image_url || 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg'}
          alt={destination.name}
        />
        <div className="destination-card-category">{destination.category}</div>
      </div>

      <div className="destination-card-content">
        <h3 className="destination-card-title">{destination.name}</h3>
        <p className="destination-card-location">{destination.location}</p>
        <p className="destination-card-description">
          {destination.short_description}
        </p>

        <div className="destination-card-footer">
          <div className="destination-card-rating">
            <span className="star">★</span>
            <span>{destination.rating.toFixed(1)}</span>
          </div>
          <div className="destination-card-cost">{destination.average_cost}</div>
        </div>
      </div>
    </Link>
  );
}
