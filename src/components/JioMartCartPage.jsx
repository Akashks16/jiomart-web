import React, { useState } from "react";
import "./JioMartCartPage.css";

const JioMartCartPage = ({ onBackToProducts, cartItems: selectedProducts }) => {
  const [cartItems, setCartItems] = useState(selectedProducts);

  // Function to handle quantity change
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Function to handle direct quantity input
  const handleQuantityChange = (id, newValue) => {
    const quantity = Math.max(1, parseInt(newValue) || 1);
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="cart-logo">
          <div onClick={onBackToProducts}>back</div>
          <div className="logo-icon"></div>
          <h1>JioMart</h1>
        </div>
        <div className="cart-links">
          <span>Special Rates</span>
        </div>
      </div>

      <div className="cart-content">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h3 className="item-name">{item.name}</h3>
            <div className="item-price-row">
              <span className="mrp">MRP Rs. {item.mrp.toFixed(2)}</span>
              <span className="jiomart-price">
                JioMart Bhav Rs. {item.jioMartPrice.toFixed(2)}
              </span>
            </div>
            <div className="item-code-row">
              <span className="code-label">Code : </span>
              <span className="code-value">{item.id}</span>
              <div className="quantity-control">
                <span className="qty-label">Qty</span>
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="qty-btn decrease"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="qty-input"
                />
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="qty-btn increase"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="confirm-order-section">
          <button
            className="confirm-order-btn"
            onClick={() => {
              window.postMessage(
                {
                  type: "checkout",
                },
                "*"
              );
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default JioMartCartPage;
