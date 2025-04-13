// components/ui/Button/index.js
import styles from '../../../styles/Button.module.css'

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const variantClass = {
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline
  }[variant] || styles.primary

  return (
    <button 
      className={`${styles.btn} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}