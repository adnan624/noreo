import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/Profile.module.css';
import Footer from '@/components/Footer';
import ChangePasswordModal from '../../components/profile/changePasswordModal';
import AddressManagement from '../../components/profile/addressManagment';
import { getUserProfile, logoutAsync, updateUserProfile } from '../../store/slices/authSlice/action';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  // Ref for edit form
  const editFormRef = useRef(null);

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
    },
    {
      id: 'ORD004',
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

  // Wishlist data
  const [wishlistItems] = useState([
    {
      id: 'WISH001',
      productImage: '/api/placeholder/300/300',
      title: 'Premium Wireless Headphones',
      currentPrice: '₹2,999',
      originalPrice: '₹3,999',
      discount: '25% off',
      inStock: true
    },
    {
      id: 'WISH002',
      productImage: '/api/placeholder/300/300',
      title: 'Smart Fitness Watch',
      currentPrice: '₹4,499',
      originalPrice: '₹5,999',
      discount: '25% off',
      inStock: true
    },
    {
      id: 'WISH003',
      productImage: '/api/placeholder/300/300',
      title: 'Bluetooth Speaker - Waterproof',
      currentPrice: '₹1,799',
      originalPrice: '₹2,499',
      discount: '28% off',
      inStock: true
    },
    {
      id: 'WISH004',
      productImage: '/api/placeholder/300/300',
      title: 'Ergonomic Wireless Keyboard and Mouse Combo',
      currentPrice: '₹3,299',
      originalPrice: '₹3,999',
      discount: '18% off',
      inStock: false
    }
  ]);

  // State to manage active view
  const [activeView, setActiveView] = useState('personalInfo'); // 'personalInfo', 'orders', 'wishlist', 'addresses'
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const redirectUrl = router.query.redirect || '/';

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

  // Effect to handle scrolling when edit mode is enabled
  useEffect(() => {
    if (isEditing && window.innerWidth <= 768 && editFormRef.current) {
      // Small delay to ensure the form is rendered
      const timer = setTimeout(() => {
        try {
          // Method 1: Scroll to the edit form
          editFormRef.current.scrollIntoView({ 
            behavior: 'auto', 
            block: 'start' 
          });
          
          // Method 2: Get the form's position and scroll manually
          const rect = editFormRef.current.getBoundingClientRect();
          const scrollTop = window.pageYOffset + rect.top - 20; // 20px offset from top
          
          window.scrollTo({
            top: scrollTop,
            behavior: 'auto'
          });
          
        } catch (error) {
          // Fallback: just scroll to top
          window.scrollTo(0, 0);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  const handleEditProfile = () => {
    setIsEditing(true);
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
    setActiveView('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProfile = () => {
    setActiveView('personalInfo');
  };

  const handlePersonalInfoClick = (e) => {
    e.preventDefault();
    setActiveView('personalInfo');
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    setActiveView('wishlist');
  };

  const handleAddressClick = (e) => {
    e.preventDefault();
    setActiveView('addresses');
  };

  const handleRemoveFromWishlist = (itemId) => {
    // In a real app, you would call an API to remove the item from wishlist
    console.log('Removing item from wishlist:', itemId);
  };

  const handleAddToCart = (itemId) => {
    // In a real app, you would call an API to add the item to cart
    console.log('Adding item to cart:', itemId);
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
              {!isEditing && activeView === 'personalInfo' && (
                <button className={styles.editButton} onClick={handleEditProfile}>
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
                    className={`${styles.sidebarLink} ${activeView === 'personalInfo' ? styles.activeLink : ''}`}
                  >
                    <span className={styles.linkIcon}>👤</span>
                    Personal Info
                  </a>
                  <button 
                    onClick={() => setActiveView('orders')}
                    className={`${styles.sidebarLink} ${activeView === 'orders' ? styles.activeLink : ''}`}
                  >
                    <span className={styles.linkIcon}>📦</span>
                    My Orders
                  </button>
                  <button 
                    onClick={handleWishlistClick}
                    className={`${styles.sidebarLink} ${activeView === 'wishlist' ? styles.activeLink : ''}`}
                  >
                    <span className={styles.linkIcon}>❤️</span>
                    Wishlist
                  </button>
                  <button 
                    onClick={handleAddressClick}
                    className={`${styles.sidebarLink} ${activeView === 'addresses' ? styles.activeLink : ''}`}
                  >
                    <span className={styles.linkIcon}>📍</span>
                    Addresses
                  </button>
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
                {activeView === 'orders' ? (
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
                ) : activeView === 'wishlist' ? (
                  // Wishlist View
                  <div className={styles.wishlistView}>
                    <div className={styles.allOrdersHeader}>
                      <button 
                        onClick={handleBackToProfile}
                        className={styles.backButton}
                      >
                        ← Back to Profile
                      </button>
                      <h2 className={styles.sectionTitle}>My Wishlist ({wishlistItems.length})</h2>
                    </div>

                    {wishlistItems.length > 0 ? (
                      <div className={styles.wishlistGrid}>
                        {wishlistItems.map((item) => (
                          <div key={item.id} className={styles.wishlistItem}>
                            <div className={styles.wishlistImageContainer}>
                              <Image
                                src={item.productImage}
                                alt={item.title}
                                width={240}
                                height={180}
                                className={styles.wishlistImage}
                              />
                            </div>
                            <div className={styles.wishlistItemInfo}>
                              <h3 className={styles.wishlistItemTitle}>{item.title}</h3>
                              <div className={styles.wishlistItemPrice}>
                                {item.currentPrice}
                                {item.originalPrice && (
                                  <>
                                    {/* <span className={styles.wishlistItemOriginalPrice}>{item.originalPrice}</span> */}
                                    {/* <span className={styles.wishlistItemDiscount}>{item.discount}</span> */}
                                  </>
                                )}
                              </div>
                              <div className={styles.wishlistItemActions}>
                                <button 
                                  className={styles.wishlistAddToCart}
                                  onClick={() => handleAddToCart(item.id)}
                                >
                                  🛒 Add to Cart
                                </button>
                                <button 
                                  className={styles.wishlistRemoveButton}
                                  onClick={() => handleRemoveFromWishlist(item.id)}
                                >
                                  ❌
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.wishlistEmptyMessage}>
                        <span className={styles.wishlistEmptyIcon}>❤️</span>
                        <p>Your wishlist is empty</p>
                        <p>Start adding items you love!</p>
                        <a href="/products" className={styles.shopNowButton}>🛍️ Browse Products</a>
                      </div>
                    )}
                  </div>
                ) : activeView === 'addresses' ? (
                  // Address Management View
                  <div className={styles.allOrdersView}>
                    <div className={styles.allOrdersHeader}>
                      <button 
                        onClick={handleBackToProfile}
                        className={styles.backButton}
                      >
                        ← Back to Profile
                      </button>
                      <h2 className={styles.sectionTitle}>My Addresses</h2>
                    </div>
                    <AddressManagement />
                  </div>
                ) : isEditing ? (
                  <form ref={editFormRef} onSubmit={handleSubmit} className={styles.editForm}>
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