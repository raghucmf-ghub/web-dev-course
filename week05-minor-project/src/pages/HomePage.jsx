import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const { items, loading, error } = useSelector((state) => state.products);

  // Show top 4 featured products on Home Page
  const featuredProducts = items.slice(0, 4);

  return (
    <div className="page-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to ShopZone</h1>
          <p>
            Discover great deals on electronics, fashion, accessories, and everyday essentials.
            Built with React and Redux Toolkit!
          </p>
          <Link to="/products" className="btn btn-primary hero-btn">
            Shop All Products →
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all-link">
            View All →
          </Link>
        </div>

        {loading && <div className="status-msg">Loading featured products...</div>}
        {error && <div className="status-msg error">Error: {error}</div>}

        {!loading && !error && (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
