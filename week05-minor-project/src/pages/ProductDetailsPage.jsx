import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const product = items.find((item) => item.id === Number(id));

  // Simple gallery preview state (main image + simulated angle views)
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (loading) {
    return <div className="page-container status-msg">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="page-container status-msg">
        <p>Product not found.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '12px', display: 'inline-block' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  // Simulated gallery thumbnails using the product image
  const galleryImages = [product.image, product.image, product.image];

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  return (
    <div className="page-container">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <div className="details-wrapper">
        {/* Image Gallery */}
        <div className="details-gallery">
          <div className="main-image-box">
            <img
              src={galleryImages[selectedThumb]}
              alt={product.title}
              style={{
                transform: selectedThumb === 1 ? 'scale(1.08)' : selectedThumb === 2 ? 'rotate(-3deg)' : 'none',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>
          <div className="thumb-row">
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                className={`thumb-btn ${selectedThumb === idx ? 'active' : ''}`}
                onClick={() => setSelectedThumb(idx)}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="details-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>

          {product.rating && (
            <div className="product-rating" style={{ margin: '10px 0' }}>
              ⭐ {product.rating.rate} / 5 ({product.rating.count} customer reviews)
            </div>
          )}

          <div className="details-price">${product.price.toFixed(2)}</div>

          <p className="details-desc">{product.description}</p>

          <div className="details-actions">
            <button className="btn btn-primary" onClick={handleAdd}>
              {addedFeedback ? '✓ Added to Cart!' : '+ Add to Cart'}
            </button>
            <Link to="/cart" className="btn btn-secondary">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
