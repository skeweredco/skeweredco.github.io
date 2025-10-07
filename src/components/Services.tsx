import { useEffect, useRef } from 'react';
import './components.css';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const ServiceCard = ({ title, description, icon, delay }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('animate-in');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div ref={cardRef} className="service-card">
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <ServiceCard
            title="Private Catering"
            description="Elevate your private events with authentic Japanese street food. We offer customized menus tailored to your preferences and dietary requirements, bringing the vibrant flavors of Japan to your special occasion."
            icon="🍱"
            delay={0}
          />
          <ServiceCard
            title="Farmers Market Events"
            description="Find us at local farmers markets throughout Arizona. We bring fresh, made-to-order Japanese street food to community events, offering a taste of authentic cuisine in a casual, vibrant atmosphere."
            icon="🏪"
            delay={200}
          />
          <ServiceCard
            title="On-Site Grilling"
            description="Experience the excitement of live Japanese grilling at your event. Our skilled chefs prepare delicious skewers and other specialties right before your eyes, creating an interactive and memorable dining experience."
            icon="🔥"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;