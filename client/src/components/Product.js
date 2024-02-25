// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./product.css";
// import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

// function Product({userId}) {
//   const { product_id } = useParams();
//   const [product, setProduct] = useState({});
//   const [addedToCart, setAddedToCart] = useState(false);

//   useEffect(() => {
//     if (product_id) {
//       fetch(`/get_product/${product_id}`)
//         .then((res) => res.json())
//         .then((data) => {setProduct(data.product)
//             console.log(data)
//         })
//         .catch((error) => console.log("Error fetching shoe:", error));

//     }
//   }, [product_id]);

//   const handleAddToCart = () => {
//     console.log("Adding to cart...", userId, product.product_id);
//     const data = {
//       user_id: userId, // Replace with the actual user ID
//       product_id: product.product_id,
//     };
//     console.log("Data to be sent:", data);

//     // Adjust the URL and parameters based on your backend
//     fetch("/cart", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         setAddedToCart(true);
//       })
//       .catch((error) => console.error("Error adding to cart:", error));
//   };

//   return (
//     <div className="product">
//     <div className="boxProduct" key={product.product_id}>
//     <img src={product.image_link}
//      alt={product.product_name}
//      className="object-cover rounded-md border border-gray-300 h-48 w-full"
//      />
//       <div className="des">
//       {product.product_name}<br/>
//       {/* Out of stalk:{product.is_out_of_stock }<br/> */}
//       Category:{product.category_name}<br/>
//       {product.description}<br/>
//       Quantity:{product.quantity}<br/>
//       Price:<b>Ksh {product.price}<br/></b>
//       <div className="cta">
//         <button className="btn" onClick={handleAddToCart}>
//           Add to Cart <FaShoppingCart />
//         </button>
    
//       </div>
//       </div>
//       {addedToCart && (
//         <div className="added-to-cart-message">
//           <FaShoppingCart /> Added to Cart!
//         </div>
//       )}
//       </div>
//       </div>
    
//   );
// }

// export default Product;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

function Product({ userId }) {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product_id) {
      fetch(`/get_product/${product_id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.product);
        })
        .catch((error) => console.log("Error fetching product:", error));
    }
  }, [product_id]);

  const handleAddToCart = () => {
    console.log("Adding to cart...", userId, product.product_id, quantity);

    const data = {
      user_id: userId,
      product_id: product.product_id,
      quantity: quantity,
    };

    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAddedToCart(true);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div className="product">
      <div className="boxProduct" key={product.product_id}>
        <img
          src={product.image_link}
          alt={product.product_name}
          className="object-cover rounded-md border border-gray-300 h-48 w-full"
        />
        <div className="des">
          {product.product_name}
          <br />
          Category: {product.category_name}
          <br />
          {product.description}
          <br />
          Quantity: {product.quantity}
          <br />
          Price: <b>Ksh {product.price * quantity}</b>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              min="1"
            />
          </label>
          <div className="cta">
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart <FaShoppingCart />
            </button>
          </div>
        </div>
        {addedToCart && (
          <div className="added-to-cart-message">
            <FaShoppingCart /> Added to Cart!
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
