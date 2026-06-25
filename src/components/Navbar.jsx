import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteContext } from '../context/SiteContext';

export default function Navbar() {
  const { siteData } = useContext(SiteContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuActive(!menuActive);
  const closeMenu = () => setMenuActive(false);

  // Use light style (dark text) only when actually scrolled
  const navClass = isScrolled ? 'scrolled' : '';

  const isActive = (path) => location.pathname === path;

  // Split siteName to style the second word/part
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
      <span style={{ color: navClass === 'scrolled' ? '#000000' : '#ffffff' }}> Developers.</span>
    </span>
  );

  const logoContent = siteData?.useLogoImage ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={siteData?.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      {renderCustomLogoText()}
    </div>
  ) : (
    renderCustomLogoText()
  );

  return (
    <>
      {/* Top Info Bar */}
      <div style={{ background: 'var(--secondary)', color: 'rgba(255,255,255,0.8)', padding: '0.5rem 5%', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1002, position: 'absolute', top: 0, left: 0, width: '100%' }} className="top-bar-hide-mobile">
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span><i className="fas fa-envelope" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>{siteData?.contactEmail}</span>
          <span><i className="fas fa-phone" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>{siteData?.contactPhone}</span>
        </div>
        <div>
          <span><i className="fas fa-location-dot" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>{siteData?.contactAddress}</span>
        </div>
      </div>

      <div className={`mobile-overlay ${menuActive ? 'active' : ''}`} onClick={closeMenu}></div>
      <nav className={`navbar ${navClass}`}>
        <Link to="/" className="logo" style={{display: 'flex', alignItems: 'center'}}>{logoContent}</Link>
        
        <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu} className={isActive('/') ? 'active-link' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu} className={isActive('/about') ? 'active-link' : ''}>About</Link>
          </li>
          <li>
            <Link to="/services" onClick={closeMenu} className={isActive('/services') ? 'active-link' : ''}>Services</Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={closeMenu} className={isActive('/portfolio') ? 'active-link' : ''}>Portfolio</Link>
          </li>
          <li className="mobile-only-btn">
            <Link to="/contact" className="btn btn-primary" onClick={closeMenu} style={{width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center'}}>Get Consultation</Link>
          </li>
        </ul>

        <div className="nav-right">
          <Link to="/contact" className="btn btn-primary desktop-btn">Let's Talk</Link>
          
          <button className={`hamburger ${menuActive ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
}
