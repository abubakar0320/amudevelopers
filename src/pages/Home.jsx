import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SiteContext } from '../context/SiteContext';

export default function Home() {
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
      {/* 1. Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1 bg-gradient-purple"></div>
          <div className="shape shape-2 bg-gradient-teal"></div>
        </div>
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 className="fade-up" dangerouslySetInnerHTML={{ __html: siteData.heroTitle }}></h1>
            <p className="fade-up delay-1">{siteData.heroSubtitle}</p>
            <div className="hero-btns fade-up delay-2">
              <Link to="/contact" className="btn btn-gradient">Get Started Now</Link>
              <Link to="/portfolio" className="btn btn-outline">Our Work</Link>
            </div>
          </div>
          <div className="hero-image-wrapper fade-up delay-2">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tech Team Collaborating" />
          </div>
        </div>
      </section>

      {/* 1.5 Client Logos Marquee */}
      <section className="client-logos-section">
        <div className="marquee-container">
          <div className="marquee-content">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" />
          </div>
          <div className="marquee-content">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" />
          </div>
        </div>
      </section>

      {/* 2. Services Overview */}
      <section className="section-padding dark-section" style={{background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)'}}>
        <div className="container">
          <div className="section-title fade-up">
            <h2 className="text-gradient-cyan">Our Core Services</h2>
            <p>Everything you need to get your business online, looking great, and growing fast.</p>
          </div>
          <div className="services-grid">
            {siteData.services?.slice(0, 4).map((service, idx) => {
              const glowClass = idx === 0 ? 'box-glow-blue' : idx === 1 ? 'box-glow-green' : idx === 2 ? 'box-glow-orange' : 'box-glow-purple';
              const iconBg = idx === 0 ? 'bg-gradient-primary' : idx === 1 ? 'bg-gradient-green' : idx === 2 ? 'bg-gradient-orange' : 'bg-gradient-purple';
              return (
              <div className={`service-card glass-dark fade-up ${glowClass}`} key={service.id || idx} style={{transitionDelay: `${idx * 0.1}s`}}>
                <div className={`service-icon ${iconBg}`}>
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            )})}
          </div>
          <div className="text-center mt-5 fade-up delay-3" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>View All Services <i className="fas fa-arrow-right" style={{marginLeft: '8px'}}></i></Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Portfolio (NEW SECTION) */}
      <section className="section-padding" style={{background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'}}>
        <div className="container">
          <div className="section-title fade-up">
            <h2 className="text-gradient-sunset">Our Latest Work</h2>
            <p>Browse through some of our most recent successful projects.</p>
          </div>
          <div className="portfolio-gallery">
            {(siteData.portfolio && siteData.portfolio.length > 0 ? siteData.portfolio.slice(0,3) : [
              { title: "E-Commerce Platform", category: "Web App", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80", color: "purple" },
              { title: "FinTech Dashboard", category: "UI/UX Design", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", color: "teal" },
              { title: "Healthcare Mobile App", category: "Mobile Dev", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80", color: "orange" }
            ]).map((item, idx) => {
              const colors = ['purple', 'teal', 'orange'];
              const badgeColor = item.color || colors[idx % 3];
              const glowClass = idx === 0 ? 'box-glow-purple' : idx === 1 ? 'box-glow-teal' : 'box-glow-orange';
              return (
              <div className={`portfolio-card fade-up ${glowClass}`} key={item.id || idx} style={{transitionDelay: `${idx * 0.1}s`}}>
                <div className="portfolio-img">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="portfolio-content glass-card" style={{border: 'none', borderRadius: '0 0 20px 20px', boxShadow: 'none', background: 'rgba(255,255,255,0.95)'}}>
                  <h3 className="portfolio-title" style={{marginBottom: '0.5rem', fontSize: '1.4rem'}}>{item.title}</h3>
                  <Link to="/portfolio" style={{color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem'}}>View Details <i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div className="container">
          <div className="section-title fade-up">
            <h2 className="text-gradient-pink">Why Choose Us</h2>
            <p>Good code is just the start. We genuinely care about your business success.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: 'fa-lightbulb', title: 'Smart Solutions', desc: 'We build websites and apps that actually solve your everyday business problems.', color: 'bg-gradient-purple', glow: 'box-glow-purple' },
              { icon: 'fa-clock', title: 'Always On Time', desc: 'We respect your deadlines and deliver exactly when we promise.', color: 'bg-gradient-orange', glow: 'box-glow-orange' },
              { icon: 'fa-shield-alt', title: 'Highly Secure', desc: 'Your data is locked down and protected from day one.', color: 'bg-gradient-teal', glow: 'box-glow-teal' },
              { icon: 'fa-headset', title: 'Here When You Need Us', desc: 'Got a question or need a quick fix? Our team is always just a message away.', color: 'bg-gradient-primary', glow: 'box-glow-blue' }
            ].map((feature, idx) => (
              <div className={`feature-item glass-card fade-up ${feature.glow}`} key={idx} style={{transitionDelay: `${idx * 0.1}s`, background: 'rgba(255,255,255,0.95)'}}>
                <div className={`feature-icon ${feature.color}`} style={{color: 'white', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'}}><i className={`fas ${feature.icon}`}></i></div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tech Stack */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
        <div className="container">
          <div className="section-title fade-up">
            <h2 className="text-gradient-amu">Technologies We Use</h2>
            <p>We use the best modern tools to make sure your app is fast, secure, and ready to scale.</p>
          </div>
          <div className="tech-grid fade-up delay-1">
            {[
              { icon: 'fa-react', name: 'React', color: '#61DAFB' },
              { icon: 'fa-js', name: 'Next.js', color: '#000000' },
              { icon: 'fa-node-js', name: 'Node.js', color: '#339933' },
              { icon: 'fa-laravel', name: 'Laravel', color: '#FF2D20' },
              { icon: 'fa-python', name: 'Python', color: '#3776AB' },
              { icon: 'fa-envira', name: 'MongoDB', color: '#47A248' },
              { icon: 'fa-aws', name: 'AWS', color: '#232F3E' },
              { icon: 'fa-docker', name: 'Docker', color: '#2496ED' }
            ].map((tech, idx) => (
              <div className="tech-item" key={idx} style={{filter: 'none', opacity: 1}}>
                <i className={`fab ${tech.icon}`} style={{color: tech.color}}></i>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Process */}
      <section id="process" className="section-padding" style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)' }}>
        <div className="container">
          <div className="section-title fade-up">
            <h2 className="text-gradient-emerald">How We Work</h2>
            <p>A simple, transparent process to take your idea and turn it into reality.</p>
          </div>
          
          <div className="process-timeline">
            {[
              { icon: 'fa-search', title: 'Discovery' },
              { icon: 'fa-clipboard-list', title: 'Planning' },
              { icon: 'fa-pen-nib', title: 'Design' },
              { icon: 'fa-code', title: 'Development' },
              { icon: 'fa-vial', title: 'Testing' },
              { icon: 'fa-rocket', title: 'Launch' }
            ].map((step, idx) => (
              <div className="process-step fade-up" key={idx} style={{transitionDelay: `${idx * 0.1}s`}}>
                <div className="process-icon bg-gradient-teal" style={{color: 'white', border: 'none', boxShadow: '0 10px 25px rgba(13, 148, 136, 0.3)'}}><i className={`fas ${step.icon}`}></i></div>
                <h3>{step.title}</h3>
                <p>Step 0{idx+1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 Meet the Team */}
      <section className="section-padding" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <div className="container">
          <div className="section-title fade-up">
            <h2 className="text-gradient-pink">Meet The Experts</h2>
            <p>The brilliant minds behind our successful projects.</p>
          </div>
          <div className="team-grid">
            {[
              { 
                name: "Abubakar Siddique", 
                role: "CEO of AMU Developers", 
                skills: ["MERN Stack", "Mobile Apps", "Software Architecture"],
                bio: "Leading the company vision while engineering robust and scalable software solutions.",
                socials: { github: "#", linkedin: "#", twitter: "#" },
                img: "/Abubakar Siddiue.jpg",
                coverColor: "bg-gradient-purple"
              },
              { 
                name: "Shoaib Afzal Chattha", 
                role: "Full Stack Developer", 
                skills: ["React.js", "Node.js", "Database Design"],
                bio: "Crafting seamless user experiences and powerful backend systems for modern web apps.",
                socials: { github: "#", linkedin: "#", twitter: "#" },
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
                coverColor: "bg-gradient-orange"
              },
              { 
                name: "Shakeel Umair", 
                role: "Full Stack & Mobile App Developer", 
                skills: ["React Native", "Web Apps", "API Development"],
                bio: "Specializing in bridging the gap between web and mobile platforms with pixel-perfect design.",
                socials: { github: "#", linkedin: "#", twitter: "#" },
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
                coverColor: "bg-gradient-teal"
              }
            ].map((member, idx) => (
              <div className="profile-card fade-up" key={idx} style={{transitionDelay: `${idx * 0.1}s`}}>
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
                      <span key={i} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="profile-footer">
                  {member.socials.linkedin !== '#' && <a href={member.socials.linkedin} title="LinkedIn" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>}
                  {member.socials.github !== '#' && <a href={member.socials.github} title="GitHub" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>}
                  {member.socials.twitter !== '#' && <a href={member.socials.twitter} title="Twitter" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="section-padding dark-section" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'}}>
        <div className="container">
          <div className="section-title fade-up">
            <h2>Client Feedback</h2>
            <p>See what it's like working with our team.</p>
          </div>
          <div className="testimonials-grid">
            {[
              { text: "They completely understood what we needed from day one. The app is incredibly fast and our customers love it.", name: "Sarah Jenkins", role: "Business Owner", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", glow: 'box-glow-blue' },
              { text: "Very professional and easy to work with. They hit every deadline and even helped us figure out better ways to do things.", name: "David Chen", role: "Startup Founder", img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", glow: 'box-glow-green' },
              { text: "Finding good developers is tough, but these guys are the real deal. Great communication and amazing final results.", name: "Emily Rodriguez", role: "Marketing Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", glow: 'box-glow-orange' }
            ].map((testimonial, idx) => (
              <div className={`testimonial-card glass-dark fade-up ${testimonial.glow}`} key={idx} style={{transitionDelay: `${idx * 0.1}s`}}>
                <div className="stars" style={{color: '#f59e0b'}}>
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="client-info">
                  <div className="client-avatar">
                    <img src={testimonial.img} alt={testimonial.name} />
                  </div>
                  <div className="client-details">
                    <h4>{testimonial.name}</h4>
                    <p style={{color: '#cbd5e1'}}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5 FAQ Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)' }}>
        <div className="container">
          <div className="section-title fade-up">
            <h2>Common Questions</h2>
            <p>Everything you need to know about working with us.</p>
          </div>
          <div className="faq-container fade-up">
            {[
              { q: "How much does a project typically cost?", a: "Every project is unique. Our pricing depends on the scope, features, and timeline of your requirements. We offer free consultations to give you an accurate estimate." },
              { q: "Do you provide post-launch support?", a: "Yes, we offer comprehensive maintenance and support packages to ensure your software remains secure, up-to-date, and running smoothly after launch." },
              { q: "How long does it take to build an app?", a: "A standard web application usually takes 8-12 weeks from design to launch. More complex platforms may take 4-6 months. We will provide a strict timeline during planning." },
              { q: "Will I own the source code?", a: "Absolutely. Once the final payment is cleared, you retain 100% ownership of the intellectual property and source code." }
            ].map((faq, idx) => (
              <div className="faq-item" key={idx}>
                <details>
                  <summary>{faq.q}</summary>
                  <div className="faq-content">{faq.a}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.7 Pricing Packages */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <div className="container">
          <div className="section-title fade-up">
            <h2 className="text-gradient-amu">Our Packages</h2>
            <p>Simple, predictable pricing with a comprehensive list of deliverables.</p>
          </div>
          <div className="pricing-grid">
            {/* Startup */}
            <div className="pricing-card glass-card fade-up box-glow-green">
              <div className="pricing-header">
                <h3>Starter</h3>
                <div className="price"><span>$</span>150</div>
                <p>Perfect for small businesses & portfolios</p>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check text-gradient-teal"></i> Custom UI Design (Up to 5 Pages)</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Fully Responsive (Mobile Friendly)</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Contact Form Integration</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Basic SEO Optimization</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Speed Optimization (90+ Score)</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Social Media Links Integration</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Domain & Hosting Setup Help</li>
                <li><i className="fas fa-check text-gradient-teal"></i> 1 Month Free Support</li>
                <li><i className="fas fa-check text-gradient-teal"></i> 1 Revision Included</li>
                <li className="disabled"><i className="fas fa-times"></i> Custom Backend / Admin Panel</li>
                <li className="disabled"><i className="fas fa-times"></i> E-commerce Functionality</li>
                <li className="disabled"><i className="fas fa-times"></i> Payment Gateway Integration</li>
                <li className="disabled"><i className="fas fa-times"></i> Dedicated Server Deployment</li>
                <li className="disabled"><i className="fas fa-times"></i> Push Notifications</li>
              </ul>
              <Link to="/checkout?plan=Starter&price=150" className="btn btn-outline" style={{width: '100%', borderColor: 'var(--brand-green)', color: 'var(--brand-green)'}}>Get Started</Link>
            </div>
            {/* Professional */}
            <div className="pricing-card glass-card popular fade-up delay-1 box-glow-blue" style={{border: '2px solid var(--primary)', transform: 'scale(1.05)'}}>
              <div className="popular-badge bg-gradient-primary">Most Popular</div>
              <div className="pricing-header">
                <h3>Professional</h3>
                <div className="price"><span>$</span>300</div>
                <p>For growing agencies & businesses</p>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check text-gradient-teal"></i> Advanced UI/UX (Up to 15 Pages)</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Custom Backend Admin Panel</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Database Integration (SQL/NoSQL)</li>
                <li><i className="fas fa-check text-gradient-teal"></i> User Authentication & Roles</li>
                <li><i className="fas fa-check text-gradient-teal"></i> E-commerce Setup (50 Products)</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Stripe / PayPal Integration</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Advanced On-Page SEO</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Free SSL & Cloud Deployment</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Automated Email / Newsletter</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Basic Security & Speed Audit</li>
                <li><i className="fas fa-check text-gradient-teal"></i> 3 Months Free Support</li>
                <li><i className="fas fa-check text-gradient-teal"></i> 3 Revisions Included</li>
                <li className="disabled"><i className="fas fa-times"></i> Cross-Platform Mobile App</li>
                <li className="disabled"><i className="fas fa-times"></i> Advanced CI/CD Pipelines</li>
              </ul>
              <Link to="/checkout?plan=Professional&price=300" className="btn btn-gradient" style={{width: '100%'}}>Get Started</Link>
            </div>
            {/* Enterprise */}
            <div className="pricing-card glass-card fade-up delay-2 box-glow-orange">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="price"><span>$</span>499<span>+</span></div>
                <p>For large scale complex applications</p>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check text-gradient-teal"></i> Unlimited Pages & Screens</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Full-Stack Web App Development</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Mobile App (Android & iOS)</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Custom REST/GraphQL APIs</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Multi-Vendor E-commerce Setup</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Scalable AWS/VPS Architecture</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Multiple Payment Gateways</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Real-time WebSockets & Chat</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Advanced Analytics Dashboard</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Full Penetration Security Test</li>
                <li><i className="fas fa-check text-gradient-teal"></i> CI/CD Pipeline Automation</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Unlimited Design Revisions</li>
                <li><i className="fas fa-check text-gradient-teal"></i> 1 Year Premium 24/7 Support</li>
                <li><i className="fas fa-check text-gradient-teal"></i> Dedicated Slack Channel & PM</li>
              </ul>
              <Link to="/checkout?plan=Enterprise&price=499" className="btn btn-outline" style={{width: '100%', borderColor: 'var(--primary)', color: 'var(--primary)'}}>Get Started</Link>
            </div>
          </div>
        </div>
      </section>


      {/* 8.5 Latest Insights / Blog */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #ffffff, #fdfbfb)' }}>
        <div className="container">
          <div className="section-title fade-up">
            <h2>Latest News & Articles</h2>
            <p>Stay updated with the latest trends in technology and design.</p>
          </div>
          <div className="blog-grid">
            {[
              { title: "The Future of React and Server Components", date: "June 15, 2026", category: "Development", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80" },
              { title: "Why UI/UX Design is Crucial for Startups", date: "June 10, 2026", category: "Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80" },
              { title: "Scaling Node.js Applications on AWS", date: "June 02, 2026", category: "Cloud", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" }
            ].map((post, idx) => (
              <div className="blog-card glass-card fade-up" key={idx} style={{padding: 0, transitionDelay: `${idx * 0.1}s`}}>
                <div className="blog-img" style={{height: '200px', overflow: 'hidden'}}>
                  <img src={post.img} alt={post.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
                <div className="blog-content" style={{padding: '2rem'}}>
                  <h3 style={{fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--secondary)'}}>{post.title}</h3>
                  <div style={{color: 'var(--text-muted-light)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span><i className="far fa-calendar-alt"></i> {post.date}</span>
                    <Link to="#" onClick={(e) => { e.preventDefault(); alert("Blog is coming soon!"); }} style={{color: 'var(--primary)', fontWeight: '600'}}>Coming Soon <i className="fas fa-clock"></i></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5 fade-up delay-3" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="#" onClick={(e) => { e.preventDefault(); alert("Blog is coming soon!"); }} className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>View All Articles <i className="fas fa-arrow-right" style={{marginLeft: '8px'}}></i></Link>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #cffafe 0%, #e0e7ff 100%)', textAlign: 'center' }}>
        <div className="container fade-up glass-card" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.85)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: 'var(--secondary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: '800' }}>Have a project in mind?</h2>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.15rem)', color: 'var(--text-muted)', marginBottom: '2.5rem', margin: '0 auto 2.5rem' }}>Let's talk about your ideas and see how we can help. No pressure, just a friendly chat.</p>
          <Link to="/contact" className="btn btn-gradient" style={{ padding: '1rem 3rem', fontSize: '1.1rem', width: 'auto' }}>Let's Chat Now</Link>
        </div>
      </section>
    </>
  );
}

