import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

export default function Footer() {
  const { siteData } = useContext(SiteContext);

  const siteName = siteData?.siteName || 'AMU Developers';
  let firstPart = siteName;
  let secondPart = '';
  const dotIndex = siteName.indexOf('.');
  const spaceIndex = siteName.indexOf(' ');
  if (dotIndex !== -1) {
    firstPart = siteName.substring(0, dotIndex);
    secondPart = siteName.substring(dotIndex);
  } else if (spaceIndex !== -1) {
    firstPart = siteName.substring(0, spaceIndex);
    secondPart = siteName.substring(spaceIndex);
  }
  const renderCustomLogoText = () => (
    <span style={{ fontWeight: '800', letterSpacing: '1px' }}>
      <span style={{ color: '#3b82f6' }}>A</span>
      <span style={{ color: '#22c55e' }}>M</span>
      <span style={{ color: '#f97316' }}>U</span>
      <span style={{ color: '#ffffff' }}> Developers.</span>
    </span>
  );

  const logoContent = siteData?.useLogoImage ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={siteData?.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      {renderCustomLogoText()}
    </div>
  ) : (
    renderCustomLogoText()
  );

  return (
    <footer className="footer">
      <div className="footer-top-line"></div>
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand">
            <Link to="/" className="logo" style={{display: 'inline-block', marginBottom: '1.5rem'}}>{logoContent}</Link>
            <p>We are a premium software house dedicated to transforming your ideas into powerful digital solutions through innovative engineering and design.</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/abubakar0320/" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="li"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://github.com/abubakar0320" aria-label="GitHub" target="_blank" rel="noreferrer" className="gh"><i className="fab fa-github"></i></a>
              <a href={`mailto:${siteData?.contactEmail || 'amudevelopers@gmail.com'}`} aria-label="Gmail" className="gm"><i className="fas fa-envelope"></i></a>
              <a href={`https://wa.me/${siteData?.whatsappNumber || '923014696506'}`} aria-label="WhatsApp" target="_blank" rel="noreferrer" className="wa"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Company</Link></li>
              <li><Link to="/portfolio">Our Portfolio</Link></li>
              <li><Link to="/services">All Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/admin" style={{ color: 'var(--primary)' }}><i className="fas fa-lock" style={{marginRight: '8px'}}></i>Admin Panel</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Contact Info */}
          <div className="footer-links">
            <h4>Contact Us</h4>
            <ul>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', color: '#94a3b8' }}>
                <i className="fas fa-location-dot" style={{ color: 'var(--primary)', marginTop: '0.4rem' }}></i>
                <span>{siteData.contactAddress}</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#94a3b8' }}>
                <i className="fas fa-phone" style={{ color: 'var(--brand-green)' }}></i>
                <span>{siteData.contactPhone}</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#94a3b8' }}>
                <i className="fas fa-envelope" style={{ color: 'var(--accent)' }}></i>
                <span>{siteData.contactEmail}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-links">
            <h4>Newsletter</h4>
            <p style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.95rem' }}>Subscribe to our newsletter for the latest tech news, tips, and updates.</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" aria-label="Subscribe"><i className="fas fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {siteData.siteName}. All rights reserved.</p>
          <div className="footer-legal" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link to="/privacy-policy" className="btn btn-outline" style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem', borderColor: 'rgba(59, 130, 246, 0.5)', borderRadius: '50px' }}>Privacy Policy</Link>
            <Link to="/terms-of-service" className="btn btn-outline" style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem', borderColor: 'rgba(34, 197, 94, 0.5)', borderRadius: '50px' }}>Terms of Service</Link>
            <Link to="/cookie-policy" className="btn btn-outline" style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem', borderColor: 'rgba(249, 115, 22, 0.5)', borderRadius: '50px' }}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
