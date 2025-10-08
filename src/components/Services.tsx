import { useEffect, useRef } from 'react';
import '../styles/Services.css';

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
        <h2 className="section-title">What We Do</h2>
        <div className="services-grid">
          <ServiceCard
            title="Farmers Markets"
            description="Fresh vibes. Local flavor. 🍢 Catch us at your favorite farmers markets serving up sizzling skewers and street food made right on the spot. Come hungry, leave happy 😋🔥"
            icon="🍢"
            delay={200}
          />
          <ServiceCard
            title="Night Markets"
            description="The grill lights up when the sun goes down 🏮✨ Swing by our night market booth for bold flavors, good music, and late-night bites that hit different 😎🍢"
            icon="🏮"
            delay={0}
          />
          <ServiceCard
            title="Interactive Experience"
            description="Let's turn your event into a food show 👨‍🍳🔥 Watch our chefs work the grill and serve up fresh skewers right in front of you. Good food, good vibes, unforgettable moments 😍"
            icon="👨‍🍳"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;