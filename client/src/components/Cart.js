import React, { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';
import "./cart.css";

function Cart({ userId }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    setLoading(true);

    fetch(`/cartitems/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data.cart_items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch cart items. Please try again later.");
        setLoading(false);
      });
  }, [userId]);

  const handleDeleteCartItem = (cartItem) => {
    // Send DELETE request to the server
    console.log(cartItem.id);
    fetch(`/cartitems/${cartItem.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        // If successful, update the state to remove the deleted item
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== cartItem.id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  const totalPrice = cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0);
  return (
    <div className="cart-container">
      <div className="in-container">
      <h1>Shop Cart</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">Your cart is empty.</div>
        ) : (
          cartItems.map((cartItem) => (
            <div className="list" key={cartItem.product_id}>
              <img src={cartItem.image_link} alt={cartItem.product_name} />
              <div className="wrapper">
                {cartItem.product_name}<br />
                {/* Out of stalk:{cartItem.is_out_of_stock }<br/> */}
                Category:{cartItem.category_name}<br />
                {cartItem.description}<br />
                Quantity:{cartItem.quantity}<br />
                Price:<b>Ksh {cartItem.price}<br /></b>
                <button onClick={() => handleDeleteCartItem(cartItem)} className="delete-btn">
                  <FaTrash style={{ fontSize: '24px', color: '#ff0000' }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
      <div className="details-in-container">
      <div className="details">
        <div className="wrapper">
          <h3>YOU TOTAL AMOUNT</h3>
          <p>Nutrition Facts</p>
          <p><b>Ksh{totalPrice}</b></p>
          
        </div>
      </div>
      </div>
    </div>
  );
}

export default Cart;
