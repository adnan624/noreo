import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from '../../styles/Profile.module.css';
import Footer from '@/components/Footer';
import { getUserProfile, logoutAsync, updateUserProfile } from '../../store/slices/authSlice/action';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import authService from '../../service/api/authService';
import { setUser } from '@/store/slices/authSlice/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: 'rahul.sharma@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Vijay Nagar',
    city: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '452010',
    avatar: '/default-avatar.png',
  });
  const redirectUrl = router.query.redirect || '/';

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData({
        _id: user._id,
        name: user?.username,
        email: user?.email,
        phone: user?.phoneNumber,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        pincode: user?.pincode,
        avatar: user?.photoUrl || '/default-avatar.png',
      });
      setEditedUser({
        _id: user._id,
        name: user?.username,
        email: user?.email,
        phone: user?.phoneNumber,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        pincode: user?.pincode,
        avatar: user?.photoUrl || '/default-avatar.png',
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserProfile())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(logoutAsync());
      router.push(redirectUrl);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setSelectedImage(file);
      setEditedUser(prev => ({
        ...prev,
        avatar: URL.createObjectURL(file)
      }));
    }

    console.log(editedUser , 76890)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const resultAction = await dispatch(updateUserProfile(editedUser)).unwrap();

      if (resultAction.success) {
        dispatch(getUserProfile())
        setUserData(resultAction);
        setIsEditing(false);
      }

    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditedUser({ ...userData });
    setIsEditing(false);
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <>
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
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>My Profile</h1>
          {!isEditing && (
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        <div className={styles.profileContent}>
          <div className={styles.profileSidebar}>
            <div className={styles.avatarContainer}>
              <Image
                src={editedUser.avatar || userData.avatar}
                alt={userData.name}
                width={150}
                height={150}
                className={styles.avatar}
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                    disabled={isUpdating}
                  />
                  <button className={styles.changePhotoButton} disabled={isUpdating}>
                    Change Photo
                  </button>
                </>
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
            <button type="button" onClick={handleLogout} disabled={isUpdating}>
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
                      disabled={isUpdating}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.inputLabel}>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={editedUser.pincode}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                      disabled={isUpdating}
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
                      disabled={isUpdating}
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
                      disabled={isUpdating}
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
                      disabled={isUpdating}
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
                      disabled={isUpdating}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveButton} disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCancel}
                    disabled={isUpdating}
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
