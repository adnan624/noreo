import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | ElectroShop</title>
        <meta name="description" content="Learn more about ElectroShop and our mission" />
      </Head>
      
      <Header />
      
      <main className={styles.aboutPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1>About ElectroShop</h1>
            <p>Our story and what makes us different</p>
          </div>
          
          <section className={styles.aboutSection}>
            <div className={styles.aboutContent}>
              <h2>Our Story</h2>
              <p>Founded in 2010, ElectroShop started as a small appliance store with a big vision - to make high-quality electrical appliances accessible to everyone. What began as a single storefront has now grown into a trusted online destination for thousands of customers across the country.</p>
              <p>Our journey has been guided by a commitment to quality, innovation, and customer satisfaction. We carefully select each product in our inventory, ensuring it meets our high standards for performance, energy efficiency, and durability.</p>
            </div>
            <div className={styles.aboutImage}>
              <img src="/images/about-story.jpg" alt="Our store in the early days" />
            </div>
          </section>
          
          <section className={`${styles.aboutSection} ${styles.reverse}`}>
            <div className={styles.aboutContent}>
              <h2>Our Mission</h2>
              <p>At ElectroShop, we believe that the right appliances can transform your home and simplify your life. Our mission is to help you find the perfect products that fit your needs, lifestyle, and budget.</p>
              <p>We're committed to:</p>
              <ul>
                <li>Providing high-quality, energy-efficient appliances</li>
                <li>Offering competitive prices and regular promotions</li>
                <li>Delivering exceptional customer service</li>
                <li>Making the shopping experience easy and enjoyable</li>
              </ul>
            </div>
            <div className={styles.aboutImage}>
              <img src="/images/about-mission.jpg" alt="Our team" />
            </div>
          </section>
          
          <section className={styles.valuesSection}>
            <h2>Our Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className="fas fa-star"></i>
                </div>
                <h3>Quality</h3>
                <p>We carefully vet all our products to ensure they meet our high standards for performance and durability.</p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Trust</h3>
                <p>We build long-term relationships with our customers based on honesty and transparency.</p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Innovation</h3>
                <p>We stay ahead of the curve to bring you the latest in smart home technology and energy efficiency.</p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Customer Care</h3>
                <p>Your satisfaction is our top priority, from pre-purchase advice to after-sales support.</p>
              </div>
            </div>
          </section>
          
          <section className={styles.teamSection}>
            <h2>Meet The Team</h2>
            <div className={styles.teamGrid}>
              <div className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <img src="/images/team1.jpg" alt="Sarah Johnson" />
                </div>
                <h3>Sarah Johnson</h3>
                <p className={styles.memberRole}>Founder & CEO</p>
                <p className={styles.memberBio}>With over 15 years in the appliance industry, Sarah leads our company with vision and passion.</p>
              </div>
              
              <div className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <img src="/images/team2.jpg" alt="Michael Chen" />
                </div>
                <h3>Michael Chen</h3>
                <p className={styles.memberRole}>Head of Operations</p>
                <p className={styles.memberBio}>Michael ensures our logistics and customer service run smoothly every day.</p>
              </div>
              
              <div className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <img src="/images/team3.jpg" alt="Emily Rodriguez" />
                </div>
                <h3>Emily Rodriguez</h3>
                <p className={styles.memberRole}>Product Specialist</p>
                <p className={styles.memberBio}>Emily's expertise helps customers find the perfect appliances for their needs.</p>
              </div>
              
              <div className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <img src="/images/team4.jpg" alt="David Kim" />
                </div>
                <h3>David Kim</h3>
                <p className={styles.memberRole}>Marketing Director</p>
                <p className={styles.memberBio}>David connects our brand with customers through creative campaigns and outreach.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}