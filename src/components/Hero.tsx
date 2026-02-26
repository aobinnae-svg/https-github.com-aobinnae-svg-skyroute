import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Discover the Beauty of Nigeria</h1>
          <p className="hero-subtitle">
            Explore breathtaking destinations, rich culture, and unforgettable experiences
            across all 36 states
          </p>
          <div className="hero-actions">
            <Link to="/destinations" className="btn btn-primary">
              Explore Destinations
            </Link>
            <Link to="/states" className="btn btn-secondary">
              Browse States
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
