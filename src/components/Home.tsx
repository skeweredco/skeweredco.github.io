import { useEffect, useRef } from 'react';
import '../styles/Home.css';

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add('animate-in');
    }

    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('animate-in');
      }
    }, 300);

    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.classList.add('animate-in');
      }
    }, 600);
  }, []);

  const scrollToMenu = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="home-section">
      <div className="home-image-container">
        <div className="home-image-overlay"></div>
      </div>
      <div className="home-content">
        <h1 ref={titleRef} className="title">Skewered Co</h1>
        <p ref={subtitleRef} className="subtitle">Savor the authentic flavors of Japan, grilled to perfection</p>
        <button ref={buttonRef} className="cta-button" onClick={scrollToMenu}>
          View Menu
        </button>
      </div>
    </section>
  );
};

export default Home;