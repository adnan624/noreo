import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };
  
  const validateForm = (data) => {
    const errors = {};
    
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.message.trim()) errors.message = 'Message is required';
    
    return errors;
  };

  return (
    <>
      <Head>
        <title>Contact Us | ElectroShop</title>
        <meta name="description" content="Get in touch with our team" />
      </Head>
      
      <Header />
      
      <main className={styles.contactPage}>
        <div className="container">
          <div className={styles.pageHeaderTitle}>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you</p>
          </div>
          
          <div className={styles.contactLayout}>
            <div className={styles.contactInfo}>
              <h2>Get In Touch</h2>
              <p>Have questions about our products or need assistance with your order? Our friendly team is here to help.</p>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3>Address</h3>
                  <p>123 Appliance Street, Tech City, TC 12345</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>info@electroshop.com</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h3>Hours</h3>
                  <p>Monday - Friday: 9am - 6pm<br />
                  Saturday: 10am - 4pm<br />
                  Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className={styles.contactForm}>
              {submitSuccess ? (
                <div className={styles.successMessage}>
                  <i className="fas fa-check-circle"></i>
                  <h2>Thank You!</h2>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                  <button 
                    className="btn btn-outline"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2>Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? styles.error : ''}
                      />
                      {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? styles.error : ''}
                      />
                      {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? styles.error : ''}
                      ></textarea>
                      {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
          
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291665!2d-73.9878449245259!3d40.74844097138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629997983978!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{border:0}}
              allowFullScreen="" 
              loading="lazy"
              title="Our Location on Google Maps"
            ></iframe>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}