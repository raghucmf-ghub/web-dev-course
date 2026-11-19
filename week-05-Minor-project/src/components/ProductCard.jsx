import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/uiSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.ui.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <button
        className={`wishlist-icon ${isWishlisted ? 'active' : ''}`}
        onClick={() => dispatch(toggleWishlist(product))}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>

      <Link to={`/products/${product.id}`} className="product-img-box">
        <img src={product.image} alt={product.title} />
      </Link>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title.length > 45 ? product.title.slice(0, 45) + '...' : product.title}
        </Link>

        {product.rating && (
          <div className="product-rating">
            ⭐ {product.rating.rate} <span>({product.rating.count})</span>
          </div>
        )}

        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={handleAddToCart}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
