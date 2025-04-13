import styles from '../styles/Rating.module.css';

const Rating = ({ value }) => {
  // Validate and clamp the value between 0 and 5
  const clampedValue = Math.min(Math.max(Number(value) || 0, 0), 5);
  const stars = [];
  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue % 1 >= 0.5 && clampedValue < 5; // Ensure we don't show half star when at max
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Create full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className={`${styles.star} ${styles.full}`}>
        ★
      </span>
    );
  }

  // Create half star if needed
  if (hasHalfStar) {
    stars.push(
      <span key="half" className={`${styles.star} ${styles.half}`}>
        ★
      </span>
    );
  }

  // Create empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className={`${styles.star} ${styles.empty}`}>
        ★
      </span>
    );
  }

  return <div className={styles.rating}>{stars}</div>;
};

export default Rating;