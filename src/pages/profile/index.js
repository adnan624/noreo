import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from '../../styles/Profile.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { logoutAsync } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// Import your auth context if available
// import { useAuth } from '../../context/AuthContext'; // Adjust the path based on your structure

export default function Profile() {
  // Use your authentication context if available
  // const { user, logout } = useAuth();

  const dispatch = useDispatch()
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Vijay Nagar',
    city: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '452010',
    avatar: '/api/placeholder/150/150',
  });
  const redirectUrl = router.query.redirect || '/';

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({...userData});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // You could fetch user data from your API here
    // Example:
    // const fetchUserData = async () => {
    //   try {
    //     const response = await fetch('/api/user/profile');
    //     const data = await response.json();
    //     setUserData(data);
    //     setEditedUser(data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //     setIsLoading(false);
    //   }
    // };
    // fetchUserData();

    // For demonstration, using a timer instead
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      // Dispatch the async logout action
       dispatch(logoutAsync());
      // Redirect to login page after successful logout
      router.push(redirectUrl);
    } catch (error) {
      console.error('Logout failed:', error);
      // You could add some error handling UI here
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the edited user data
    setUserData({...editedUser});
    setIsEditing(false);

    // You would typically call an API here to update the user data
    // Example:
    // const updateUserData = async () => {
    //   try {
    //     const response = await fetch('/api/user/profile', {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(editedUser),
    //     });
    //     const data = await response.json();
    //     // Handle the response
    //   } catch (error) {
    //     console.error('Error updating user data:', error);
    //   }
    // };
    // updateUserData();
  };

  const handleCancel = () => {
    setEditedUser({...userData});
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading your profile...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>My Profile</h1>
          {!isEditing && (
            <button 
              className={styles.editButton} 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className={styles.profileContent}>
          <div className={styles.profileSidebar}>
            <div className={styles.avatarContainer}>
              <Image 
                src={userData.avatar} 
                alt={userData.name} 
                width={150} 
                height={150} 
                className={styles.avatar}
              />
              {isEditing && (
                <button className={styles.changePhotoButton}>
                  Change Photo
                </button>
              )}
            </div>
            
            <div className={styles.userNameCard}>
              <h2 className={styles.userName}>{userData.name}</h2>
              <p className={styles.userEmail}>{userData.email}</p>
            </div>

            <div className={styles.sidebarLinks}>
              <a href="#" className={`${styles.sidebarLink} ${styles.activeLink}`}>
                <span className={styles.linkIcon}>👤</span>
                Personal Info
              </a>
              <a href="/orders" className={styles.sidebarLink}>
                <span className={styles.linkIcon}>📦</span>
                My Orders
              </a>
              <a href="/wishlist" className={styles.sidebarLink}>
                <span className={styles.linkIcon}>❤️</span>
                Wishlist
              </a>
              <a href="/address" className={styles.sidebarLink}>
                <span className={styles.linkIcon}>📍</span>
                Addresses
              </a>
              <a href="/payments" className={styles.sidebarLink}>
                <span className={styles.linkIcon}>💳</span>
                Payment Methods
              </a>
            </div>
            <button 
                type="Logout" 
             
              onClick={handleLogout}
              >
               Logout
              </button>
          </div>

          <div className={styles.profileDetails}>
            {isEditing ? (
              <form onSubmit={handleSubmit} className={styles.editForm}>
                <h2 className={styles.sectionTitle}>Edit Personal Information</h2>
                
                <div className={styles.formGroup}>
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editedUser.address}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={editedUser.city}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>State</label>
                    <input
                      type="text"
                      name="state"
                      value={editedUser.state}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={editedUser.pincode}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  
                  <div className={styles.formField}>
                    {/* Empty field for layout balance */}
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveButton}>
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.userInfoDisplay}>
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                
                <div className={styles.infoGroup}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Full Name</span>
                    <span className={styles.infoValue}>{userData.name}</span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Email Address</span>
                    <span className={styles.infoValue}>{userData.email}</span>
                  </div>
                </div>
                
                <div className={styles.infoGroup}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Phone Number</span>
                    <span className={styles.infoValue}>{userData.phone}</span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Delivery Address</span>
                    <span className={styles.infoValue}>{userData.address}</span>
                  </div>
                </div>
                
                <div className={styles.infoGroup}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>City</span>
                    <span className={styles.infoValue}>{userData.city}</span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>State</span>
                    <span className={styles.infoValue}>{userData.state}</span>
                  </div>
                </div>
                
                <div className={styles.infoGroup}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Pincode</span>
                    <span className={styles.infoValue}>{userData.pincode}</span>
                  </div>
                </div>

                <div className={styles.securitySection}>
                  <h2 className={styles.sectionTitle}>Security</h2>
                  <a href="/password-change" className={styles.passwordChangeLink}>
                    Change Password
                  </a>
                </div>

                <div className={styles.recentOrdersSection}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Recent Orders</h2>
                    <a href="/orders" className={styles.viewAllLink}>View All</a>
                  </div>
                  
                  <div className={styles.emptyOrdersMessage}>
                    <span className={styles.emptyIcon}>🛍️</span>
                    <p>You haven't placed any orders yet.</p>
                    <a href="/products" className={styles.shopNowButton}>Shop Now</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}