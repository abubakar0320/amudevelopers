import { useEffect, useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

export default function TermsOfService() {
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
        <h1 className="text-gradient-amu">Terms of Service</h1>
        <p>Last updated: June 2026</p>
      </div>
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="glass-card box-glow-orange fade-up" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-orange" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-handshake"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>1. Acceptance of Terms</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>By accessing and using <strong>{siteData.siteName}</strong>'s website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </div>
          
          <div className="glass-card box-glow-blue fade-up delay-1" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-primary" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-laptop-code"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>2. Provision of Services</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}><strong>{siteData.siteName}</strong> provides custom software development, web development, and digital design services. We reserve the right to modify or discontinue any service at any time without notice.</p>
          </div>

          <div className="glass-card box-glow-green fade-up delay-2" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-green" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-copyright"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>3. Intellectual Property</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>All content included on this site, such as text, graphics, logos, images, and software, is the property of <strong>{siteData.siteName}</strong> or its content suppliers and protected by international copyright laws. Custom software produced for clients will be transferred to the client upon full payment.</p>
          </div>

          <div className="glass-card box-glow-pink fade-up delay-3" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-pink" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-gavel"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>4. Limitation of Liability</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>In no event shall <strong>{siteData.siteName}</strong> be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, the site and our services.</p>
          </div>

        </div>
      </section>
    </>
  );
}
