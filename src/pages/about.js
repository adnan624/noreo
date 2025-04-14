import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';

export default function About() {
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.observe-section');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const values = [
    { 
      title: "Quality", 
      icon: "star",
      description: "We carefully vet all our products to ensure they meet our high standards."
    },
    { 
      title: "Trust", 
      icon: "shield-alt",
      description: "Building long-term relationships based on honesty and transparency."
    },
    // { 
    //   title: "Innovation", 
    //   icon: "lightbulb",
    //   description: "Bringing you the latest in smart home technology and energy efficiency."
    // },
    { 
      title: "Customer Care", 
      icon: "heart",
      description: "Your satisfaction is our top priority at every step."
    }
  ];

  const teamMembers = [
    { 
      name: "Sarah Johnson", 
      role: "Founder & CEO", 
      bio: "With over 15 years in the appliance industry, Sarah leads our company with vision and passion.",
      img: "/images/team1.jpg"
    },
    { 
      name: "Michael Chen", 
      role: "Head of Operations", 
      bio: "Michael ensures our logistics and customer service run smoothly every day.",
      img: "/images/team2.jpg"
    },
    
  
  ];

  return (
    <>
      <Head>
        <title>About Us | ElectroShop</title>
        <meta name="description" content="Learn more about ElectroShop and our mission" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>
      
      <Header />
      
      <main className={styles.aboutPage}>
      <div className={styles.circuitBackground}></div>
        {/* Hero Section */}
        {/* <section className={`${styles.pageHeader} observe-section`} id="header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible['header'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1>About ElectroShop</h1>
            <p>Our story and what makes us different</p>
          </motion.div>
        </section> */}

        <div className="container">
          {/* Story Section */}
          <section className={`${styles.aboutSection} observe-section`} id="story">
            <motion.div 
              className={styles.aboutContent}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible['story'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2>Our Story</h2>
              <p>Founded in 2010, ElectroShop started as a small appliance store with a big vision - to make high-quality electrical appliances accessible to everyone. What began as a single storefront has now grown into a trusted online destination for thousands of customers across the country.</p>
              <p>Our journey has been guided by a commitment to quality, innovation, and customer satisfaction. We carefully select each product in our inventory, ensuring it meets our high standards for performance, energy efficiency, and durability.</p>
              <ul>
                <li>Over 1 million satisfied customers</li>
                <li>500+ premium products in our catalog</li>
                <li>24/7 customer support</li>
              </ul>
            </motion.div>
            <motion.div 
              className={styles.aboutImage}
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible['story'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="/images/about-story.jpg" alt="Our store in the early days" />
            </motion.div>
          </section>

          {/* Mission Section */}
          <section className={`${styles.aboutSection} ${styles.reverse} observe-section`} id="mission">
            <motion.div 
              className={styles.aboutContent}
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible['mission'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2>Our Mission</h2>
              <p>At ElectroShop, we believe that the right appliances can transform your home and simplify your life. Our mission is to help you find the perfect products that fit your needs, lifestyle, and budget.</p>
              <p>We're committed to:</p>
              <ul>
                <li>Providing high-quality, energy-efficient appliances</li>
                <li>Offering competitive prices and regular promotions</li>
                <li>Delivering exceptional customer service</li>
                <li>Making the shopping experience easy and enjoyable</li>
              </ul>
            </motion.div>
            <motion.div 
              className={styles.aboutImage}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible['mission'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="/images/about-mission.jpg" alt="Our team" />
            </motion.div>
          </section>

          {/* Values Section */}
          <section className={`${styles.valuesSection} observe-section`} id="values">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible['values'] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2>Our Values</h2>
              <div className={styles.valuesGrid}>
                {values.map((value, index) => (
                 <motion.div
                 key={value.title}
                 className={styles.feature}
                 initial={{ opacity: 0, y: 30 }}
                 animate={isVisible['values'] ? { opacity: 1, y: 0 } : {}}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 whileHover={{ y: -10 }}
               >
                 <div className={styles.featureIcon}>
                   <i className={`fas fa-${value.icon}`}></i>
                 </div>
                 <h3 className={styles.featureTitle}>{value.title}</h3>
  <p className={styles.featureDescription}>{value.description}</p>
                 <div className={styles.featureHoverEffect}></div>
               </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Team Section */}
          <section className={`${styles.teamSection} observe-section`} id="team">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible['team'] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2>Meet The Team</h2>
              <div className={styles.teamGrid}>
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className={styles.teamMember}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible['team'] ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className={styles.memberImage}>
                      <img src={member.img} alt={member.name} />
                      <div className={styles.socialIcons}>
                        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                      </div>
                    </div>
                    <div className={styles.memberInfo}>
                      <h3>{member.name}</h3>
                      <p className={styles.memberRole}>{member.role}</p>
                      <p className={styles.memberBio}>{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}