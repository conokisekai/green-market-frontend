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

  return (
    <div className="container" style={{ backgroundImage: "linear-gradient(225deg, #15cfe8, #031a34)" }}>
      <h1>Shop Cart</h1>
      <div className="">
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">Your cart is empty.</div>
        ) : (
          cartItems.map((cartItem) => (
            <div className="box" key={cartItem.product_id}>
              <img src={cartItem.image_link} alt={cartItem.product_name} />
              <div className="des">
                {cartItem.product_name}<br />
                {/* Out of stalk:{cartItem.is_out_of_stock }<br/> */}
                Category:{cartItem.category_name}<br />
                {cartItem.description}<br />
                Quantity:{cartItem.quantity}<br />
                Price:<b>Ksh {cartItem.price}<br /></b>

                <button onClick={() => handleDeleteCartItem(cartItem)} className="btn-8">
                <li className="mr-4">
                  <FaTrash style={{ fontSize: '24px', color: '#ff0000' }} />
                </li>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
