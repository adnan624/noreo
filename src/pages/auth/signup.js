import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/signup.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { register, setRegistrationSuccess } from '@/store/slices/authSlice';
// import { register } from '../st  ore/slices/authSlice';

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm || !formData.phone) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.passwordConfirm) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    if (!acceptTerms) {
      setErrorMessage('Please accept the terms and conditions');
      return;
    }
    
    // Clear previous errors
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      // Use Redux register thunk
      const resultAction = await dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.passwordConfirm,
        phone: formData.phone
      })).unwrap();
      
      console.log('Registration successful', resultAction);
      
      // Set registration success flag in Redux instead of localStorage
      dispatch(setRegistrationSuccess(true));
      
      setIsLoading(false);
      
      // Redirect after successful registration
      // router.push('/auth/login?registered=true');
      console.log('Registration completed successfully');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(typeof error === 'string' ? error : 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };
  
  return (
    <>
      <Head>
        <title>Create Account | Your App</title>
        <meta name="description" content="Create a new account" />
      </Head>
      <Header/>
      <div className={styles.signupPage}>
        <div className={styles.signupContainer}>
          <div className={styles.signupFormContainer}>
            <div className={styles.signupHeader}>
              <Link href="/" className={styles.logoLink}>
                <h1 className={styles.logo}>Noreo</h1>
              </Link>
              <h2>Create Account</h2>
              <p>Join us to get started</p>
            </div>
            
            {errorMessage && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}
            
            <form 
            onSubmit={handleSubmit}
             className={styles.signupForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={styles.inputField}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={styles.inputField}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                minLength={10}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={styles.inputField}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={styles.inputField}
                  minLength="8"
                  required
                />
                <small className={styles.passwordHint}>
                  Password must be at least 8 characters
                </small>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={styles.inputField}
                  required
                />
              </div>
              
              <div className={styles.termsCheckbox}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  required
                />
                <label htmlFor="terms">
                  I accept the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
                </label>
              </div>
              
              <button 
                type="submit" 
                className={styles.signupButton}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className={styles.orDivider}>
              <span>OR</span>
            </div>
            
            <button className={styles.gmailButton}>
              <svg className={styles.gmailIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Sign Up with Gmail
            </button>
            
            <div className={styles.signupFooter}>
              <p>Already have an account?</p>
              <Link href="/auth/login" className={styles.loginLink}>
                Sign In
              </Link>
            </div>
          </div>
          
          <div className={styles.signupImageContainer}>
            <div className={styles.signupImage}></div>
            <div className={styles.imageOverlay}>
              <h2>Join Our Community</h2>
              <p>Get exclusive access to features and personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}