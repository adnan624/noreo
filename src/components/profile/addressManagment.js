import React, { useState } from 'react';
import styles from '../../styles/AddressManagement.module.css';

const AddressManagement = () => {
  // Sample existing addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Vijay Nagar',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Park, Scheme 78',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452015',
      isDefault: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showEditModal) {
      setEditingAddress(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewAddress(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentData = showEditModal ? editingAddress : newAddress;
    
    if (!currentData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!currentData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!currentData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!currentData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(currentData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (showEditModal) {
        // Update existing address
        setAddresses(prev => 
          prev.map(addr => 
            addr.id === editingAddress.id 
              ? { 
                ...editingAddress,
                // Ensure we preserve the original isDefault status
                isDefault: addr.isDefault 
              }
              : addr
          )
        );
        setShowEditModal(false);
        setEditingAddress(null);
      } else {
        // Add new address
        const addressToAdd = {
          id: addresses.length + 1,
          ...newAddress,
          isDefault: addresses.length === 0 // Only set as default if it's the first address
        };
        
        setAddresses(prev => [...prev, addressToAdd]);
        setShowAddModal(false);
      }
      
      // Reset form
      setNewAddress({
        type: 'Home',
        address: '',
        city: '',
        state: '',
        pincode: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to save address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setNewAddress({
      type: 'Home',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    setErrors({});
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingAddress(null);
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId // Only the selected address will be default
      }))
    );
  };

  const handleDelete = (addressId) => {
    if (addresses.length === 1) {
      alert('You must have at least one address');
      return;
    }
    
    const addressToDelete = addresses.find(addr => addr.id === addressId);
    const newAddresses = addresses.filter(addr => addr.id !== addressId);
    
    // If deleted address was default, make first remaining address default
    if (addressToDelete.isDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true;
    }
    
    setAddresses(newAddresses);
  };

  const handleEdit = (address) => {
    setEditingAddress({ ...address });
    setShowEditModal(true);
    setErrors({});
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'Home':
        return '🏠';
      case 'Office':
        return '🏢';
      default:
        return '📍';
    }
  };

  return (
    <div className={styles.addressWrapper}>
      <div className={styles.addressContainer}>
        <div className={styles.addressInner}>
          {/* Header */}
          <div className={styles.addressHeader}>
            <h1 className={styles.addressTitle}>My Addresses</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className={styles.addButton}
            >
              <span>+</span>
              Add New Address
            </button>
          </div>

          {/* Address Cards */}
          {addresses.length > 0 ? (
            <div className={styles.addressGrid}>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`${styles.addressCard} ${
                    address.isDefault ? styles.addressCardDefault : ''
                  }`}
                >
                  {/* Default Badge */}
                  {address.isDefault && (
                    <div className={styles.defaultBadge}>
                      Default
                    </div>
                  )}

                  {/* Address Type */}
                  <div className={styles.addressType}>
                    <span className={styles.addressTypeIcon}>
                      {getAddressTypeIcon(address.type)}
                    </span>
                    <h3 className={styles.addressTypeName}>{address.type}</h3>
                  </div>

                  {/* Address Details */}
                  <div className={styles.addressDetails}>
                    <p className={styles.addressText}>{address.address}</p>
                    <p className={styles.addressLocation}>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className={styles.addressActions}>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className={styles.setDefaultButton}
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(address)}
                      className={styles.editButton}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className={styles.deleteButton}
                      disabled={addresses.length === 1}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📍</div>
              <h3 className={styles.emptyTitle}>No addresses found</h3>
              <p className={styles.emptyDescription}>Add your first address to get started</p>
              <button
                onClick={() => setShowAddModal(true)}
                className={styles.emptyAddButton}
              >
                Add Your First Address
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Address Modal */}
      {(showAddModal || showEditModal) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {showEditModal ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button
                  onClick={handleCancel}
                  className={styles.closeButton}
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <div className={styles.form}>
                {/* Address Type */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Address Type
                  </label>
                  <select
                    name="type"
                    value={showEditModal ? editingAddress?.type || 'Home' : newAddress.type}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="Home">🏠 Home</option>
                    <option value="Office">🏢 Office</option>
                    <option value="Other">📍 Other</option>
                  </select>
                </div>

                {/* Address */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    value={showEditModal ? editingAddress?.address || '' : newAddress.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address..."
                    rows="3"
                    className={`${styles.textarea} ${
                      errors.address ? styles.inputError : ''
                    }`}
                  />
                  {errors.address && (
                    <p className={styles.errorMessage}>{errors.address}</p>
                  )}
                </div>

                {/* City and State */}
                <div className={styles.formGroupRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={showEditModal ? editingAddress?.city || '' : newAddress.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className={`${styles.input} ${
                        errors.city ? styles.inputError : ''
                      }`}
                    />
                    {errors.city && (
                      <p className={styles.errorMessage}>{errors.city}</p>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={showEditModal ? editingAddress?.state || '' : newAddress.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className={`${styles.input} ${
                        errors.state ? styles.inputError : ''
                      }`}
                    />
                    {errors.state && (
                      <p className={styles.errorMessage}>{errors.state}</p>
                    )}
                  </div>
                </div>

                {/* Pincode */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={showEditModal ? editingAddress?.pincode || '' : newAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter 6-digit pincode"
                    maxLength="6"
                    className={`${styles.input} ${
                      errors.pincode ? styles.inputError : ''
                    }`}
                  />
                  {errors.pincode && (
                    <p className={styles.errorMessage}>{errors.pincode}</p>
                  )}
                </div>

                {/* Form Actions */}
                <div className={styles.formActions}>
                  <button
                    onClick={handleCancel}
                    className={styles.cancelButton}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                        {showEditModal ? 'Updating...' : 'Adding...'}
                      </div>
                    ) : (
                      showEditModal ? 'Update Address' : 'Add Address'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManagement;