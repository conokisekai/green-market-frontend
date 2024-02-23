// import React, { useEffect, useState } from "react";
// import { FaTrash } from 'react-icons/fa';
// import "./cart.css";

// function Cart({ userId }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("Fetching data...");
//     setLoading(true);

//     fetch(`/cartitems/${userId}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCartItems(data.cart_items);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setError("Failed to fetch cart items. Please try again later.");
//         setLoading(false);
//       });
//   }, [userId]);

//   const handleDeleteCartItem = (cartItem) => {
//     console.log(cartItem.id);
//     fetch(`/cartitems/${cartItem.id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         setCartItems((prevCartItems) =>
//           prevCartItems.filter((item) => item.id !== cartItem.id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   const handleNumberChange = (cartItem, newNumber) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === cartItem.id ? { ...item, number: newNumber } : item
//     );
//     setCartItems(updatedCartItems);
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((sum, cartItem) => sum + cartItem.price * cartItem.number || cartItem.price, 0);
//   };

//   if (loading) {
//     return <div className="loading-container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-container">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-gray-100">
//       <div className="container mx-auto mt-10">
//         <div className="flex shadow-md my-10">
//           <div className="w-3/4 bg-white px-10 py-10">
//             <div className="flex justify-between border-b pb-8">
//               <h1 className="font-semibold text-2xl">Shopping Cart</h1>
//               <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
//             </div>
//             <div className="flex mt-10 mb-5">
//               <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
//               <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
//               <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Number</h3>
//               <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
//               <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
//             </div>
//             {cartItems.map((cartItem) => (
//               <div key={cartItem.product_id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
//                 <div className="flex w-2/5">
//                   <div className="w-20">
//                     <img className="h-24" src={cartItem.image_link} alt={cartItem.product_name} />
//                   </div>
//                   <div className="flex flex-col justify-between ml-4 flex-grow">
//                     <span className="font-bold text-sm">{cartItem.product_name}</span>
//                     <span className="text-red-500 text-xs">{cartItem.brand}</span>
//                     <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => handleDeleteCartItem(cartItem)}>
//                       Remove
//                     </a>
//                   </div>
//                 </div>
//                 <div className="flex justify-center w-1/5">
//                   <FaTrash style={{ fontSize: '24px', color: '#ff0000' }} onClick={() => handleDeleteCartItem(cartItem)} />
//                   <span className="mx-2 border text-center w-8">{cartItem.quantity}</span>
//                 </div>
//                 <div className="flex justify-center w-1/5">
//                   <span className="mx-2 border text-center w-8">{cartItem.number || 1}</span>
//                   <input
//                     type="number"
//                     className="mx-2 border text-center w-8"
//                     value={cartItem.number}
//                     onChange={(e) => handleNumberChange(cartItem, parseInt(e.target.value, 10) || 1)}
//                     min="1"
//                   />
//                 </div>
//                 <span className="text-center w-1/5 font-semibold text-sm">${cartItem.price}</span>
//                 <span className="text-center w-1/5 font-semibold text-sm">${cartItem.price * (cartItem.number || 1)}</span>
//               </div>
//             ))}
//             <div className="flex font-semibold text-indigo-600 text-sm mt-10">
//               Continue Shopping
//             </div>
//           </div>
//           <div id="summary" className="w-1/4 px-8 py-10">
//             <div className="details-in-container">
//               <div className="details">
//                 <div className="wrapper">
//                   <h3 className="font-semibold">YOUR TOTAL AMOUNT</h3>
//                   <p><b>Ksh {calculateTotalPrice()}</b></p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;


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
    return cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0);
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            {cartItems.map((cartItem) => (
              <div key={cartItem.product_id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={cartItem.image_link} alt={cartItem.product_name} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cartItem.product_name}</span>
                    <span className="text-red-500 text-xs">{cartItem.brand}</span>
                    <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => handleDeleteCartItem(cartItem)}>
                      Remove
                    </a>
                  </div>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">${cartItem.price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${cartItem.price}</span>
                <FaTrash
                  style={{ fontSize: '24px', color: '#ff0000', cursor: 'pointer' }}
                  onClick={() => handleDeleteCartItem(cartItem)}
                />
              </div>
            ))}
            <div className="flex font-semibold text-indigo-600 text-sm mt-10">
              Continue Shopping
            </div>
          </div>
          <div id="summary" className="w-1/4 px-8 py-10">
            <div className="details-in-container">
              <div className="details">
                <div className="wrapper">
                  <h3 className="font-semibold">YOUR TOTAL AMOUNT</h3>
                  <p><b>Ksh {calculateTotalPrice()}</b></p>
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






