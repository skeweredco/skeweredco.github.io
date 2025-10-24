import { FaFacebook, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Skewered Co</h3>
            <p>Savoring the authentic flavors of Japan</p>
          </div>

          <div className="footer-social">
            <p>Follow us on social media</p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/skeweredco/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578722771553"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Skewered Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
