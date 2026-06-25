import { useEffect } from 'react';

export default function Portfolio() {
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

  const teamPortfolios = [
    {
      name: "Abubakar Siddique",
      role: "CEO of AMU Developers",
      bio: "I am a passionate Full Stack Developer and Software Architect specializing in the MERN stack and Mobile App development. With a strong vision for digital transformation, I lead AMU Developers in building robust, scalable, and high-performance solutions for businesses worldwide.",
      skills: ["MERN Stack", "React Native", "Software Architecture", "Team Leadership", "UI/UX Strategy"],
      link: "https://iamabubakar.site",
      img: "/Abubakar Siddiue.jpg",
      glow: "box-glow-blue",
      badgeColor: "bg-gradient-primary"
    },
    {
      name: "Shoaib Afzal Chattha",
      role: "Full Stack Developer",
      bio: "Dedicated Full Stack Developer with expertise in crafting seamless user experiences and powerful backend systems. I focus on writing clean, efficient code and designing database architectures that power modern, data-driven web applications.",
      skills: ["React.js", "Node.js", "Express", "Database Design", "REST APIs"],
      link: "#",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      glow: "box-glow-green",
      badgeColor: "bg-gradient-green"
    },
    {
      name: "Shakeel Umair",
      role: "Full Stack & Mobile App Developer",
      bio: "Versatile developer specializing in bridging the gap between web and mobile platforms. I excel at building pixel-perfect, responsive interfaces and integrating complex APIs to deliver flawless cross-platform mobile and web applications.",
      skills: ["React Native", "Flutter", "Web Apps", "API Integration", "Frontend Design"],
      link: "#",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      glow: "box-glow-orange",
      badgeColor: "bg-gradient-orange"
    }
  ];

  return (
    <>
      <div className="page-hero">
        <h1 className="text-gradient-amu">Team Portfolios</h1>
        <p>Meet the visionary minds behind AMU Developers</p>
      </div>
      
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div className="section-title fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-gradient-cyan">Our Experts</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Explore the individual portfolios, skills, and detailed backgrounds of our core team members.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {teamPortfolios.map((person, idx) => (
              <div className={`glass-card fade-up ${person.glow}`} key={idx} style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', background: 'rgba(255,255,255,0.95)', transitionDelay: `${idx * 0.1}s`, alignItems: 'center' }}>
                <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <img src={person.img} alt={person.name} style={{ width: '100%', maxWidth: '220px', height: 'auto', borderRadius: '15px', border: '5px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', marginBottom: '1.5rem', background: 'white' }} />
                  <div className={`colorful-badge ${person.badgeColor}`} style={{ color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold' }}>{person.role}</div>
                </div>
                
                <div style={{ flex: '2 1 400px' }}>
                  <h2 style={{ fontSize: '2.2rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>{person.name}</h2>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.05rem' }}>{person.bio}</p>
                  
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {person.skills.map((skill, i) => (
                      <span key={i} style={{ background: 'rgba(15, 23, 42, 0.05)', color: 'var(--secondary)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid rgba(15, 23, 42, 0.1)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {person.link !== '#' ? (
                    <a href={person.link} target="_blank" rel="noreferrer" className="btn btn-gradient" style={{ padding: '0.8rem 2rem', display: 'inline-block' }}>Visit Portfolio <i className="fas fa-external-link-alt" style={{ marginLeft: '8px' }}></i></a>
                  ) : (
                    <button className="btn btn-outline" style={{ padding: '0.8rem 2rem', cursor: 'not-allowed', opacity: 0.7, borderColor: 'var(--secondary)', color: 'var(--secondary)' }} title="Link coming soon" disabled>Portfolio Link Coming Soon</button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
