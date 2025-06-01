import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer = ({ marginTop = '0px' }) => {
  return (
    <footer className={styles.footer} style={{ marginTop }}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Noreo</h3>
            <p>Your one-stop shop for all electrical appliances at competitive prices.</p>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Customer Service</h3>
            <ul className={styles.footerLinks}>
            <li><Link href="/FAQ">FAQ</Link></li> 
              <li><Link href="/shipping">Shipping Policy</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Contact Us</h3>
            <address className={styles.footerAddress}>
              Shop no. 3, 120, near Siyaganj, Siyaganj, Indore, Madhya Pradesh 452001<br />
              Email: life.noreo@gmail.com<br />
              Phone: +91 70009 80324
            </address>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ElectroShop. All rights reserved.</p>
          <div className={styles.socialIcons}>
  <a href="#" aria-label="Facebook"><FaFacebook /></a>
  <a href="#" aria-label="Twitter"><FaTwitter /></a>
  <a href="#" aria-label="Instagram"><FaInstagram /></a>
  <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;