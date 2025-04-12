import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(`.${styles.header}`);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add(styles.scrolled);
      } else {
        header.classList.remove(styles.scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Prevent body scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink} onClick={closeMenu}>
            <span className={styles.logoMain}>Noreo</span>
          </Link>
        </div>
        
        <button 
          className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/products" onClick={closeMenu}>Products</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            <li>
              <Link href="/cart" className={styles.cartLink} onClick={closeMenu}>
                Cart <span className={styles.cartCount}>0</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {isMenuOpen && (
          <div 
            className={styles.menuOverlay} 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
};

export default Header;