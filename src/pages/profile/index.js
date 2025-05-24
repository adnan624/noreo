import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from '../../styles/Profile.module.css';
import Footer from '@/components/Footer';
import ChangePasswordModal from '../../components/profile/changePasswordModal';
import { getUserProfile, logoutAsync, updateUserProfile } from '../../store/slices/authSlice/action';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

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

  // Sample recent orders data
  const [recentOrders] = useState([
    {
      id: 'ORD001',
      productImage: '/api/placeholder/100/100',
      productName: 'Premium Wireless Headphones',
      price: '₹2,999',
      status: 'Delivered',
      orderDate: '2025-05-20'
    },
    {
      id: 'ORD002',
      productImage: '/api/placeholder/100/100',
      productName: 'Smart Fitness Watch',
      price: '₹4,499',
      status: 'Shipped',
      orderDate: '2025-05-22'
    },
    {
      id: 'ORD003',
      productImage: '/api/placeholder/100/100',
      productName: 'Bluetooth Speaker',
      price: '₹1,799',
      status: 'Processing',
      orderDate: '2025-05-23'
    }
  ]);

  // All orders data (including more orders for the full view)
  const [allOrders] = useState([
    {
      id: 'ORD001',
      productImage: '/api/placeholder/100/100',
      productName: 'Premium Wireless Headphones',
      price: '₹2,999',
      status: 'Delivered',
      orderDate: '2025-05-20'
    },
    {
      id: 'ORD002',
      productImage: '/api/placeholder/100/100',
      productName: 'Smart Fitness Watch',
      price: '₹4,499',
      status: 'Shipped',
      orderDate: '2025-05-22'
    },
    {
      id: 'ORD003',
      productImage: '/api/placeholder/100/100',
      productName: 'Bluetooth Speaker',
      price: '₹1,799',
      status: 'Processing',
      orderDate: '2025-05-23'
    },
    {
      id: 'ORD004',
      productImage: '/api/placeholder/100/100',
      productName: 'Gaming Keyboard',
      price: '₹3,299',
      status: 'Delivered',
      orderDate: '2025-05-18'
    },
    {
      id: 'ORD005',
      productImage: '/api/placeholder/100/100',
      productName: 'Wireless Mouse',
      price: '₹899',
      status: 'Delivered',
      orderDate: '2025-05-15'
    },
    {
      id: 'ORD006',
      productImage: '/api/placeholder/100/100',
      productName: 'USB-C Hub',
      price: '₹1,299',
      status: 'Delivered',
      orderDate: '2025-05-12'
    },
    {
      id: 'ORD007',
      productImage: '/api/placeholder/100/100',
      productName: 'Phone Case',
      price: '₹599',
      status: 'Delivered',
      orderDate: '2025-05-10'
    },
    {
      id: 'ORD008',
      productImage: '/api/placeholder/100/100',
      productName: 'Power Bank',
      price: '₹1,999',
      status: 'Cancelled',
      orderDate: '2025-05-08'
    }
  ]);

  // State to toggle between profile view and all orders view
  const [showAllOrders, setShowAllOrders] = useState(false);

  const redirectUrl = router.query.redirect || '/';

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('username', editedUser.name);
      formData.append('phoneNumber', editedUser.phone);
      formData.append('address', editedUser.address);
      formData.append('city', editedUser.city);
      formData.append('state', editedUser.state);
      formData.append('pincode', editedUser.pincode);
      if (selectedImage) {
        formData.append('avatar', selectedImage);
      }

      const resultAction = await dispatch(updateUserProfile({ userId: editedUser._id, formData }));

      if (updateUserProfile.fulfilled.match(resultAction)) {
        dispatch(getUserProfile());
        setUserData(resultAction.payload);
        setIsEditing(false);
        setSelectedImage(null);
      } else {
        console.error('Failed to update profile:', resultAction.payload);
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

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#10b981';
      case 'shipped':
        return '#3b82f6';
      case 'processing':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const handleViewAllOrders = () => {
    setShowAllOrders(true);
    // Scroll to top when viewing all orders
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProfile = () => {
    setShowAllOrders(false);
  };

  const handlePersonalInfoClick = (e) => {
    e.preventDefault();
    setShowAllOrders(false);
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
    <div className={styles.profileWrapper}>

      <div className={styles.profileContainer}>
        <div className={styles.profileInner}>
          <div className={styles.profileHeader}>
            <h1 className={styles.profileTitle}>My Profile</h1>
            {!isEditing && !showAllOrders && (
              <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                ✨ Edit Profile
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
                  <div style={{marginTop: 20, width: '100%'}}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={styles.fileInput}
                      disabled={isUpdating}
                    />
                  </div>
                )}
              </div>

              <div className={styles.userNameCard}>
                <h2 className={styles.userName}>{userData.name}</h2>
                <p className={styles.userEmail}>{userData.email}</p>
              </div>

              <div className={styles.sidebarLinks}>
                <a 
                  href="#" 
                  onClick={handlePersonalInfoClick}
                  className={`${styles.sidebarLink} ${!showAllOrders ? styles.activeLink : ''}`}
                >
                  <span className={styles.linkIcon}>👤</span>
                  Personal Info
                </a>
                <button 
                  onClick={handleViewAllOrders}
                  className={`${styles.sidebarLink} ${showAllOrders ? styles.activeLink : ''}`}
                >
                  <span className={styles.linkIcon}>📦</span>
                  My Orders
                </button>
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
                type="button" 
                onClick={handleLogout} 
                disabled={isUpdating}
                className={styles.logoutButton}
              >
                🚪 Logout
              </button>
            </div>

            <div className={styles.profileDetails}>
              {showAllOrders ? (
                // All Orders View
                <div className={styles.allOrdersView}>
                  <div className={styles.allOrdersHeader}>
                    <button 
                      onClick={handleBackToProfile}
                      className={styles.backButton}
                    >
                      ← Back to Profile
                    </button>
                    <h2 className={styles.sectionTitle}>All Orders ({allOrders.length})</h2>
                  </div>

                  <div className={styles.ordersGrid}>
                    {allOrders.map((order) => (
                      <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderImageContainer}>
                          <Image
                            src={order.productImage}
                            alt={order.productName}
                            width={80}
                            height={80}
                            className={styles.orderImage}
                          />
                        </div>
                        <div className={styles.orderInfo}>
                          <div className={styles.orderProductName}>{order.productName}</div>
                          <div className={styles.orderPrice}>{order.price}</div>
                          <div 
                            className={styles.orderStatus}
                            style={{ color: getStatusColor(order.status) }}
                          >
                            {order.status}
                          </div>
                          <div className={styles.orderDate}>
                            Ordered on {new Date(order.orderDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : isEditing ? (
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
                        placeholder="Enter your full name"
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
                        placeholder="Enter your pincode"
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
                        placeholder="Enter your phone number"
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
                        placeholder="Enter your delivery address"
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
                        placeholder="Enter your city"
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
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.saveButton} disabled={isUpdating}>
                      {isUpdating ? '💫 Updating...' : '✅ Save Changes'}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      ❌ Cancel
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
                    <button 
                      onClick={() => setShowPasswordModal(true)}
                      className={styles.passwordChangeLink}
                    >
                      🔐 Change Password
                    </button>
                  </div>

                  <div className={styles.recentOrdersSection}>
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.sectionTitle}>Recent Orders</h2>
                      <button 
                        onClick={handleViewAllOrders}
                        className={styles.viewAllLink}
                      >
                        View All →
                      </button>
                    </div>

                    {recentOrders.length > 0 ? (
                      <div className={styles.ordersGrid}>
                        {recentOrders.map((order) => (
                          <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderImageContainer}>
                              <Image
                                src={order.productImage}
                                alt={order.productName}
                                width={80}
                                height={80}
                                className={styles.orderImage}
                              />
                            </div>
                            <div className={styles.orderInfo}>
                              <div className={styles.orderPrice}>{order.price}</div>
                              <div 
                                className={styles.orderStatus}
                                style={{ color: getStatusColor(order.status) }}
                              >
                                {order.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.emptyOrdersMessage}>
                        <span className={styles.emptyIcon}>🛍️</span>
                        <p>You haven't placed any orders yet.</p>
                        <a href="/products" className={styles.shopNowButton}>🛒 Shop Now</a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={showPasswordModal}
        onClose={handlePasswordModalClose}
      />

      <Footer />
    </>
  );
}