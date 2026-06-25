import { useState, useEffect, useRef } from 'react';

export function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (ref.current) observer.observe(ref.current);
    return () => { if(ref.current) observer.disconnect() };
  }, [end, duration]);

  return { count, ref };
}

export default function StatItem({ end, label, suffix = "" }) {
  const { count, ref } = useCounter(end);
  return (
    <div className="stat-item fade-up" ref={ref}>
      <h3>{count}{suffix}</h3>
      <p>{label}</p>
    </div>
  );
}
