import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
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
  
  const [focusedFields, setFocusedFields] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleFocus = (field) => {
    setFocusedFields({
      ...focusedFields,
      [field]: true
    });
  };
  
  const handleBlur = (field) => {
    setFocusedFields({
      ...focusedFields,
      [field]: false
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
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
      errors.email = 'Please enter a valid email';
    }
    if (!data.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  return (
    <>
      <Head>
        <title>Contact Us | ElectroShop</title>
        <meta name="description" content="Get in touch with our team" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>
         
      <main className={styles.contactPage}>
        <div className={styles.container}>
          <motion.div 
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Contact Us</h1>
            <p>We'd love to hear from you</p>
          </motion.div>
          
          <div className={styles.contactLayout}>
            <motion.div 
              className={styles.contactInfo}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Contact Information</h2>
              <div className={styles.infoItem}>
                <i className={`fas fa-map-marker-alt ${styles.infoIcon}`}></i>
                <div className={styles.infoContent}>
                  <h3>Our Location</h3>
                  <p>123 Tech Street, Silicon Valley, CA 94000</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <i className={`fas fa-envelope ${styles.infoIcon}`}></i>
                <div className={styles.infoContent}>
                  <h3>Email Us</h3>
                  <p>info@electroshop.com</p>
                  <p>support@electroshop.com</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <i className={`fas fa-phone ${styles.infoIcon}`}></i>
                <div className={styles.infoContent}>
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Fri: 9am-6pm</p>
                </div>
              </div>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}><i className="fab fa-facebook-f"></i></a>
                <a href="#" className={styles.socialLink}><i className="fab fa-twitter"></i></a>
                <a href="#" className={styles.socialLink}><i className="fab fa-instagram"></i></a>
                <a href="#" className={styles.socialLink}><i className="fab fa-linkedin-in"></i></a>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.contactForm}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitSuccess ? (
                <motion.div 
                  className={styles.successMessage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.successIcon}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                  <button 
                    className={styles.backButton}
                    onClick={() => setSubmitSuccess(false)}
                  >
                    <i className="fas fa-arrow-left"></i> Back to Form
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 style={{}}>Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className={`${styles.formGroup} ${(focusedFields.name || formData.name) ? styles.focused : ''} ${errors.name ? styles.error : ''}`}>
                      <label className={styles.formLabel} htmlFor="name">
                        <i className={`fas fa-user ${styles.inputIcon}`}></i>
                        <span>Your Name *</span>
                      </label>
                      <input
                        className={styles.formInput}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                      />
                      {errors.name && (
                        <div className={styles.errorMessage}>
                          <i className="fas fa-exclamation-circle"></i>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    
                    {/* Email Input */}
                    <div className={`${styles.formGroup} ${(focusedFields.email || formData.email) ? styles.focused : ''} ${errors.email ? styles.error : ''}`}>
                      <label className={styles.formLabel} htmlFor="email">
                        <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
                        <span>Email Address *</span>
                      </label>
                      <input
                        className={styles.formInput}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                      />
                      {errors.email && (
                        <div className={styles.errorMessage}>
                          <i className="fas fa-exclamation-circle"></i>
                          {errors.email}
                        </div>
                      )}
                    </div>
                    
                    {/* Phone Input */}
                    <div className={`${styles.formGroup} ${(focusedFields.phone || formData.phone) ? styles.focused : ''}`}>
                      <label className={styles.formLabel} htmlFor="phone">
                        <i className={`fas fa-phone ${styles.inputIcon}`}></i>
                        <span>Phone Number</span>
                      </label>
                      <input
                        className={styles.formInput}
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => handleFocus('phone')}
                        onBlur={() => handleBlur('phone')}
                      />
                    </div>
                    
                    {/* Subject Input */}
                    <div className={`${styles.formGroup} ${(focusedFields.subject || formData.subject) ? styles.focused : ''}`}>
                      <label className={styles.formLabel} htmlFor="subject">
                        <i className={`fas fa-tag ${styles.inputIcon}`}></i>
                        <span>Subject</span>
                      </label>
                      <input
                        className={styles.formInput}
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={() => handleBlur('subject')}
                      />
                    </div>
                    
                    {/* Message Textarea */}
                    <div className={`${styles.formGroup} ${styles.textareaGroup} ${(focusedFields.message || formData.message) ? styles.focused : ''} ${errors.message ? styles.error : ''}`}>
                      <label className={styles.formLabel} htmlFor="message">
                        <i className={`fas fa-comment ${styles.inputIcon}`}></i>
                        <span>Message *</span>
                      </label>
                      <textarea
                        className={styles.formTextarea}
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => handleBlur('message')}
                      ></textarea>
                      {errors.message && (
                        <div className={styles.errorMessage}>
                          <i className="fas fa-exclamation-circle"></i>
                          {errors.message}
                        </div>
                      )}
                    </div>
                    
                    <motion.button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i> Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
          
          <motion.div 
            className={styles.mapContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291665!2d-73.9878449245259!3d40.74844097138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629997983978!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{border:0}}
              allowFullScreen="" 
              loading="lazy"
              title="Our Location on Google Maps"
            ></iframe>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}