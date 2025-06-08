import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';
import { addToCart, removeFromCart } from '../../src/store/slices/cartSlice/cartSlice';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { addWishlist, removeWishlist } from '@/store/slices/wishlistSlice/action';

const ProductCard = ({ product, onWishlistToggle }) => {
  const dispatch = useDispatch();

  const { items: cartItems } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  const cartItem = cartItems.find(item => item.uniqueId === product.uniqueId);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isInCart = quantityInCart > 0;

  // Local state for wishlist to avoid directly mutating props
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isWishlisted) {
         dispatch(removeWishlist({ productId: product._id }));
      } else {
         dispatch(addWishlist({ productId: product._id }));
      }
      setIsWishlisted(!isWishlisted);
      onWishlistToggle && onWishlistToggle(); // Optional callback
    } catch (error) {
      console.error('Wishlist toggle failed:', error);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleIncrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleDecrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(product.uniqueId));
  };

  return (
    <>
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.productCard} style={{ cursor: 'pointer' }}>
          <div className={styles.productImageContainer}>
            <img src={product.image} alt={product.name} className={styles.productImage} />

            {/* Wishlist Button */}
            {isAuthenticated && (
              <button
                className={styles.wishlistButton}
                onClick={handleToggleWishlist}
                data-tooltip-id={`wishlist-tooltip-${product.uniqueId}`}
                data-tooltip-content={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWishlisted ? (
                  <FaHeart className={styles.wishlistIconActive} />
                ) : (
                  <FaRegHeart className={styles.wishlistIcon} />
                )}
              </button>
            )}

            {/* Status Labels */}
            {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
            {product.onSale && product.inStock && <div className={styles.saleBadge}>Sale</div>}
          </div>

          {/* Product Info */}
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

              {/* Cart Controls */}
              {!isInCart ? (
                <button
                  className={`${styles.addToCartBtn} ${!product.inStock ? styles.disabled : ''}`}
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  ADD
                </button>
              ) : (
                <div className={styles.quantityControl} role="group" aria-label="Product quantity controls">
                  <button className={styles.quantityButton} onClick={handleDecrementQuantity}>
                    −
                  </button>
                  <span className={styles.quantityValue}>{quantityInCart}</span>
                  <button className={styles.quantityButton} onClick={handleIncrementQuantity}>
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Tooltip */}
      <Tooltip
        id={`wishlist-tooltip-${product.uniqueId}`}
        place="top"
        effect="solid"
        className={styles.wishlistTooltip}
      />
    </>
  );
};

export default ProductCard;
