import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

// eslint-disable-next-line react/prop-types
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => 
      total + (parseFloat(item.cost.replace('$', '')) * item.quantity), 0
    ).toFixed(2);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2);
  };

  // Handle continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Handle checkout (for future functionality)
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity or remove item if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length > 0 ? (
          cart.map(item => (
            <div className="cart-item" key={item.id}> {/* Ensure this is unique */}
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Price: ${item.cost}</div>
                <div className="cart-item-quantity">
                  <button 
                    className="cart-item-button cart-item-button-dec" 
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button 
                    className="cart-item-button cart-item-button-inc" 
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button 
                  className="cart-item-delete" 
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="continue_shopping_btn">
        <center>
        <button 
          className="get-started-button" 
          onClick={handleContinueShopping}
        >
          
          Continue Shopping
          
        </button>
        </center>
        <center>
        <br />
        <button 
          className="get-started-button1" 
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
        </center>
      </div>
    </div>
  );
};

export default CartItem;




