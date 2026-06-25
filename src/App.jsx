import { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider, SiteContext } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Challan from './pages/Challan';
import AdminPanel from './pages/admin/AdminPanel';
import AdminLogin from './pages/admin/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isChallan = location.pathname.startsWith('/challan');
  const { siteData } = useContext(SiteContext);

  useEffect(() => {
    let title = "AMU Developers | Excellence in Software";
    let desc = "Award-winning software house specializing in custom software development, web applications, mobile apps, and complete digital transformation services.";
    
    switch(location.pathname) {
      case '/about':
        title = "About Us | AMU Developers";
        desc = "Learn about AMU Developers, our vision, mission, and the core values that drive our software engineering excellence.";
        break;
      case '/services':
        title = "Our Services | AMU Developers";
        desc = "Explore our premium services including Web Development, Mobile Apps, UI/UX Design, and Custom Software solutions.";
        break;
      case '/portfolio':
        title = "Team Portfolios | AMU Developers";
        desc = "Meet the experts behind AMU Developers: Abubakar Siddique, Shoaib Afzal, and Shakeel Umair. View their skills and portfolios.";
        break;
      case '/contact':
        title = "Contact Us | AMU Developers";
        desc = "Get in touch with AMU Developers for your next big project. We are ready to transform your ideas into digital reality.";
        break;
      case '/privacy-policy':
        title = "Privacy Policy | AMU Developers";
        break;
      case '/terms-of-service':
        title = "Terms of Service | AMU Developers";
        break;
      case '/cookie-policy':
        title = "Cookie Policy | AMU Developers";
        break;
    }
    
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }
  }, [location.pathname]);

  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });

  const handleAdminLogin = () => {
    setIsAdminAuth(true);
    sessionStorage.setItem('adminAuth', 'true');
  };

  return (
    <>
      {!isAdmin && !isChallan && <Navbar />}
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/challan" element={<Challan />} />
          <Route path="/admin" element={isAdminAuth ? <AdminPanel /> : <AdminLogin onLogin={handleAdminLogin} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
      </main>
      
      {/* Floating WhatsApp Button */}
      {siteData && siteData.whatsappNumber && !isAdmin && (
        <a 
          href={`https://wa.me/${siteData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I'm%20interested%20in%20your%20services.`} 
          className="whatsapp-float" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Chat with us on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      )}

      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <SiteProvider>
      <Router>
        <AppContent />
      </Router>
    </SiteProvider>
  );
}

export default App;
