import { useState } from 'react';
import type { FormEvent } from 'react';
import '../styles/Contact.css';

const VITE_WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: VITE_WEB3FORMS_ACCESS_KEY,
          ...formData,
          subject: `[Skewered Co Website: ContactForm] Submission from ${formData.name}`,
        }),
      })
        .then(res => res.json())
        .then(data => {
          setIsSubmitting(false);
          if (data.success) {
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 5000);
          } else {
            setSubmitError(
              data.message || 'An error occurred. Please try again.'
            );
          }
        })
        .catch(() => {
          setIsSubmitting(false);
          setSubmitError('An error occurred. Please try again.');
        });
    }
  };


  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        {/* <p className="contact-subtitle">Get in touch with us for your catering needs</p> */}

        <div className="contact-content">
          {/* Google Calendar Embed */}
          <div className="calendar-container animate-in">
            <h3>Upcoming Events</h3>
            <div className="google-calendar-wrapper">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FPhoenix&showPrint=0&showTz=0&showCalendars=0&showTabs=0&showTitle=0&src=ZTUwZmVkYWQ5NzExNTA0YzdmNmFiYWI4NWVkMDlmYzZkY2YzNGM1MWEzOWFmYTRkOTlkN2VhOTlmYzY2ODQ5OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23a79b8e"
              />
            </div>
          </div>

          <div className="contact-form-container visible">
            <h3>Get in Touch</h3>

            {submitSuccess ? (
              <div className="success-message">
                <p>Thank you for your message! We will get back to you soon.</p>
              </div>
            ) : (
              <> {submitError && <div className="error-message">{submitError}</div>}
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
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
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
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.message && (
                      <span className="error-message">{errors.message}</span>
                    )}
                  </div>
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;