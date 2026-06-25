import { useEffect, useContext, useState } from 'react';
import { SiteContext } from '../context/SiteContext';

export default function Contact() {
  const { siteData } = useContext(SiteContext);
  
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    serviceRequired: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      setSubmitStatus('success');
      setFormData({ clientName: '', email: '', phone: '', serviceRequired: '', budget: '', timeline: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    })
    .catch(err => {
      console.error(err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    });
  };

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
      {/* 1. Page Header */}
      <section style={{ padding: '160px 0 80px 0', background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '400px', height: '400px', background: 'rgba(249, 115, 22, 0.2)', filter: 'blur(120px)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '300px', height: '300px', background: 'rgba(56, 189, 248, 0.2)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="fade-up delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Let's Build Something <span style={{ background: 'linear-gradient(to right, #fb923c, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Amazing</span></h1>
          <p className="fade-up delay-2" style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto' }}>Whether you have a specific project in mind or just want to explore possibilities, our team is ready to listen and help you scale.</p>
        </div>
      </section>

      {/* 2. Contact Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            
            {/* Left: Contact Info */}
            <div className="fade-up">
              <h2 style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '1.5rem', fontWeight: '800' }}>Reach Out Directly</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '3rem' }}>Prefer to talk or send an email? Reach out to us through the following channels. We usually respond within 24 hours.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'white', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                  <div className="bg-gradient-purple" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 10px 20px rgba(168, 85, 247, 0.2)' }}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--secondary)', marginBottom: '0.2rem' }}>Email Us</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>{siteData.contactEmail}</p>
                  </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'white', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                  <div className="bg-gradient-teal" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 10px 20px rgba(20, 184, 166, 0.2)' }}>
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--secondary)', marginBottom: '0.2rem' }}>Call Us</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>{siteData.contactPhone}</p>
                  </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'white', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                  <div className="bg-gradient-orange" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 10px 20px rgba(249, 115, 22, 0.2)' }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--secondary)', marginBottom: '0.2rem' }}>Office Location</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>{siteData.contactAddress}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Contact Form */}
            <div className="fade-up delay-1 glass-card" style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--secondary)', marginBottom: '0.5rem', fontWeight: '800' }}>Request a Free Quote</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Fill out the form below and we will get back to you with a proposal.</p>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Your Name</label>
                    <input type="text" name="clientName" style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', outline: 'none' }} placeholder="John Doe" value={formData.clientName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                    <input type="email" name="email" style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', outline: 'none' }} placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                    <input type="text" name="phone" style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', outline: 'none' }} placeholder="+92 300 1234567" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Service Required</label>
                    <select name="serviceRequired" style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', outline: 'none' }} value={formData.serviceRequired} onChange={handleChange} required>
                      <option value="">Select a service</option>
                      <option value="General Consultation" style={{fontWeight: 'bold'}}>General Consultation</option>
                      {(siteData.services || []).map((srv, idx) => (
                        <option key={idx} value={srv.title}>{srv.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Estimated Budget</label>
                    <select name="budget" style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', outline: 'none' }} value={formData.budget} onChange={handleChange} required>
                      <option value="">Select Budget</option>
                      <option value="Less than $1k">Less than $1k</option>
                      <option value="$1k - $5k">$1k - $5k</option>
                      <option value="$5k - $10k">$5k - $10k</option>
                      <option value="$10k+">$10k+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Timeline</label>
                    <select name="timeline" style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', outline: 'none' }} value={formData.timeline} onChange={handleChange} required>
                      <option value="">Select Timeline</option>
                      <option value="ASAP">ASAP (Urgent)</option>
                      <option value="1-2 Months">1-2 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Project Details</label>
                  <textarea name="message" rows="4" style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', outline: 'none', resize: 'vertical' }} placeholder="Tell us about your project requirements..." value={formData.message} onChange={handleChange} required></textarea>
                </div>

                <button type="submit" className="btn btn-gradient" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', borderRadius: '8px' }} disabled={submitStatus === 'sending'}>
                  {submitStatus === 'sending' ? (<span><i className="fas fa-spinner fa-spin" style={{marginRight: '8px'}}></i> Sending Message...</span>) : 'Send Message'}
                </button>
                
                {submitStatus === 'success' && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: '600' }}><i className="fas fa-check-circle" style={{marginRight: '8px'}}></i>Message sent successfully! We'll be in touch soon.</div>}
                {submitStatus === 'error' && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: '600' }}><i className="fas fa-exclamation-circle" style={{marginRight: '8px'}}></i>Failed to send message. Please try again.</div>}
              </form>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* 3. Embedded Map Section */}
      <section style={{ height: '400px', width: '100%', background: '#e2e8f0', position: 'relative' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13601.370830722379!2d73.6841101!3d31.5422119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39185df2d9483dc3%3A0x6b77242d54e48ec!2sMananwala%2C%20Sheikhupura%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        ></iframe>
      </section>
    </>
  );
}

