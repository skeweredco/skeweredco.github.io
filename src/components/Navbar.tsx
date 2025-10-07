import { useState, useEffect } from 'react';
import './Navbar.css';
import logoImage from '../assets/images/skeweredco_logo.png';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      
      // Check which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Add background to navbar when scrolled
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close menu after clicking
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <img src={logoImage} alt="Skewered Co Logo" className="logo-image" />
        </div>
        
        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className={activeSection === 'home' ? 'active' : ''}>
            <button onClick={() => scrollToSection('home')}>Home</button>
          </li>
          <li className={activeSection === 'about' ? 'active' : ''}>
            <button onClick={() => scrollToSection('about')}>About</button>
          </li>
          <li className={activeSection === 'services' ? 'active' : ''}>
            <button onClick={() => scrollToSection('services')}>Services</button>
          </li>
          <li className={activeSection === 'contact' ? 'active' : ''}>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;