import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Challan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('id');
  
  const [data, setData] = useState(location.state || null);
  const [status, setStatus] = useState(data?.status || 'UNPAID');
  const [loading, setLoading] = useState(!!orderId && !data);

  useEffect(() => {
    if (orderId) {
      // Fetch live status from database
      fetch(`http://localhost:5000/api/orders/${orderId}`)
        .then(res => res.json())
        .then(orderData => {
           if(orderData && orderData.message) {
             try {
               const parsedData = JSON.parse(orderData.message);
               setData(parsedData);
               setStatus(orderData.status === 'PAID' ? 'PAID' : 'UNPAID');
             } catch(e) {
               console.error("JSON parse error:", e);
             }
           }
           setLoading(false);
        })
        .catch(err => {
           console.error("Failed to fetch order", err);
           setLoading(false);
        });
    }
  }, [orderId]);

  useEffect(() => {
    if (!orderId && !data) {
      navigate('/');
    }
  }, [orderId, data, navigate]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f8fafc'}}><h2><i className="fas fa-spinner fa-spin" style={{marginRight: '10px', color: 'var(--primary)'}}></i> Loading Challan Details...</h2></div>;
  
  if (!data) {
    return (
      <div style={{padding: '100px 20px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc'}}>
        <div style={{background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', maxWidth: '500px'}}>
          <i className="fas fa-exclamation-triangle" style={{fontSize: '4rem', color: '#ef4444', marginBottom: '20px'}}></i>
          <h2 style={{marginBottom: '10px'}}>Challan Not Found</h2>
          <p style={{color: '#64748b', marginBottom: '20px'}}>The requested challan details could not be loaded. Please ensure the link is correct or generate a new challan from the homepage.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Go Back Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="challan-page-wrapper bg-light" style={{ minHeight: '100vh', padding: '120px 20px 50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Print Button - Hidden when printing */}
      <div className="no-print" style={{ marginBottom: '20px', width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{color: 'var(--text-muted)', margin: 0}}><i className="fas fa-check-circle text-gradient-teal"></i> Challan generated successfully</p>
        <div>
          <button onClick={() => window.print()} className="btn btn-gradient" style={{ padding: '0.8rem 1.5rem' }}>
            <i className="fas fa-print" style={{marginRight: '8px'}}></i> Print Challan
          </button>
        </div>
      </div>

      {/* A4 Paper Container */}
      <div className="a4-paper">
        
        {/* Header */}
        <div className="challan-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '800', letterSpacing: '-1px' }}>
              <span style={{color: '#2563eb'}}>A</span>
              <span style={{color: '#16a34a'}}>M</span>
              <span style={{color: '#f97316'}}>U</span>
              <span style={{color: 'var(--secondary)', marginLeft: '8px'}}>Developers</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '5px 0 0 0' }}>Software Solutions & Consultancy</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '2px 0 0 0' }}>Email: abubakr.bgnu@gmail.com | amudevelopers.com</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '2px 0 0 0' }}>Phone: 03097354874 | 03014697506</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--secondary)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>PAYMENT CHALLAN</h2>
            <p style={{ margin: '2px 0' }}><strong>Challan No:</strong> {data.challanNo}</p>
            <p style={{ margin: '2px 0' }}><strong>Date of Issue:</strong> {data.date}</p>
            <p style={{ margin: '2px 0', color: 'var(--accent)', fontWeight: 'bold' }}><strong>Due Date:</strong> {data.dueDate}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="challan-client-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div style={{ width: '48%' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Billed To:</h3>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--secondary)', margin: '0 0 5px 0' }}>{data.client.name}</h4>
            {data.client.company && <p style={{ margin: '0 0 5px 0', fontWeight: '500' }}>{data.client.company}</p>}
            <p style={{ margin: '0 0 5px 0', color: '#475569' }}>{data.client.address}</p>
            <p style={{ margin: '0 0 5px 0', color: '#475569' }}>{data.client.phone}</p>
            <p style={{ margin: '0 0 5px 0', color: '#475569' }}>{data.client.email}</p>
          </div>
          <div style={{ width: '48%', background: '#f8fafc', padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Payment Status:</h3>
              <h2 style={{ color: status === 'PAID' ? '#16a34a' : 'var(--accent)', margin: 0, fontSize: '1.5rem', textTransform: 'uppercase' }}>{status}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '3px' }}>{status === 'PAID' ? 'Amount Paid:' : 'Amount Due:'}</span>
                <strong style={{ color: 'var(--secondary)' }}>${data.price}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '3px' }}>Payment Method:</span>
                <strong style={{ color: 'var(--secondary)' }}>Bank Transfer</strong>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '3px' }}>Issued On:</span>
                <strong style={{ color: 'var(--secondary)' }}>{data.date}</strong>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '3px' }}>Valid Until:</span>
                <strong style={{ color: 'var(--secondary)' }}>{data.dueDate}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="challan-table-wrapper" style={{ marginBottom: '3rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1.5rem 1rem', verticalAlign: 'top' }}>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--secondary)', display: 'block', marginBottom: '5px' }}>{data.plan} Web Development Package</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Comprehensive software development services as per package specifications:</span>
                  {data.features && (
                    <ul style={{ margin: '0 0 0 20px', padding: 0, color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {data.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td style={{ padding: '1.5rem 1rem', textAlign: 'center', verticalAlign: 'top' }}>1</td>
                <td style={{ padding: '1.5rem 1rem', textAlign: 'right', fontWeight: '600', verticalAlign: 'top' }}>${data.price}</td>
              </tr>
            </tbody>
          </table>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <div style={{ width: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Subtotal:</span>
                <strong>${data.price}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Tax (0%):</span>
                <strong>$0.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', marginTop: '0.5rem', background: '#f8fafc', borderRadius: '5px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', marginLeft: '10px' }}>Total Amount:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginRight: '10px' }}>${data.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="challan-footer" style={{ borderTop: '2px solid #e2e8f0', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '60%' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '10px' }}>Bank Transfer Details:</h3>
            <p style={{ margin: '3px 0', fontSize: '0.95rem' }}><strong>Bank Name:</strong> Meezan Bank</p>
            <p style={{ margin: '3px 0', fontSize: '0.95rem' }}><strong>Account Title:</strong> Abubakar Siddique</p>
            <p style={{ margin: '3px 0', fontSize: '0.95rem' }}><strong>Account No:</strong> PK87MEZN0098690114217768</p>
            <p style={{ margin: '15px 0 0 0', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>Please send the payment receipt to abubakr.bgnu@gmail.com with your Challan No.</p>
          </div>
          <div style={{ width: '30%', textAlign: 'center', border: '1px dashed #cbd5e1', padding: '1.5rem', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Official Seal / Sign</h4>
            {status === 'PAID' ? (
              <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <span style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", fontSize: '2.5rem', color: '#0f172a', transform: 'rotate(-5deg)', fontWeight: 'bold' }}>Abubakar</span>
              </div>
            ) : (
              <div style={{ height: '80px', width: '100%', borderBottom: '1px solid #000', marginBottom: '10px' }}></div>
            )}
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Authorized Signature</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Challan;

