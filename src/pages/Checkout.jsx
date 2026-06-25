import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const planName = searchParams.get('plan') || 'Custom Package';
  const planPrice = searchParams.get('price') || 'TBD';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate unique challan details
    const challanNo = 'AMU-' + Math.floor(Math.random() * 900000 + 100000);
    const dateObj = new Date();
    const date = dateObj.toLocaleDateString('en-GB');
    dateObj.setDate(dateObj.getDate() + 7);
    const dueDate = dateObj.toLocaleDateString('en-GB');
    
    const planFeatures = {
      "Starter": [
        "Custom UI Design (Up to 5 Pages)",
        "Fully Responsive (Mobile Friendly)",
        "Contact Form & Social Media Integration",
        "Basic SEO & Speed Optimization (90+ Score)",
        "Domain & Hosting Setup Help & 1 Month Support"
      ],
      "Professional": [
        "Advanced UI/UX (Up to 15 Pages)",
        "Custom Backend Admin Panel & DB Integration",
        "E-commerce Setup (50 Products) & Payment Gateway",
        "Advanced On-Page SEO, SSL & Cloud Deployment",
        "3 Months Free Support & Basic Security Audit"
      ],
      "Enterprise": [
        "Unlimited Pages, Screens & Full-Stack Web App",
        "Cross-Platform Mobile App (Android & iOS)",
        "Scalable AWS Architecture & Custom REST APIs",
        "Advanced Security, CI/CD Pipeline & Analytics",
        "Dedicated Project Manager & 1 Year Premium Support"
      ]
    };

    const challanState = { 
      client: formData,
      plan: planName,
      price: planPrice,
      features: planFeatures[planName] || ["Custom requirement deliverables as discussed."],
      challanNo,
      date,
      dueDate
    };

    // Save to backend
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceRequired: planName + ' Package',
        budget: planPrice.toString(),
        message: JSON.stringify(challanState)
      })
    })
    .then(res => res.json())
    .then(data => {
      // Proceed to generate challan using the real DB ID
      if (data && data._id) {
        navigate(`/challan?id=${data._id}`);
      } else {
        navigate('/challan', { state: challanState });
      }
    })
    .catch(err => {
      console.error("Error saving order:", err);
      // Navigate anyway if backend fails
      navigate('/challan', { state: challanState });
    });
  };

  return (
    <div className="section-padding bg-light" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          
          {/* Order Summary */}
          <div style={{ flex: '1 1 350px', maxWidth: '400px' }}>
            <div className="glass-card" style={{ padding: '2rem', background: 'var(--secondary)', color: 'white', borderRadius: '20px' }}>
              <h3 style={{ color: 'white', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#cbd5e1' }}>Selected Plan</span>
                <strong style={{ color: 'white' }}>{planName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#cbd5e1' }}>Base Price</span>
                <strong style={{ color: 'white' }}>${planPrice}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <span style={{ color: '#cbd5e1' }}>Tax / VAT (0%)</span>
                <strong style={{ color: 'white' }}>$0</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Total Due</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)' }}>${planPrice}</span>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0 }}><i className="fas fa-info-circle text-gradient-teal" style={{marginRight: '8px'}}></i> You will generate a payment challan. No credit card required right now.</p>
              </div>
            </div>
          </div>

          {/* Billing Details Form */}
          <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
            <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '20px', background: 'white', boxShadow: 'var(--shadow-lg)' }}>
              <h2 style={{ marginBottom: '2rem', color: 'var(--secondary)' }}>Billing Information</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc' }} />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Email Address *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Phone Number *</label>
                    <input type="text" name="phone" required value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Full Billing Address</label>
                  <textarea name="address" rows="3" required value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', resize: 'none' }}></textarea>
                </div>

                <button type="submit" className="btn btn-gradient" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}>
                  <i className="fas fa-file-invoice" style={{marginRight: '10px'}}></i> Generate Payment Challan
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;

