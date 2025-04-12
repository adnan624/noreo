import styles from '../styles/Rating.module.css';

const Rating = ({ value }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className={styles.star}>&#9733;</span>);
  }

  if (hasHalfStar) {
    stars.push(<span key="half" className={styles.star}>&#9734;&#xFE0E;&#9733;</span>);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className={`${styles.star} ${styles.empty}`}>&#9734;</span>);
  }

  return <div className={styles.rating}>{stars}</div>;
};

export default Rating;