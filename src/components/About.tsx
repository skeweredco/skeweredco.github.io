import { useEffect, useRef } from 'react';
import '../styles/About.css';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('animate-in');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div ref={sectionRef} className="about-content">
          <div className="chef-image">
            <div className="image-container">
              {/* Chef image would go here */}
              <div className="chef-placeholder">
                <span>Chef Henry Tran</span>
              </div>
            </div>
          </div>
          <div className="about-text">
            <p>
              At Skewered Co, we bring the vibrant flavors of Japanese street food straight to Arizona. From bustling farmers markets to private events, our mission is simple: serve up bold, authentic skewers that make every moment unforgettable.
            </p>
            <p>
              Inspired by Japan's lively food stalls, our team blends traditional recipes with fresh, local ingredients to create dishes that are both nostalgic and exciting. Every skewer is grilled to perfection, crafted with care, and served with a smile.
            </p>
            <p>
              Whether you're discovering us at a market or inviting us to your special event, Skewered Co is here to turn everyday moments into delicious memories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;