import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

function Product({userId}) {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product_id) {
      fetch(`/get_product/${product_id}`)
        .then((res) => res.json())
        .then((data) => {setProduct(data.product)
            console.log(data)
        })
        .catch((error) => console.log("Error fetching shoe:", error));

    }
  }, [product_id]);

//   const handleAddToCart = () => {
//     const data = {
//       user_id: userId, // Replace with the actual user ID
//       shoe_id: product.product_id,
//     };

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

  return (
    <div className="product">
    <div className="boxProduct" key={product.product_id}>
    <img src={product.image_link} alt={product.product_name} />
      <div className="des">
      {product.product_name}<br/>
      {/* Out of stalk:{product.is_out_of_stock }<br/> */}
      Category:{product.category_name}<br/>
      {product.description}<br/>
      Quantity:{product.quantity}<br/>
      Price:<b>Ksh {product.price}<br/></b>
      <div className="cta">
        <button className="btn" >
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