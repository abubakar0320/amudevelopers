import { useState, useContext } from 'react';
import { SiteContext } from '../../context/SiteContext';
import './Admin.css';

export default function AdminLogin({ onLogin }) {
  const { siteData } = useContext(SiteContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Fake delay for better UX and realistic authentication feel
    setTimeout(() => {
      const correctPassword = siteData?.adminPassword || 'admin123';
      if (password === correctPassword) {
        onLogin();
      } else {
        setError('Access Denied. Incorrect credentials.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-split-container">
      <div className="login-left">
        <div className="login-left-content">
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '4rem', letterSpacing: '1px' }}>
            <span style={{ color: '#3b82f6' }}>A</span>
            <span style={{ color: '#22c55e' }}>M</span>
            <span style={{ color: '#f97316' }}>U</span> <span style={{color: '#94a3b8', fontWeight: '400'}}>Developers.</span>
          </h2>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: '800' }}>Manage Your <br/>Digital Empire.</h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', maxWidth: '450px', lineHeight: '1.7' }}>
            Access the centralized dashboard to manage services, view portfolio projects, and respond to incoming sales leads instantly.
          </p>
          
          <div className="floating-shapes">
            <div className="shape s1"></div>
            <div className="shape s2"></div>
            <div className="shape s3"></div>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-wrapper">
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: '800' }}>Welcome Back</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Please enter your master password to continue.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '700', color: '#334155', fontSize: '0.95rem' }}>Admin Password</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }}></i>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoFocus
                  style={{ 
                    width: '100%', padding: '1.2rem 1rem 1.2rem 50px', borderRadius: '12px', 
                    border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none', 
                    transition: '0.3s', background: '#f8fafc', boxSizing: 'border-box' 
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              {error && <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.95rem', fontWeight: '600' }}><i className="fas fa-exclamation-circle"></i> {error}</p>}
            </div>
            
            <button 
              type="submit" 
              style={{ 
                width: '100%', padding: '1.2rem', fontSize: '1.15rem', borderRadius: '12px', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                background: 'linear-gradient(to right, #2563eb, #3b82f6)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: '700', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)',
                transition: '0.3s'
              }} 
              disabled={isLoading}
              onMouseOver={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !isLoading && (e.target.style.transform = 'translateY(0)')}
            >
              {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Authenticating...</> : 'Login to Dashboard'}
            </button>
          </form>
          
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', transition: '0.2s' }} onMouseOver={e=>e.target.style.color='#3b82f6'} onMouseOut={e=>e.target.style.color='#64748b'}>
              <i className="fas fa-arrow-left" style={{marginRight: '8px'}}></i> Return to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

