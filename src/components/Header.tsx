import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🇳🇬</span>
            <span className="logo-text">NaijaGuide</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/destinations" className="nav-link">Destinations</Link>
            <Link to="/states" className="nav-link">States</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
