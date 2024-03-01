import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./products.css";
import Page from "./ThemeSwitch";

function Products({ userId, role }) {
  const [isSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [productQuantities, setProductQuantities] = useState({});
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const productsPerPage = 15;

  useEffect(() => {
    fetch("/get_all_products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  console.log(role);
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() !== "") {
      const filteredProducts = products.filter(
        (product) =>
          product.product_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]);
    }
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleAddToCart = (product) => {
    console.log(
      "Adding to cart...",
      userId,
      product.product_id,
      productQuantities
    );

    const data = {
      user_id: userId,
      product_id: product.product_id,
      quantity: productQuantities[product.product_id] || 1,
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
      .catch((error) => {
        console.error("Error adding to cart:", error);
        setAddedToCart(false);
      });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (
    searchTerm.trim() === "" ? products : filteredProducts
  ).slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    (searchTerm.trim() === "" ? products.length : filteredProducts.length) /
      productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCustomAlert = () => {
    setCustomAlertVisible(true);
    setTimeout(() => {
      setCustomAlertVisible(false);
    }, 3000); // Change 3000 to the desired timeout in milliseconds
  };

  return (
    <div className="products">
      <div className="top">
        <div className="search">
          {/* Assuming SearchBar component is defined elsewhere */}
          <SearchBar onSearch={handleSearch} products={products} />
        </div>
        <div className="menu ml-11">
          <ul className="flex">
            <li className="mr-4">
              {role === "buyer" ? (
                <Link to="/cart">
                  <FaShoppingCart
                    style={{ fontSize: "24px", color: "rgba(0, 0, 0, 0.514)" }}
                  />
                </Link>
              ) : (
                <span onClick={handleCustomAlert}>
                  <FaShoppingCart
                    style={{ fontSize: "24px", color: "rgba(0, 0, 0, 0.514)" }}
                  />
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex">
        <div className="sideContainer"></div>
        <div className={`icerik ${isSidebarOpen ? "" : "small"}`}>
          <div className="ust"></div>
          <div className="grid grid-cols-5 gap-3 p-4">
            {currentProducts.map((product) => (
              <div key={product.product_id}>
                <div className="boxy">
                  <Link to={`/products/${product.product_id}`}>
                    <img
                      src={product.image_link}
                      alt={product.product_name}
                      className="object-cover rounded-md border border-gray-300 h-48 w-full"
                    />
                  </Link>
                  <div className="des">
                    <div className="">
                      {product.description}
                      <br />
                      <b>Ksh:{product.price}</b>
                      <br />
                      <b>
                        Total: Ksh{" "}
                        {product.price *
                          (productQuantities[product.product_id] || 1)}
                      </b>
                    </div>
                    <div className="cta">
                      <label>
                        Quantity:
                        <input
                          type="number"
                          value={productQuantities[product.product_id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.product_id,
                              parseInt(e.target.value, 10) || 1
                            )
                          }
                          min="1"
                          className="border border-gray-300 px-2 py-1 mr-2"
                        />
                      </label>
                      <button
                        className="btn  text-white hover:bg-blue-600"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart <FaShoppingCart className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination controls */}
          <div className="pagination flex items-center justify-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn-9 bg-gray-300 mr-2"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn-9 bg-gray-300 ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {customAlertVisible && (
        <div id="custom-alert" className="custom-alert">
          <h3>
            Sign in as a Buyer to purchase
          </h3>
        </div>
      )}
    </div>
  );
}

export default Products;





// import React, { useState,useEffect } from "react";
// import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
// import Page from "./ThemeSwitch";


// import "./products.css";
// import { Link } from "react-router-dom";
// // import  logo from "./"
// import SearchBar from "./SearchBar";

// // function CustomerCard(props) {
// //   return (
// //     <div className="customer">
// //       <div className="info">
// //         <img src={props.image} height="40px" width="40px" alt="customer" />
// //         <div>
// //           <h4>{props.name}</h4>
// //           <small>{props.position}</small>
// //         </div>
// //       </div>
// //       <div className="contact">
// //         <span className="fas fa-user-circle"></span>
// //         <span className="fas fa-comment"></span>
// //         <span className="fas fa-phone-alt"></span>
// //       </div>
// //     </div>
// //   );
// // }

// function Products(users) {
//   const [isSidebarOpen] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products,setProducts]=useState([])
//   const [filteredProducts,setFilteredProducts]=useState([])
// console.log(users)
//   useEffect(() => {
//     fetch("/get_all_products")
//       .then((response) => response.json())
//       .then((data) => {setProducts(data.products)
//      console.log(data)
//       })

//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//     const handleSearch = (searchTerm) => {
//     setSearchTerm(searchTerm);
//     if (searchTerm.trim() !== "") {
//       const filteredProducts = products.filter((product) =>
//         product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filteredProducts);
//     } else {
//       setFilteredProducts([]);
//     }
//   };

//   return (

//     <div className="products">
//       <div className="top">

//       <div className="search  ">
//         <SearchBar onSearch={handleSearch} products={products}/>
//        </div>
//        <div className="menu ml-11" >
//           <ul className="flex">
//             {/* <li className="mr-4">
//               <Link to="/otp"><FaHeart style={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.514)' }} /></Link>
//             </li> */}

//             <li className="mr-4">
//              <Link to="/cart" ><FaShoppingCart style={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.514)' }} /></Link>
//             </li>
//             {/* <li className="mr-4">
//              <Link to="/userprofile"><FaUser style={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.514)' }} /></Link>
//             </li> */}
//           </ul>
        
//       </div>
//       </div>
//   <div>
//       </div>

//       <div className="flex">
//       <div className="sideContainer">
//         <div className="sideuppcontainer">
//         {/* <div className="bg-navy text-white rounded-l-lg p-4">
//           <div className={`sidebar ${isSidebarOpen ? "" : "small"}`}>
//             <div className="text-6xl font-bold">Agri-Soko </div>
//             <Link to="/cart">My Orders</Link><br/>
//             <Link to="/settings">Settings</Link><br/>
//             <Link to="/contact">Contact</Link><br/>
//             <Link to="/checkout">Billing</Link><br/>
//             <Link to="/userprofile">My Profile</Link>
//           </div>
//         </div>
//         </div>
//         <div className="customers">
//       <div className="card">
//         <div className="card-header">
//           <h2>New Customers</h2>
//           <button>See all <span className="fas fa-arrow-right"></span></button>
//         </div>
//       {users.length > 0 ? (
//       users.map((user, index) => (
//         <div className="card-body"key={index}>
//           <CustomerCard name={user.username} position={user.role} image={<img src={user.image_link} alt={user.username}/> }/>
//         </div>
//       ))
//       ) : (
//         <p>Loading data....</p>
//       )
//     }
//       </div> */}
//     </div>
//       </div>

//       <div className={`icerik ${isSidebarOpen ? "" : "small"}`}>
//         <div className="ust"></div>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4">
//         {(searchTerm.trim() === "" ? products : filteredProducts).slice(0, 15).map((product) => (
//               <Link to={`/products/${product.product_id}`}>
//             <div className="box" key={product.product_id}>
           
//               <img
//                 src={product.image_link}
//                 alt={product.product_name}
//                 // className="object-cover border-radius-5 border-bottom-right-radius-60 h-160 w-full"
//                 className="object-cover rounded-md border border-gray-300 h-48 w-full"
//               />
             
//               <div className="des">
//                 Description: {product.description}

//               </div>
//             </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>   

//   );
// }

// export default Products;







