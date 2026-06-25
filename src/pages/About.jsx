import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function About() {
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
      <section style={{ padding: '160px 0 80px 0', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: '400px', height: '400px', background: 'rgba(14, 165, 233, 0.4)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '400px', height: '400px', background: 'rgba(236, 72, 153, 0.4)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', top: '20%', right: '30%', width: '200px', height: '200px', background: 'rgba(245, 158, 11, 0.3)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="fade-up delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Empowering Businesses <br/> Through <span style={{ background: 'linear-gradient(to right, #2dd4bf, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Innovation</span></h1>
          <p className="fade-up delay-2" style={{ fontSize: '1.2rem', color: '#e2e8f0', maxWidth: '700px', margin: '0 auto' }}>We are a team of passionate engineers, designers, and strategists dedicated to delivering cutting-edge software solutions.</p>
        </div>
      </section>

      {/* 2. Our Story / Mission */}
      <section className="section-padding" style={{ background: 'linear-gradient(120deg, #fdfbfb 0%, #f3f4f6 100%)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '150px', height: '150px', background: 'rgba(168, 85, 247, 0.15)', filter: 'blur(40px)', borderRadius: '50%' }}></div>
        <div className="container about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="about-img fade-up" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', left: '-20px', width: '100%', height: '100%', border: '4px solid var(--primary)', borderRadius: '20px', zIndex: 0 }}></div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="AMU Developers Team" style={{ position: 'relative', zIndex: 1, borderRadius: '20px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
          <div className="about-text fade-up delay-1">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--secondary)', fontWeight: '800' }}>We Build Software That <span className="text-gradient-purple">Drives Growth</span></h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.7', fontSize: '1.1rem' }}>Our mission is to empower businesses with cutting-edge technology. We envision a digital world where software bridges the gap between complex problems and elegant solutions.</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.1rem' }}>Started by a team of visionary developers, AMU Developers has grown into a premium software house that values clean code, stunning design, and ultimately, our clients' success.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#dbeafe', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-check"></i></div>
                <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>Certified Experts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#dcfce7', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-check"></i></div>
                <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>Agile Methodology</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#ffedd5', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-check"></i></div>
                <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>Transparent Process</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#f3e8ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-check"></i></div>
                <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #eff6ff, #f8fafc)' }}>
        <div className="container">
          <div className="section-title fade-up text-center">
            <h2>What <span className="text-gradient-orange">Drives Us</span></h2>
            <p>The principles that guide our work and relationships with clients.</p>
          </div>
          
          <div className="features-grid">
            {[
              { icon: 'fa-gem', title: 'Quality Assurance', desc: 'We never compromise on the quality of our code and designs.', color: 'purple' },
              { icon: 'fa-rocket', title: 'Innovation', desc: 'Constantly exploring new technologies to give you a competitive edge.', color: 'orange' },
              { icon: 'fa-handshake', title: 'Integrity', desc: 'Honest communication and transparent billing from day one.', color: 'teal' },
              { icon: 'fa-heart', title: 'Client Success', desc: 'Your success is our success. We genuinely care about your business.', color: 'primary' }
            ].map((feat, idx) => (
              <div className="feature-item glass-card fade-up" key={idx} style={{transitionDelay: `${idx * 0.1}s`, background: 'rgba(255,255,255,0.7)', borderTop: `4px solid var(--${feat.color})`}}>
                <div className={`feature-icon bg-gradient-${feat.color}`} style={{color: 'white', border: 'none', boxShadow: `0 10px 20px var(--${feat.color}-light, rgba(0,0,0,0.1))`}}><i className={`fas ${feat.icon}`}></i></div>
                <div className="feature-content">
                  <h3 style={{ color: 'var(--secondary)' }}>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from the Founder */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="glass-card fade-up box-glow-blue" style={{ padding: '3rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src="/Abubakar Siddiue.jpg" alt="Abubakar Siddique" style={{ width: '100%', maxWidth: '350px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }} />
                <div className="bg-gradient-primary" style={{ position: 'absolute', bottom: '-20px', right: '-20px', padding: '1rem 2rem', borderRadius: '10px', color: 'white', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(59,130,246,0.3)' }}>
                  CEO & Founder
                </div>
              </div>
            </div>
            <div style={{ flex: '2 1 400px' }}>
              <h2 className="text-gradient-amu" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>A Message From The Founder</h2>
              <i className="fas fa-quote-left" style={{ fontSize: '3rem', color: 'rgba(59,130,246,0.2)', marginBottom: '1rem' }}></i>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "At AMU Developers, we don't just write code; we build digital experiences that drive real business growth. Our vision was always to create an agency where passion meets precision, and where every client feels like our only client. We treat your projects as if they were our own, ensuring top-tier quality, security, and scalability from day one."
              </p>
              <h4 style={{ fontSize: '1.3rem', color: 'var(--secondary)', marginBottom: '0.2rem' }}>Abubakar Siddique</h4>
              <p style={{ color: 'var(--primary)', fontWeight: '600' }}>Founder & Lead Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Overview */}
      <section className="section-padding" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <div className="container">
          <div className="section-title fade-up text-center">
            <h2>Meet The <span className="text-gradient-teal">Founders & Team</span></h2>
            <p>The brilliant minds behind AMU Developers.</p>
          </div>
          <div className="team-grid">
            {[
              { 
                name: "Abubakar Siddique", 
                role: "CEO & Full Stack Expert", 
                skills: ["MERN Stack", "Mobile Apps", "Architecture"],
                bio: "Leading the company vision while engineering robust and scalable software solutions.",
                img: "/Abubakar Siddiue.jpg",
                coverColor: "bg-gradient-purple"
              },
              { 
                name: "Shoaib Afzal Chattha", 
                role: "Full Stack Developer", 
                skills: ["React.js", "Node.js", "Databases"],
                bio: "Crafting seamless user experiences and powerful backend systems for modern web apps.",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
                coverColor: "bg-gradient-orange"
              },
              { 
                name: "Shakeel Umair", 
                role: "Full Stack & Mobile App Dev", 
                skills: ["React Native", "Web Apps", "APIs"],
                bio: "Specializing in bridging the gap between web and mobile platforms with pixel-perfect design.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
                coverColor: "bg-gradient-teal"
              }
            ].map((member, idx) => (
              <div className="profile-card fade-up" key={idx} style={{transitionDelay: `${idx * 0.1}s`, background: 'white'}}>
                <div className="profile-header">
                  <div className={`profile-cover ${member.coverColor}`}></div>
                  <div className="profile-avatar">
                    <img src={member.img} alt={member.name} />
                  </div>
                </div>
                <div className="profile-body">
                  <h3>{member.name}</h3>
                  <p className="profile-role">{member.role}</p>
                  <p className="profile-bio">{member.bio}</p>
                  <div className="profile-skills">
                    {member.skills.map((skill, i) => (
                      <span key={i} className="skill-badge" style={{background: '#f1f5f9', color: '#475569'}}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. CTA */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #cffafe 0%, #e0e7ff 100%)', textAlign: 'center' }}>
        <div className="container fade-up glass-card" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.85)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: 'var(--secondary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: '800' }}>Ready to transform your idea into reality?</h2>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.15rem)', color: 'var(--text-muted)', marginBottom: '2.5rem', margin: '0 auto 2.5rem' }}>Join hundreds of satisfied clients who trust AMU Developers to build their digital future.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-gradient" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>Let's Talk Now</Link>
            <Link to="/portfolio" className="btn btn-outline" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}>View Our Work</Link>
          </div>
        </div>
      </section>
    </>
  );
}

