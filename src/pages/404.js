import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/404.module.css';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | ElectroShop</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>
      
      <Header />
      
      <main className={styles.notFound}>
        <div className="container">
          <div className={styles.content}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}