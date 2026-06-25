import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteContext } from '../context/SiteContext';

export default function Services() {
  const { siteData } = useContext(SiteContext);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ clientName: '', email: '', phone: '', budget: '', timeline: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        serviceRequired: selectedService.title
      })
    })
    .then(res => res.json())
    .then(data => {
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus(null);
        setSelectedService(null);
        setFormData({ clientName: '', email: '', phone: '', budget: '', timeline: '', message: '' });
      }, 2000);
    })
    .catch(err => {
      console.error(err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
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

  // An array of colors to dynamically style the service cards
  const cardColors = ['purple', 'teal', 'orange', 'primary', 'purple', 'teal', 'orange', 'primary', 'purple', 'teal', 'orange', 'primary'];

  return (
    <>
      {/* 1. Page Header */}
      <section style={{ padding: '160px 0 80px 0', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '0%', width: '300px', height: '300px', background: 'rgba(20, 184, 166, 0.25)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '0%', width: '300px', height: '300px', background: 'rgba(249, 115, 22, 0.25)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="fade-up delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Comprehensive Solutions <br/> for the <span style={{ background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Era</span></h1>
          <p className="fade-up delay-2" style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto' }}>From robust enterprise software to engaging mobile experiences, our diverse range of services covers every aspect of your digital transformation.</p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)' }}>
        <div className="container">
          <div className="section-title fade-up text-center">
            <h2>Our Expertise</h2>
            <p>Explore our wide array of specialized services tailored to meet your business goals.</p>
          </div>
          
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {(siteData.services || []).map((srv, idx) => {
              const color = cardColors[idx % cardColors.length];
              return (
                <div 
                  className="service-card fade-up glass-card" 
                  key={srv.id || idx} 
                  style={{
                    transitionDelay: `${(idx % 4) * 0.1}s`, 
                    background: 'white', 
                    cursor: 'pointer', 
                    borderTop: `4px solid var(--${color})`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => setSelectedService(srv)}
                >
                  <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '100px', height: '100px', background: `var(--${color})`, opacity: 0.05, borderRadius: '50%' }}></div>
                  <div className={`service-icon bg-gradient-${color}`} style={{ color: 'white', border: 'none', boxShadow: `0 10px 20px var(--${color}-light, rgba(0,0,0,0.1))` }}>
                    <i className={`fas ${srv.icon}`}></i>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--secondary)' }}>{srv.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{srv.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', color: `var(--${color})`, fontWeight: '600', fontSize: '0.9rem', marginTop: 'auto' }}>
                    Request Quote <i className="fas fa-arrow-right" style={{ marginLeft: '8px', transition: 'transform 0.3s' }}></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Industries We Serve */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-title fade-up text-center">
            <h2>Industries We Serve</h2>
            <p>Our scalable solutions are tailored for various business sectors.</p>
          </div>
          <div className="industries-grid">
            {[
              { name: 'FinTech & Finance', icon: 'fa-chart-pie', color: 'blue' },
              { name: 'Healthcare & Medical', icon: 'fa-heartbeat', color: 'pink' },
              { name: 'E-Commerce & Retail', icon: 'fa-shopping-cart', color: 'orange' },
              { name: 'Education & EdTech', icon: 'fa-graduation-cap', color: 'purple' },
              { name: 'Real Estate', icon: 'fa-building', color: 'teal' },
              { name: 'Logistics & Supply', icon: 'fa-truck', color: 'green' }
            ].map((ind, i) => (
              <div key={i} className={`industry-card fade-up box-glow-${ind.color}`} style={{ transitionDelay: `${i*0.1}s` }}>
                <div className={`industry-icon bg-gradient-${ind.color}`}>
                  <i className={`fas ${ind.icon}`}></i>
                </div>
                <h3 className="industry-title">{ind.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Process */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f8fafc, #eff6ff)' }}>
        <div className="container">
          <div className="section-title fade-up text-center">
            <h2>How We Deliver Excellence</h2>
            <p>Our streamlined process ensures your project is delivered on time, within budget, and to the highest standards.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: 'Discovery & Planning', desc: 'We analyze your requirements, business goals, and target audience to craft a roadmap.', icon: 'fa-search', color: 'purple' },
              { step: '02', title: 'UI/UX Design', desc: 'Our designers create wireframes and high-fidelity prototypes for a flawless user journey.', icon: 'fa-pen-nib', color: 'orange' },
              { step: '03', title: 'Development', desc: 'We write clean, scalable code using modern frameworks and agile methodologies.', icon: 'fa-code', color: 'teal' },
              { step: '04', title: 'Testing & Launch', desc: 'Rigorous QA testing ensures a bug-free launch, followed by continuous support.', icon: 'fa-rocket', color: 'primary' }
            ].map((p, idx) => (
              <div key={idx} className="fade-up glass-card" style={{ transitionDelay: `${idx*0.1}s`, background: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '4rem', fontWeight: '900', color: '#f1f5f9', position: 'absolute', top: '-10px', right: '10px', zIndex: 0 }}>{p.step}</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div className={`bg-gradient-${p.color}`} style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', marginBottom: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}><i className={`fas ${p.icon}`}></i></div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs about Services */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-title fade-up text-center">
            <h2>Services FAQ</h2>
            <p>Common questions about our development services.</p>
          </div>
          <div className="faq-container fade-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { q: "Do you sign Non-Disclosure Agreements (NDAs)?", a: "Yes, we prioritize your privacy and intellectual property. We are happy to sign an NDA before discussing any project details." },
              { q: "Do you provide source code ownership?", a: "Absolutely. Once the project is completed and fully paid for, the entire source code and intellectual property rights are transferred to you." },
              { q: "How do you handle project communication?", a: "We use tools like Slack, Jira, and Trello. You will have a dedicated Project Manager who will provide regular updates and demos." },
              { q: "What if I need changes after the project is launched?", a: "We offer post-launch maintenance and support packages to handle any updates, scaling, or new feature additions." }
            ].map((faq, idx) => (
              <div className="faq-item" key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: '1rem', borderRadius: '10px' }}>
                <details style={{ padding: '1rem 1.5rem', cursor: 'pointer' }}>
                  <summary style={{ fontWeight: '600', color: 'var(--secondary)', fontSize: '1.05rem', outline: 'none' }}>{faq.q}</summary>
                  <div className="faq-content" style={{ marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{faq.a}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Tech Stack Banner */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container fade-up">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>We use the best tools for the job</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', fontSize: '3rem', color: 'rgba(255,255,255,0.7)' }}>
            <i className="fab fa-react" title="React / React Native"></i>
            <i className="fab fa-node-js" title="Node.js"></i>
            <i className="fab fa-python" title="Python"></i>
            <i className="fab fa-aws" title="AWS"></i>
            <i className="fab fa-docker" title="Docker"></i>
            <i className="fab fa-figma" title="Figma"></i>
            <i className="fas fa-database" title="SQL / NoSQL"></i>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #cffafe 0%, #e0e7ff 100%)', textAlign: 'center' }}>
        <div className="container fade-up glass-card" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.85)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: 'var(--secondary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: '800' }}>Not sure which service you need?</h2>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.15rem)', color: 'var(--text-muted)', marginBottom: '2.5rem', margin: '0 auto 2.5rem' }}>Our consultants are ready to analyze your business requirements and suggest the perfect technical roadmap.</p>
          <Link to="/contact" className="btn btn-gradient" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>Book a Free Consultation</Link>
        </div>
      </section>

      {/* Modal Popup for Quote */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)} style={{ zIndex: 9999, backdropFilter: 'blur(5px)' }}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()} style={{ background: 'white', maxWidth: '500px', padding: '2.5rem' }}>
            <button className="modal-close" onClick={() => setSelectedService(null)} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-times"></i></button>
            
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div className="bg-gradient-teal" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', margin: '0 auto 1rem', boxShadow: '0 10px 20px rgba(20, 184, 166, 0.3)' }}>
                <i className={`fas ${selectedService.icon}`}></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>{selectedService.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fill out the form below to get a custom quote.</p>
            </div>
            
            <form onSubmit={handleSubmit} style={{textAlign: 'left'}}>
              <div className="form-grid">
                <div className="form-group" style={{marginBottom: '0.8rem'}}>
                  <label style={{color: '#475569', fontSize: '0.85rem', fontWeight: '600'}}>Your Name</label>
                  <input type="text" className="form-control" style={{padding: '0.7rem', fontSize: '0.95rem', background: '#f8fafc', border: '1px solid #e2e8f0'}} required value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} />
                </div>
                <div className="form-group" style={{marginBottom: '0.8rem'}}>
                  <label style={{color: '#475569', fontSize: '0.85rem', fontWeight: '600'}}>Phone Number</label>
                  <input type="text" className="form-control" style={{padding: '0.7rem', fontSize: '0.95rem', background: '#f8fafc', border: '1px solid #e2e8f0'}} required placeholder="0300 1234567" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-group" style={{marginBottom: '0.8rem'}}>
                <label style={{color: '#475569', fontSize: '0.85rem', fontWeight: '600'}}>Email Address</label>
                <input type="email" className="form-control" style={{padding: '0.7rem', fontSize: '0.95rem', background: '#f8fafc', border: '1px solid #e2e8f0'}} required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-grid">
                <div className="form-group" style={{marginBottom: '0.8rem'}}>
                  <label style={{color: '#475569', fontSize: '0.85rem', fontWeight: '600'}}>Budget</label>
                  <select className="form-control" style={{padding: '0.7rem', fontSize: '0.95rem', background: '#f8fafc', border: '1px solid #e2e8f0'}} required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                    <option value="">Select</option>
                    <option value="< $1k">&lt; $1k</option>
                    <option value="$1k - $5k">$1k - $5k</option>
                    <option value="$5k+">$5k+</option>
                  </select>
                </div>
                <div className="form-group" style={{marginBottom: '0.8rem'}}>
                  <label style={{color: '#475569', fontSize: '0.85rem', fontWeight: '600'}}>Timeline</label>
                  <select className="form-control" style={{padding: '0.7rem', fontSize: '0.95rem', background: '#f8fafc', border: '1px solid #e2e8f0'}} required value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})}>
                    <option value="">Select</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 Months">1-2 Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{marginBottom: '1.5rem'}}>
                <label style={{color: '#475569', fontSize: '0.85rem', fontWeight: '600'}}>Requirements</label>
                <textarea className="form-control" style={{padding: '0.7rem', fontSize: '0.95rem', background: '#f8fafc', border: '1px solid #e2e8f0'}} rows="3" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder={`Tell us what you need for ${selectedService.title}...`}></textarea>
              </div>
              <button type="submit" className="btn btn-gradient" style={{width: '100%', padding: '0.9rem', fontSize: '1rem'}} disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? (<span><i className="fas fa-spinner fa-spin" style={{marginRight: '8px'}}></i> Submitting...</span>) : 'Submit Request'}
              </button>
              
              {submitStatus === 'success' && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600' }}><i className="fas fa-check-circle" style={{marginRight: '8px'}}></i>Request submitted! We will contact you soon.</div>}
              {submitStatus === 'error' && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600' }}><i className="fas fa-exclamation-circle" style={{marginRight: '8px'}}></i>Error submitting. Please try again.</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

