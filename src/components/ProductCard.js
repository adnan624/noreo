import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';
import { addToCart, removeFromCart, hideCartNotification } from '../../src/store/slices/cartSlice/cartSlice';
import CartNotification from '../components/CartNotification';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items: cartItems, notificationProductId } = useSelector(state => state.cart);
  
  const cartItem = cartItems.find(item => item.uniqueId === product.uniqueId);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isInCart = quantityInCart > 0;
  const showNotification = notificationProductId === product.uniqueId;

  console.log(`Product ${product.uniqueId} (id: ${product.id}, name: ${product.name}):`, { quantityInCart, isInCart, showNotification });

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const incrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const decrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(product.uniqueId));
  };

  // useEffect(() => {
  //   if (showNotification) {
  //     const timer = setTimeout(() => {
  //       dispatch(hideCartNotification());
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showNotification, dispatch]);

  return (
    <>
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.productCard} style={{ cursor: 'pointer' }}>
          <div className={styles.productImageContainer}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
            {product.onSale && product.inStock && <div className={styles.saleBadge}>Sale</div>}
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.quantityText}>{product.watt || 'NA W'}</p>
            <div className={styles.productFooter}>
              <div className={styles.priceContainer}>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>₹{Math.round(product.originalPrice)}</span>
                )}
                <span className={styles.productPrice}>₹{Math.round(product.price)}</span>
              </div>
              {!isInCart ? (
                <button
                  className={`${styles.addToCartBtn} ${!product.inStock ? styles.disabled : ''}`}
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  ADD
                </button>
              ) : (
                <div className={styles.quantityControl} onClick={(e) => e.preventDefault()}>
                  <button className={styles.quantityButton} onClick={decrementQuantity}>
                    −
                  </button>
                  <span className={styles.quantityValue}>{quantityInCart}</span>
                  <button className={styles.quantityButton} onClick={incrementQuantity}>
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      {/* <CartNotification
        product={product}
        onClose={() => dispatch(hideCartNotification())}
        show={showNotification}
      /> */}
    </>
  );
};

export default ProductCard;