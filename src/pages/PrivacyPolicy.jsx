import { useEffect, useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

export default function PrivacyPolicy() {
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
        <h1 className="text-gradient-amu">Privacy Policy</h1>
        <p>Last updated: June 2026</p>
      </div>
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="glass-card box-glow-blue fade-up" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-primary" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-shield-alt"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>1. Introduction</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Welcome to <strong>{siteData.siteName}</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
          </div>
          
          <div className="glass-card box-glow-green fade-up delay-1" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-green" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-database"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>2. Data We Collect</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>We may collect, use, store and transfer different kinds of personal data about you, including Identity Data (name, username), Contact Data (email address, telephone numbers), and Technical Data (IP address, browser type, operating system).</p>
          </div>

          <div className="glass-card box-glow-orange fade-up delay-2" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-orange" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-chart-line"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>3. How We Use Your Data</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide our software services, manage our relationship with you, and improve our website and customer service.</p>
          </div>

          <div className="glass-card box-glow-purple fade-up delay-3" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-purple" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-lock"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>4. Data Security</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>
          </div>

          <div className="glass-card box-glow-teal fade-up delay-4" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="service-icon bg-gradient-teal" style={{ width: '50px', height: '50px', fontSize: '1.2rem', flexShrink: 0, boxShadow: 'none' }}><i className="fas fa-envelope"></i></div>
              <h3 style={{ color: 'var(--secondary)', margin: 0 }}>5. Contact Us</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>If you have any questions about this privacy policy or our privacy practices, please contact us at <strong>{siteData.contactEmail}</strong>.</p>
          </div>

        </div>
      </section>
    </>
  );
}
