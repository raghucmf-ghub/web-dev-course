import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../store/cartSlice';

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert(`Order placed successfully! Total paid: $${totalPrice.toFixed(2)}`);
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-container empty-cart">
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.title} className="cart-item-img" />

              <div className="cart-item-details">
                <Link to={`/products/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <div className="cart-item-price">${item.price.toFixed(2)} each</div>

                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <div className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Box */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Total Items:</span>
            <strong>{totalItems}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total Price:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button
            className="btn btn-secondary clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
