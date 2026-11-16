import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function WishlistPage() {
  const wishlist = useSelector((state) => state.ui.wishlist);

  return (
    <div className="page-container">
      <h1 className="page-title">My Wishlist ({wishlist.length})</h1>

      {wishlist.length === 0 ? (
        <div className="empty-cart">
          <p>Your wishlist is currently empty.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '15px', display: 'inline-block' }}>
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
