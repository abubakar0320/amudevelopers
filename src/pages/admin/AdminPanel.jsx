import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../../context/SiteContext';
import './Admin.css';

export default function AdminPanel() {
  const { siteData, updateSiteData } = useContext(SiteContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState(siteData);
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('All');

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'All') return true;
    if (orderFilter === 'Sales') return o.serviceRequired && o.serviceRequired.includes('Package');
    if (orderFilter === 'General') return o.serviceRequired === 'General Consultation';
    if (orderFilter === 'Leads') return o.serviceRequired && !o.serviceRequired.includes('Package') && o.serviceRequired !== 'General Consultation';
    return true;
  });

  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'dashboard') {
      fetch('http://localhost:5000/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, [activeTab]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    window.location.reload();
  };

  const updateOrderStatus = (id, status) => {
    fetch(`http://localhost:5000/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(updated => {
      setOrders(orders.map(o => o._id === id ? updated : o));
    })
    .catch(err => console.error("Error updating status:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSiteData(formData);
    alert('Settings Saved Successfully! Check the frontend to see changes.');
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <i className="fas fa-layer-group" style={{color: '#38bdf8', fontSize: '1.8rem'}}></i>
          <h2>
            <span style={{ color: '#3b82f6' }}>A</span>
            <span style={{ color: '#22c55e' }}>M</span>
            <span style={{ color: '#f97316' }}>U</span> <span style={{color: '#94a3b8', fontWeight: '400'}}>Developers.</span>
          </h2>
        </div>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}><i className="fas fa-chart-pie"></i> Dashboard</li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}><i className="fas fa-shopping-cart"></i> Sales & Orders</li>
          <li className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}><i className="fas fa-concierge-bell"></i> Manage Services</li>
          <li className={activeTab === 'portfolio' ? 'active' : ''} onClick={() => setActiveTab('portfolio')}><i className="fas fa-briefcase"></i> Manage Portfolio</li>
          
          <li style={{ pointerEvents: 'none', padding: '1rem 2rem 0.5rem', color: '#475569', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Settings</li>
          <li className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}><i className="fas fa-cog"></i> General Settings</li>
          <li className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}><i className="fas fa-heading"></i> Hero Section</li>
          <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}><i className="fas fa-envelope"></i> Contact Info</li>
          <li className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}><i className="fas fa-shield-alt"></i> Security</li>
          
          <li style={{ marginTop: 'auto', borderTop: '1px solid #334155', paddingTop: '1rem' }}><a href="/" target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt"></i> View Live Website</a></li>
        </ul>
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <h1>
            {activeTab === 'dashboard' ? 'Overview Dashboard' : 
             activeTab === 'general' ? 'General Settings' : 
             activeTab === 'hero' ? 'Hero Settings' : 
             activeTab === 'services' ? 'Manage Services' : 
             activeTab === 'portfolio' ? 'Manage Portfolio' : 
             activeTab === 'orders' ? 'Sales & Orders' : 
             activeTab === 'security' ? 'Security Settings' : 
             'Contact Settings'}
          </h1>
          <div className="admin-top-nav">
            <div className="admin-search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search orders, clients..." />
            </div>
            <div className="admin-profile">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Admin" />
              <div className="admin-profile-info">
                <span className="admin-profile-name">Abubakar Siddique</span>
                <span className="admin-profile-role">Super Admin</span>
              </div>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout} title="Logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
        <div className="admin-body">
          {activeTab === 'dashboard' ? (
            <div className="dashboard-container">
              <div className="dashboard-grid">
                <div className="dash-card">
                  <div className="dash-icon" style={{background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
                    <i className="fas fa-shopping-bag"></i>
                  </div>
                  <div className="dash-info">
                    <h3>Total Inquiries</h3>
                    <p>{orders.length}</p>
                  </div>
                </div>
                <div className="dash-card">
                  <div className="dash-icon" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="dash-info">
                    <h3>Completed / Paid</h3>
                    <p>{orders.filter(o => o.status === 'PAID').length}</p>
                  </div>
                </div>
                <div className="dash-card">
                  <div className="dash-icon" style={{background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
                    <i className="fas fa-concierge-bell"></i>
                  </div>
                  <div className="dash-info">
                    <h3>Active Services</h3>
                    <p>{formData.services ? formData.services.length : 0}</p>
                  </div>
                </div>
                <div className="dash-card">
                  <div className="dash-icon" style={{background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'}}>
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="dash-info">
                    <h3>Portfolio Projects</h3>
                    <p>{formData.portfolio ? formData.portfolio.length : 0}</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions or Recent Orders preview could go here */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                <h3 style={{marginBottom: '1rem', color: '#0f172a'}}>Recent Activity</h3>
                {orders.slice(0, 5).map((o, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                      <strong style={{ color: '#334155' }}>{o.clientName}</strong> requested <span style={{ color: '#3b82f6', fontWeight: '500' }}>{o.serviceRequired}</span>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
                {orders.length === 0 && <p style={{ color: '#64748b' }}>No recent activity found.</p>}
              </div>
            </div>
          ) : activeTab === 'orders' ? (
            // Orders section remains same
            <div className="orders-container" style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              
              {/* Order Filters */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <button 
                  onClick={() => setOrderFilter('All')} 
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', background: orderFilter === 'All' ? '#3b82f6' : '#f1f5f9', color: orderFilter === 'All' ? 'white' : '#475569' }}
                >
                  All Entries
                </button>
                <button 
                  onClick={() => setOrderFilter('Sales')} 
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', background: orderFilter === 'Sales' ? '#10b981' : '#f1f5f9', color: orderFilter === 'Sales' ? 'white' : '#475569' }}
                >
                  Package Checkouts
                </button>
                <button 
                  onClick={() => setOrderFilter('Leads')} 
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', background: orderFilter === 'Leads' ? '#f59e0b' : '#f1f5f9', color: orderFilter === 'Leads' ? 'white' : '#475569' }}
                >
                  Service Quotes
                </button>
                <button 
                  onClick={() => setOrderFilter('General')} 
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', background: orderFilter === 'General' ? '#8b5cf6' : '#f1f5f9', color: orderFilter === 'General' ? 'white' : '#475569' }}
                >
                  General Contact
                </button>
              </div>

              {filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#cbd5e1' }}></i>
                  <p>No orders or leads found.</p>
                </div>
              ) : (
                <table className="orders-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px 0 0 8px' }}>Date</th>
                      <th style={{ background: '#f8fafc', padding: '15px' }}>Client Info</th>
                      <th style={{ background: '#f8fafc', padding: '15px' }}>Project Details</th>
                      <th style={{ background: '#f8fafc', padding: '15px', borderRadius: '0 8px 8px 0', textAlign: 'center' }}>Payment & Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order._id}>
                        <td style={{whiteSpace: 'nowrap'}}>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <strong>{order.clientName}</strong><br/>
                          <a href={`mailto:${order.email}`} style={{color: '#3b82f6', fontSize: '0.9rem'}}>{order.email}</a><br/>
                          {order.phone && <a href={`tel:${order.phone}`} style={{color: '#64748b', fontSize: '0.9rem'}}><i className="fas fa-phone" style={{fontSize: '0.8rem'}}></i> {order.phone}</a>}
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                          <div style={{ background: '#f8fafc', padding: '12px 15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6', minWidth: '280px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{order.serviceRequired || 'N/A'}</strong>
                              {order.serviceRequired === 'General Consultation' && (
                                <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>INFO ONLY</span>
                              )}
                              {order.serviceRequired && order.serviceRequired.includes('Package') && (
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>SALE</span>
                              )}
                            </div>
                            
                            {(order.budget || order.timeline) && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                                {order.budget && <span style={{ background: 'white', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fas fa-money-bill-wave" style={{ color: '#10b981' }}></i> {order.budget}</span>}
                                {order.timeline && <span style={{ background: 'white', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fas fa-clock" style={{ color: '#f59e0b' }}></i> {order.timeline}</span>}
                              </div>
                            )}
                            
                            {order.message ? (
                              <div style={{ background: 'white', padding: '10px', borderRadius: '6px', border: '1px dashed #cbd5e1', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', fontStyle: 'italic' }}>
                                "{order.message}"
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No extra details provided.</span>
                            )}
                          </div>
                        </td>
                        <td style={{ background: 'white', padding: '15px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                            {/* Status Badge */}
                            <span style={{ 
                               display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content',
                               background: order.status === 'PAID' ? '#dcfce7' : '#fee2e2',
                               color: order.status === 'PAID' ? '#16a34a' : '#ef4444' 
                            }}>
                               <i className={`fas ${order.status === 'PAID' ? 'fa-check-circle' : 'fa-times-circle'}`}></i> {order.status === 'New' ? 'UNPAID' : order.status}
                            </span>

                            {/* Mark as Paid Button */}
                            {order.status !== 'PAID' && (
                              <button 
                                onClick={() => updateOrderStatus(order._id, 'PAID')}
                                style={{
                                  background: '#16a34a', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '5px',
                                  fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600', transition: '0.2s', width: '100%',
                                  boxShadow: '0 2px 4px rgba(22,163,74,0.3)'
                                }}
                              >
                                Mark as PAID
                              </button>
                            )}

                            {/* View Challan Button */}
                            {order.serviceRequired.includes('Package') && order.message && (
                              <button 
                                style={{
                                  background: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 12px', borderRadius: '5px',
                                  fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600', transition: '0.2s', width: '100%'
                                }}
                                onClick={() => {
                                  window.open(`/challan?id=${order._id}`, '_blank');
                                }}
                              >
                                <i className="fas fa-file-invoice"></i> View Challan
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : activeTab === 'services' ? (
            <div className="services-admin-container">
              <div className="existing-services" style={{marginBottom: '3rem'}}>
                <h3 style={{marginBottom: '1rem'}}>Current Services</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {(formData.services || []).map(srv => (
                    <div key={srv.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                      <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                        <i className={`fas ${srv.icon}`} style={{fontSize: '1.5rem', color: '#3b82f6'}}></i>
                        <div>
                          <strong>{srv.title}</strong>
                          <p style={{fontSize: '0.9rem', color: '#64748b', margin: 0}}>{srv.desc}</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          const newServices = formData.services.filter(s => s.id !== srv.id);
                          setFormData({...formData, services: newServices});
                        }}
                        style={{background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'}}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={handleSave} 
                  className="btn btn-primary" 
                  style={{marginTop: '1.5rem'}}
                >
                  Save Service Deletions
                </button>
              </div>

              <div className="add-new-service" style={{background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'}}>
                <h3 style={{marginBottom: '1.5rem'}}>Add New Service</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const newSrv = {
                    id: Date.now(),
                    icon: e.target.icon.value,
                    title: e.target.title.value,
                    desc: e.target.desc.value
                  };
                  const updatedServices = [...(formData.services || []), newSrv];
                  setFormData({...formData, services: updatedServices});
                  updateSiteData({ services: updatedServices }); // Auto save
                  e.target.reset();
                  alert("New service added successfully!");
                }}>
                  <div className="form-group">
                    <label>Service Title</label>
                    <input type="text" name="title" required placeholder="e.g. SEO Optimization" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>FontAwesome Icon Class</label>
                    <input type="text" name="icon" required placeholder="e.g. fa-chart-line" className="form-control" />
                    <small style={{color: '#64748b'}}>Search icons at fontawesome.com (e.g. fa-laptop, fa-code)</small>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="desc" required rows="3" placeholder="Describe the service..." className="form-control"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Add Service</button>
                </form>
              </div>
            </div>
          ) : activeTab === 'portfolio' ? (
            <div className="portfolio-admin-container">
              <div className="existing-portfolio" style={{marginBottom: '3rem'}}>
                <h3 style={{marginBottom: '1rem'}}>Current Projects</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {(formData.portfolio || []).map(item => (
                    <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                      <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                        <img src={item.img} alt={item.title} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px'}} />
                        <div>
                          <strong>{item.title}</strong>
                          <p style={{fontSize: '0.8rem', color: '#3b82f6', margin: 0, fontWeight: 'bold'}}>{item.cat}</p>
                          <p style={{fontSize: '0.9rem', color: '#64748b', margin: 0}}>{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          const newPortfolio = formData.portfolio.filter(p => p.id !== item.id);
                          setFormData({...formData, portfolio: newPortfolio});
                        }}
                        style={{background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'}}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={handleSave} 
                  className="btn btn-primary" 
                  style={{marginTop: '1.5rem'}}
                >
                  Save Portfolio Deletions
                </button>
              </div>

              <div className="add-new-portfolio" style={{background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'}}>
                <h3 style={{marginBottom: '1.5rem'}}>Add New Project</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const newItem = {
                    id: Date.now(),
                    cat: e.target.cat.value,
                    title: e.target.title.value,
                    img: e.target.img.value,
                    desc: e.target.desc.value
                  };
                  const updatedPortfolio = [...(formData.portfolio || []), newItem];
                  setFormData({...formData, portfolio: updatedPortfolio});
                  updateSiteData({ portfolio: updatedPortfolio });
                  e.target.reset();
                  alert("New project added successfully!");
                }}>
                  <div className="form-group">
                    <label>Project Title</label>
                    <input type="text" name="title" required placeholder="e.g. NextGen Retail App" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input type="text" name="cat" required placeholder="e.g. E-Commerce" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input type="url" name="img" required placeholder="https://example.com/image.jpg" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="desc" required rows="3" placeholder="Describe the project..." className="form-control"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Add Project</button>
                </form>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="admin-form">
            {activeTab === 'general' && (
              <>
                <div className="form-group toggle-switch-group" style={{ marginBottom: '2rem' }}>
                  <label className="switch">
                    <input type="checkbox" name="useLogoImage" checked={formData.useLogoImage || false} onChange={(e) => setFormData({...formData, useLogoImage: e.target.checked})} />
                    <span className="slider"></span>
                  </label>
                  <div>
                    <strong style={{ display: 'block', color: '#0f172a' }}>Use Image Logo</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Turn on to use an image file instead of text for the logo.</span>
                  </div>
                </div>
                {formData.useLogoImage ? (
                  <div className="form-group">
                    <label>Logo Image URL (e.g. /amu-logo.jpg)</label>
                    <input type="text" name="logoUrl" value={formData.logoUrl || ''} onChange={handleChange} placeholder="https://example.com/logo.png" />
                    <div style={{marginTop: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'inline-block'}}>
                      <p style={{fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.5rem 0'}}>Live Preview</p>
                      {formData.logoUrl ? <img src={formData.logoUrl} alt="Logo Preview" style={{height: '40px'}} /> : <span style={{color: '#94a3b8', fontSize: '0.9rem'}}>No image provided</span>}
                    </div>
                  </div>
                ) : (
                  <div className="form-group">
                    <label>Site Name (Text Logo)</label>
                    <input type="text" name="siteName" value={formData.siteName || ''} onChange={handleChange} placeholder="AMU Developers" />
                  </div>
                )}
              </>
            )}
            {activeTab === 'hero' && (
              <>
                <div className="form-group">
                  <label>Hero Title (Use &lt;span&gt; for blue color)</label>
                  <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Hero Subtitle</label>
                  <textarea name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} rows="4"></textarea>
                </div>
                <div className="form-group">
                  <label>Primary Button Text</label>
                  <input type="text" name="heroPrimaryBtn" value={formData.heroPrimaryBtn} onChange={handleChange} />
                </div>
              </>
            )}
            {activeTab === 'contact' && (
              <>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" value={formData.contactPhone} onChange={e => setFormData({...formData, contactPhone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>WhatsApp Number (Include Country Code)</label>
                  <input type="text" className="form-control" value={formData.whatsappNumber || ''} placeholder="e.g. 1234567890" onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Office Address</label>
                  <input type="text" name="contactAddress" value={formData.contactAddress || ''} onChange={handleChange} />
                </div>
              </>
            )}
            {activeTab === 'security' && (
              <div className="form-group">
                <label>Dashboard Master Password</label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-key" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                  <input type="text" name="adminPassword" value={formData.adminPassword || ''} onChange={handleChange} style={{ paddingLeft: '45px' }} />
                </div>
                <p style={{fontSize: '0.85rem', color: '#ef4444', marginTop: '0.8rem', fontWeight: '500'}}><i className="fas fa-exclamation-triangle"></i> Keep this password safe. Anyone with this password can change your website settings.</p>
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '8px', width: '100%'}}><i className="fas fa-save" style={{marginRight: '8px'}}></i> Save Settings</button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}

