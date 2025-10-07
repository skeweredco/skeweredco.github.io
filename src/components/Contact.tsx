import { useState, useRef, useEffect } from 'react';
import './components.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const formRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Sample events for the calendar
  const events = [
    { date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 10), title: 'Downtown Farmers Market' },
    { date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 15), title: 'Private Event' },
    { date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 22), title: 'Food Festival' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (calendarRef.current) observer.observe(calendarRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
      if (calendarRef.current) observer.unobserve(calendarRef.current);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const event = events.find(e => 
        e.date.getDate() === date.getDate() && 
        e.date.getMonth() === date.getMonth() && 
        e.date.getFullYear() === date.getFullYear()
      );
      
      days.push(
        <div key={day} className={`calendar-day ${event ? 'has-event' : ''}`}>
          <span className="day-number">{day}</span>
          {event && <div className="event-indicator" title={event.title}></div>}
        </div>
      );
    }
    
    return days;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="contact-content">
          <div ref={calendarRef} className="calendar-container">
            <h3>Upcoming Events</h3>
            <div className="calendar">
              <div className="calendar-header">
                <button onClick={prevMonth}>&lt;</button>
                <h4>
                  {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                </h4>
                <button onClick={nextMonth}>&gt;</button>
              </div>
              
              <div className="weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              
              <div className="calendar-days">
                {generateCalendarDays()}
              </div>
              
              <div className="events-legend">
                <div className="event-item">
                  <span className="event-dot"></span>
                  <span>Event Scheduled</span>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={formRef} className="contact-form-container">
            <h3>Get in Touch</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;