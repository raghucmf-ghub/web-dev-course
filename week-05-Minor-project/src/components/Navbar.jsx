import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/productSlice';
import { toggleDarkMode } from '../store/uiSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.ui.wishlist);
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const darkMode = useSelector((state) => state.ui.darkMode);

  // Calculate total items in cart
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛒 ShopZone
        </Link>

        {/* Search Bar in Navbar */}
        <form onSubmit={handleSearchSubmit} className="nav-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <button type="submit">Search</button>
        </form>

        {/* Navigation Menu */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">
            Wishlist ({wishlistItems.length})
          </Link>
          <Link to="/cart" className="cart-link">
            Cart <span className="cart-badge">{totalCartCount}</span>
          </Link>
          <Link to="/login" className="login-link">
            Login
          </Link>
          <button
            className="theme-btn"
            onClick={() => dispatch(toggleDarkMode())}
            title="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
