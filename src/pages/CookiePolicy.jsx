import { useEffect, useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

export default function CookiePolicy() {
  const { siteData } = useContext(SiteContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-hero">
        <h1 className="text-gradient-amu">Cookie Policy</h1>
        <p>Last updated: June 2026</p>
      </div>
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #fdf4ff, #f3e8ff)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="glass-card box-glow-teal fade-up" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-teal" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-cookie-bite"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>1. What Are Cookies?</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
          </div>
          
          <div className="glass-card box-glow-purple fade-up delay-1" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-purple" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-project-diagram"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>2. How We Use Cookies</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}><strong>{siteData.siteName}</strong> uses cookies to understand how you interact with our website, to remember your preferences, and to improve your user experience. We use both session cookies and persistent cookies.</p>
          </div>

          <div className="glass-card box-glow-blue fade-up delay-2" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-primary" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-list-ul"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>3. Types of Cookies We Use</h3>
            </div>
            <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Essential Cookies:</strong> Strictly necessary for the operation of our website.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Functional Cookies:</strong> Enable the website to provide enhanced personalization.</li>
            </ul>
          </div>

          <div className="glass-card box-glow-orange fade-up delay-3" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-orange" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-sliders-h"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>4. Managing Cookies</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.</p>
          </div>

        </div>
      </section>
    </>
  );
}
