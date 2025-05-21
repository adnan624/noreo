import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { unwrapResult } from '@reduxjs/toolkit';

// import { login } from '../store/slices/authSlice';
import styles from '../../styles/login.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import Firebase auth
import { auth } from '../../firebase/config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { login, setRememberEmail, clearRememberEmail, setRegistrationSuccess  } from '@/store/slices/authSlice';

export default function Login() {
  const { registrationSuccess } = useSelector(state => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState(''); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  // Get the redirect URL from query params or default to homepage
  const redirectUrl = router.query.redirect || '/';

  useEffect(() => {
    if (registrationSuccess) {
      setShowRegistrationMessage(true);
      // Clear the flag after showing the message
      dispatch(setRegistrationSuccess(false));
    }
  }, [registrationSuccess, dispatch]);
  
  // Check if user just registered
  useEffect(() => {
    if (router.query.registered === 'true') {
      setShowRegistrationMessage(true);
    }
  }, [router.query]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle login method selection
  const selectLoginMethod = (method) => {
    setLoginMethod(method);
    setErrorMessage('');
  };
  
  // Handle Gmail sign-in
  const handleGmailSignIn = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Create a Google provider instance
      const provider = new GoogleAuthProvider();
      
      // Sign in with popup
      const result = await signInWithPopup(auth, provider);
      
      // The signed-in user info
      const user = result.user;
    
    // Also log the raw user object (with non-enumerable properties)
    console.log('Raw User Object:', user);
      
      // Get the authentication token
      const token = await user.getIdToken();
      
      // Log user info and token
      console.log('Gmail sign-in success:', user.email);
      console.log('Authentication token:', token);
      
      // Here you would typically save the user to your Redux store or context
      // await dispatch(login({ user, token }));
      
      // Redirect after successful login
      router.push(redirectUrl);
    } catch (error) {
      // Handle errors
      console.error('Gmail sign-in error:', error.message);
      setErrorMessage('Failed to sign in with Gmail. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle sending OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!formData.phone || formData.phone.length < 10) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // API call to send OTP would go here
      // For demo purposes, we'll just simulate it
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setErrorMessage('Failed to send OTP. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Handle form submission for email login
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    // Clear previous errors and registration message
    setErrorMessage('');
    setShowRegistrationMessage(false);
    setIsLoading(true);
    
    try {
      // Dispatch login thunk action
      const resultAction = await dispatch(login({
        email: formData.email,
        password: formData.password
      })).unwrap();
      
      console.log('Login successful', resultAction);
      
      // Track remember me preference in Redux instead of localStorage
      // You could dispatch another action here if needed
      if (rememberMe) {
        dispatch(setRememberEmail(formData.email));
      } else {
        dispatch(clearRememberEmail());
      }
      
      setIsLoading(false);
      
      // Get redirect URL from query parameters or use default
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      const finalRedirectUrl = redirectParam || redirectUrl || '/dashboard';
      
      // Redirect after successful login
      router.push(finalRedirectUrl);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(typeof error === 'string' ? error : 'Invalid email or password');
      console.error('Login error:', error);
    }
  };
  
  // Handle form submission for phone login
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.phone || !formData.otp) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    // Clear previous errors and registration message
    setErrorMessage('');
    setShowRegistrationMessage(false);
    setIsLoading(true);
    
    try {
      // Dispatch login action
      // For demo purposes we're just simulating
      
      // Simulate API call
      setTimeout(() => {
        // Redirect after successful login
        router.push(redirectUrl);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error || 'Invalid OTP');
    }
  };
  
  return (
    <>
      <Head>
        <title>Login | ElectroShop</title>
        <meta name="description" content="Login to your account" />
      </Head>
      <Header/>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <div className={styles.loginFormContainer}>
            
            {showRegistrationMessage && (
              <div className={styles.successMessage}>
                <div className={styles.checkmarkIcon}>✓</div>
                <p>Account created successfully!</p>
                <p>Please sign in with your new credentials.</p>
              </div>
            )}
            
            {errorMessage && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}
            
            {!loginMethod ? (
              <div className={styles.loginMethodSelection}>
                <h2>Choose Login Method</h2>
                <div className={styles.loginMethodButtons}>
                  <button 
                    className={styles.methodButton}
                    onClick={() => selectLoginMethod('email')}
                  >
                    Login with Email
                  </button>
                  <button 
                    className={styles.methodButton}
                    onClick={() => selectLoginMethod('phone')}
                  >
                    Login with Phone
                  </button>
                  
                  <div className={styles.orDivider}>
                    <span>OR</span>
                  </div>
                  
                  <button 
                    className={styles.gmailButton}
                    onClick={handleGmailSignIn}
                    disabled={isLoading}
                  >
                    <svg className={styles.gmailIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Continue with Gmail
                  </button>
                </div>
              </div>
            ) : loginMethod === 'email' ? (
              <form onSubmit={handleEmailSubmit} className={styles.loginForm}>
                <h2>Login with Email</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    style={{
                        margin: 0,
                        padding: '12px 16px',
                        width: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.2s ease'
                      }}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    // type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    style={{
                        margin: 0,
                        padding: '12px 16px',
                        width: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.2s ease'
                      }}
                  />
                </div>
                
                <div className={styles.formOptions}>
                  <div className={styles.rememberMe}>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  
                  <Link href="/forgot-password" className={styles.forgotPassword}>
                    Forgot password?
                  </Link>
                </div>
                
                <button 
                // onClick={handleSign}
                  type="submit" 
                  className={styles.loginButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
                <button 
                  type="button" 
                  className={styles.backButton}
                  onClick={() => setLoginMethod('')}
                >
                  Back
                </button>
              </form>
            ) : (
              <form onSubmit={otpSent ? handlePhoneSubmit : handleSendOTP} className={styles.loginForm}>
                <h2>Login with Phone</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    disabled={otpSent}
                    style={{
                      margin: 0,
                      padding: '12px 16px',
                      width: '100%',
                      boxSizing: 'border-box',
                      border: '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s ease',
                      backgroundColor: otpSent ? '#f5f5f5' : 'white'
                    }}
                  />
                </div>
                
                {otpSent && (
                  <div className={styles.formGroup}>
                    <label htmlFor="otp">OTP</label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP sent to your phone"
                      required
                      style={{
                        margin: 0,
                        padding: '12px 16px',
                        width: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.2s ease',
                        letterSpacing: '2px'
                      }}
                    />
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className={styles.loginButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
                </button>
                
                {otpSent && (
                  <button 
                    type="button" 
                    className={styles.resendButton}
                    onClick={handleSendOTP}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                )}
                
                <button 
                  type="button" 
                  className={styles.backButton}
                  onClick={() => {
                    setLoginMethod('');
                    setOtpSent(false);
                  }}
                >
                  Back
                </button>
              </form>
            )}
            
            <div className={styles.loginFooter}>
              <p>Don't have an account?</p>
              <Link href="/auth/signup" className={styles.registerLink}>
                Create Account
              </Link>
            </div>
            
            <div className={styles.securityNote}>
              <p>
                <i className="fas fa-lock"></i> 
                Your connection is secure
              </p>
            </div>
          </div>
          
          <div className={styles.loginImageContainer}>
            <div className={styles.loginImage}></div>
            <div className={styles.imageOverlay}>
              <h2>Shop the Future Today</h2>
              <p>Get the latest in electronic innovations delivered to your doorstep</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}