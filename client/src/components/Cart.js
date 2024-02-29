
import React, { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';
import "./cart.css";
import { Link } from "react-router-dom";

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
    console.log(cartItem.id);

    fetch(`/cartitems/${cartItem.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== cartItem.id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.total_price, 0);
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="cart-page">
    <div >
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="custom-container">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
            </div>
            <div className=" flex mt-10 mb-5 text-lg ">
            <h3 className="text-gray-600 text-lg uppercase w-2/5">Product Details</h3>
              <h3 className="text-center text-gray-600 text-lg uppercase w-1/5 text-center">Price</h3>
              <h3 className="text-center text-gray-600 text-lg uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="text-center text-gray-600 text-lg uppercase w-1/5 text-center">Total</h3>
            </div>
            {cartItems.map((cartItem) => (
              <div key={cartItem.product_id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                  <img
                    className="h-30 ml-4 mr-2 p-2 rounded-full"
                    src={cartItem.image_link}
                    alt={cartItem.product_name}
                    style={{ width: '120px', height: '140%' }}
                  />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cartItem.product_name}</span>
                    <span className="text-red-500 text-xs">{cartItem.brand}</span>
                  </div>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">Ksh {cartItem.price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">{cartItem.quantity}</span>
                <span className="text-center w-1/5 font-semibold text-sm">Ksh {cartItem.total_price}</span>
                <FaTrash
                  style={{ fontSize: '24px', color: '#ff0000', cursor: 'pointer' }}
                  onClick={() => handleDeleteCartItem(cartItem)}
                />
              </div>
            ))}
            <div className="flex font-semibold text-indigo-600 text-sm mt-10">
              <Link to="/products">Continue Shopping</Link>
            </div>
          </div>
          <div id="summary" className="w-1/3 px-8 py-10">
            <div className="details-in-container">
              <div className="details">
                <div className="wrapper">
                  <h3 className="font-semibold">YOUR TOTAL AMOUNT</h3>
                  <p className="font-semibold"><b>Ksh {calculateTotalPrice()}</b></p>
                  
                </div>
                <button className="btn-9 hover:bg-goldenrod-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm">
                  <Link to="/checkout">Proceed to Payment</Link>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Cart;









