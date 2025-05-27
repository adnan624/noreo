import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaSearch, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';
import styles from '../../styles/FAQ.module.css';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      id: 1,
      question: "What is Noreo?",
      answer: "Noreo is a platform dedicated to curating and trading everyday products that simplify your life. From home essentials to innovative lifestyle tools, we bring together practical and reliable items designed to make your daily routines easier and more efficient."
    },
    {
      id: 2,
      question: "What kind of products do you offer?",
      answer: "We offer a diverse range of smart, user-friendly products across categories like home improvement, kitchen tools, personal care, workspace solutions, and more—each selected for its usefulness and quality."
    },
    {
      id: 3,
      question: "Are the products sold by Noreo original and high quality?",
      answer: "Absolutely. At Noreo, we prioritize quality and utility. Every product we trade or recommend goes through a careful selection process to ensure it meets our standards of reliability and practicality."
    },
    {
      id: 4,
      question: "How do I place an order?",
      answer: "You can browse our products, add them to your cart, and proceed to checkout with your preferred payment method. It's simple, secure, and fast."
    },
    {
      id: 5,
      question: "Do you offer COD (Cash on Delivery)?",
      answer: "Yes, we offer Cash on Delivery on select products and locations. You'll see the option at checkout if it's available for your area."
    },
    {
      id: 6,
      question: "What are the delivery charges and timelines?",
      answer: "Delivery charges, if any, will be mentioned at checkout. We usually dispatch within 1-2 business days, and delivery takes 3-7 business days depending on your location."
    },
    {
      id: 7,
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking link via email or SMS. You can use this to follow your package in real time."
    },
    {
      id: 8,
      question: "Do you offer bulk purchasing or B2B deals?",
      answer: "Yes, if you're a retailer or business interested in bulk orders or partnerships, please reach out to us at [your email/contact form]. We'll be happy to assist."
    },
    {
      id: 9,
      question: "How can I contact Noreo's support team?",
      answer: "You can reach us via our contact form, email us at support@noreo.com, or use the live chat option on our website for quick assistance."
    },
    {
      id: 10,
      question: "Are Noreo's products eco-friendly or sustainable?",
      answer: "We are committed to promoting responsible consumption. Many of our products are reusable, energy-efficient, or made from sustainable materials. Each product page includes details to help you make informed choices."
    },
    {
      id: 11,
      question: "Can I suggest a product or idea to Noreo?",
      answer: "Yes, we love hearing from our customers! If you have a product you think fits our mission of making life simpler, drop us a message—we're always exploring new ideas."
    }
  ];

  // Filter FAQs based on search term
  const filteredFAQs = faqData.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle accordion item
  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Open all items
  const openAll = () => {
    const allOpen = {};
    filteredFAQs.forEach(faq => {
      allOpen[faq.id] = true;
    });
    setOpenItems(allOpen);
  };

  // Close all items
  const closeAll = () => {
    setOpenItems({});
  };

  return (
    <>
   

      {/* <Header /> */}

      <main className={styles.faqPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <FaQuestionCircle className={styles.heroIcon} />
              <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
              <p className={styles.heroSubtitle}>
                Find quick answers to common questions about Noreo, our products, and services
              </p>
            </div>
          </div>
        </section>

        {/* Search and Controls */}
        <section className={styles.searchSection}>
          <div className={styles.container}>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className={styles.clearSearch}
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div className={styles.controls}>
                <button onClick={openAll} className={styles.controlBtn}>
                  Expand All
                </button>
                <button onClick={closeAll} className={styles.controlBtn}>
                  Collapse All
                </button>
              </div>
            </div>

            {searchTerm && (
              <div className={styles.searchResults}>
                <p>{filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found for "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Content */}
        <section className={styles.faqContent}>
          <div className={styles.container}>
            {filteredFAQs.length > 0 ? (
              <div className={styles.faqList}>
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className={styles.faqItem}>
                    <button
                      className={`${styles.faqQuestion} ${openItems[faq.id] ? styles.active : ''}`}
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={openItems[faq.id]}
                    >
                      <span className={styles.questionText}>{faq.question}</span>
                      <span className={styles.toggleIcon}>
                        {openItems[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </button>
                    
                    <div className={`${styles.faqAnswer} ${openItems[faq.id] ? styles.open : ''}`}>
                      <div className={styles.answerContent}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <FaSearch className={styles.noResultsIcon} />
                <h3>No results found</h3>
                <p>We couldn't find any FAQs matching "{searchTerm}". Try different keywords or browse all questions.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className={styles.clearSearchBtn}
                >
                  Show All FAQs
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactContent}>
              <h2>Still have questions?</h2>
              <p>Can't find the answer you're looking for? Our support team is here to help!</p>
              
              <div className={styles.contactOptions}>
                <a href="mailto:support@noreo.com" className={styles.contactOption}>
                  <FaEnvelope className={styles.contactIcon} />
                  <div>
                    <h4>Email Us</h4>
                    <p>support@noreo.com</p>
                  </div>
                </a>
                
                <button className={styles.contactOption}>
                  <FaComments className={styles.contactIcon} />
                  <div>
                    <h4>Live Chat</h4>
                    <p>Chat with our team</p>
                  </div>
                </button>
                
                <a href="tel:+1234567890" className={styles.contactOption}>
                  <FaPhone className={styles.contactIcon} />
                  <div>
                    <h4>Call Us</h4>
                    <p>+1 (234) 567-890</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;