import { useEffect, useRef } from 'react';
import logoImage from '../assets/images/skeweredco_logo.png';
import '../styles/Home.css';

const Home = () => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => subtitleRef.current?.classList.add('animate-in'), 300);
    setTimeout(() => buttonRef.current?.classList.add('animate-in'), 600);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('services');
    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <div className="home-logo-image-container">
          <img
            src={logoImage}
            alt="Skewered Co logo"
            className="home-logo-image"
          />
        </div>
        <p ref={subtitleRef} className="subtitle">
          Savor the authentic flavors of Japan, grilled to perfection.
        </p>
        <button ref={buttonRef} className="cta-button" onClick={scrollToMenu}>
          View Menu
        </button>
      </div>
    </section>
  );
};

export default Home;
