import { useEffect, useRef } from 'react';
import './components.css';

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
              Skewered Co has been a staple in the Japanese street food scene for 10 years, 
              specializing in events at local farmers markets and private catering. Our unique 
              selling point is our dedication to bringing the authentic taste of Japan to Arizona, 
              one skewer at a time.
            </p>
            <p>
              Skewered Co has built a reputation for excellence over the past decade, becoming 
              synonymous with quality and authenticity in Japanese street food. Our team's passion 
              for culinary craftsmanship shines through in every dish we serve, creating memorable 
              experiences for our customers.
            </p>
            <p>
              We take pride in sourcing the finest ingredients and staying true to traditional recipes, 
              ensuring that each bite transports you to the bustling streets of Japan. With a commitment 
              to flavor and a flair for innovation, Skewered Co continues to delight taste buds and 
              captivate food enthusiasts across Arizona.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;