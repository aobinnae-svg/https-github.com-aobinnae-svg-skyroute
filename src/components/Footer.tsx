export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">NaijaGuide</h3>
            <p className="footer-text">
              Your comprehensive guide to exploring the beauty and diversity of Nigeria.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/states">States</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Regions</h4>
            <ul className="footer-links">
              <li>South West</li>
              <li>South East</li>
              <li>South South</li>
              <li>North Central</li>
              <li>North East</li>
              <li>North West</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} NaijaGuide. Discover Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
