import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../store/slices/authSlice/action';
import styles from '../../styles/Profile.module.css';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Password change modal states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Password change handlers
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (passwordError) setPasswordError('');
    if (passwordSuccess) setPasswordSuccess('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswords = () => {
    if (!passwordData.currentPassword) {
      setPasswordError('Current password is required');
      return false;
    }
    if (!passwordData.newPassword) {
      setPasswordError('New password is required');
      return false;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return false;
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordError('New password must be different from current password');
      return false;
    }
    return true;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setIsChangingPassword(true);
    setPasswordError('');
    setPasswordSuccess('');

    try {
      // Dispatch changePassword thunk action
      const resultAction = await dispatch(changePassword(passwordData)).unwrap();

      console.log('Password change successful', resultAction);
      
      setPasswordSuccess('Password changed successfully!');
      
      // Close modal and reset form after success
      setTimeout(() => {
        handleModalClose();
      }, 2000);

    } catch (error) {
      setPasswordError(typeof error === 'string' ? error : 'Failed to change password');
      console.error('Password change error:', error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleModalClose = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setPasswordError('');
    setPasswordSuccess('');
    setShowPasswords({ current: false, new: false, confirm: false });
    setIsChangingPassword(false);
    onClose();
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleModalClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Change Password</h2>
          <button 
            className={styles.closeButton}
            onClick={handleModalClose}
            type="button"
            disabled={isChangingPassword}
          >
            ×
          </button>
        </div>

        <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
          <div className={styles.formField}>
            <label className={styles.inputLabel}>Current Password</label>
            <div className={styles.passwordField}>
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                className={styles.passwordInput}
                required
                disabled={isChangingPassword}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => togglePasswordVisibility('current')}
                disabled={isChangingPassword}
              >
                {showPasswords.current ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className={styles.formField}>
            <label className={styles.inputLabel}>New Password</label>
            <div className={styles.passwordField}>
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                className={styles.passwordInput}
                required
                disabled={isChangingPassword}
                placeholder="Enter your new password"
                minLength="6"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => togglePasswordVisibility('new')}
                disabled={isChangingPassword}
              >
                {showPasswords.new ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className={styles.formField}>
            <label className={styles.inputLabel}>Confirm New Password</label>
            <div className={styles.passwordField}>
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordInputChange}
                className={styles.passwordInput}
                required
                disabled={isChangingPassword}
                placeholder="Confirm your new password"
                minLength="6"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => togglePasswordVisibility('confirm')}
                disabled={isChangingPassword}
              >
                {showPasswords.confirm ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {passwordError && (
            <div className={styles.errorMessage}>
              ❌ {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div className={styles.successMessage}>
              ✅ {passwordSuccess}
            </div>
          )}

          <div className={styles.modalActions}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isChangingPassword}
            >
              {isChangingPassword ? '🔄 Changing...' : '🔐 Change Password'}
            </button>
            <button
              type="button"
              className={styles.cancelModalButton}
              onClick={handleModalClose}
              disabled={isChangingPassword}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;