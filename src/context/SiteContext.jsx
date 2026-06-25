import { createContext, useState, useEffect } from 'react';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const defaultData = {
    siteName: "AMU Developers",
    useLogoImage: true,
    logoUrl: "/logo.jpeg",
    heroTitle: "Transforming Ideas Into Digital Solutions",
    heroSubtitle: "We provide custom software development, web applications, mobile apps, UI/UX design, AI solutions, and complete digital transformation services to scale your business.",
    heroPrimaryBtn: "Get Free Consultation",
    heroSecondaryBtn: "View Portfolio",
    contactEmail: "amudevelopers@gmail.com",
    contactPhone: "03014696506",
    whatsappNumber: "923014696506",
    contactAddress: "Manawala, Sheikhupura",
    adminPassword: "admin123",
    services: [
      { id: 1, icon: 'fa-code', title: 'Custom Software', desc: 'Tailored enterprise software solutions built to match your exact business requirements.' },
      { id: 2, icon: 'fa-globe', title: 'Web Development', desc: 'Scalable, high-performance web applications and cloud portals.' },
      { id: 3, icon: 'fa-mobile-alt', title: 'Mobile Apps', desc: 'Native and cross-platform mobile apps for iOS and Android.' },
      { id: 4, icon: 'fa-pen-nib', title: 'UI/UX Design', desc: 'Intuitive, user-centered designs that drive engagement and conversions.' },
      { id: 5, icon: 'fa-robot', title: 'AI & Automation', desc: 'Integrate artificial intelligence to automate processes and gain insights.' },
      { id: 6, icon: 'fa-cloud', title: 'Cloud Solutions', desc: 'Secure cloud architecture, migration, and DevOps services.' },
      { id: 7, icon: 'fa-shopping-cart', title: 'E-commerce', desc: 'Robust digital storefronts with seamless payment integrations.' },
      { id: 8, icon: 'fa-headset', title: 'Maintenance', desc: 'Continuous monitoring, software updates, and dedicated tech support.' }
    ],
    portfolio: [
      { id: 1, cat: 'FinTech Platform', title: 'Global Payment Gateway', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'A comprehensive solution built with modern architecture to ensure scalability and flawless user experience.' },
      { id: 2, cat: 'E-Commerce', title: 'NextGen Retail App', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'A comprehensive solution built with modern architecture to ensure scalability and flawless user experience.' },
      { id: 3, cat: 'Healthcare AI', title: 'Medical Diagnostics AI', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'A comprehensive solution built with modern architecture to ensure scalability and flawless user experience.' }
    ]
  };

  const [siteData, setSiteData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  // Fetch from MongoDB on initial load
  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          // If DB returned an empty array for services (because it was newly added), keep the default 8 services
          if (data.services && data.services.length === 0) {
            delete data.services;
          }
          if (data.portfolio && data.portfolio.length === 0) {
            delete data.portfolio;
          }
          // Merge API data with default data
          const mergedData = { ...defaultData, ...data };
          setSiteData(mergedData);
          
          // Force save the defaults to DB if DB was empty
          if (!data.services || data.services.length === 0 || !data.portfolio || data.portfolio.length === 0) {
             fetch('http://localhost:5000/api/settings', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(mergedData)
             });
          }
        }
      })
      .catch(err => {
        console.error("Error fetching settings from MongoDB. Using defaults.", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Update site data
  const updateSiteData = async (newData) => {
    const updated = { ...siteData, ...newData };
    setSiteData(updated); // Optimistic UI update

    // Save to MongoDB
    try {
      await fetch('http://localhost:5000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error("Error saving settings to MongoDB:", err);
    }
  };

  // Optional: Return a small loading state until initial data is fetched to prevent flicker
  if (loading) {
    return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', fontFamily: 'sans-serif'}}>Loading Environment...</div>;
  }

  return (
    <SiteContext.Provider value={{ siteData, updateSiteData }}>
      {children}
    </SiteContext.Provider>
  );
};
