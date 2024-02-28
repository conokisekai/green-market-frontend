import React, { useState, useEffect } from "react";
import "./farmerDashboard.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function CustomerCard(props) {
  return (
    <div className="customer">
      <div className="info">
        <img src={props.image} height="40px" width="40px" alt={props.name} />
        <div>
          <h4>{props.name}</h4>
          <small>{props.position}</small>
        </div>
      </div>
      <div className="contact">
        <span className="fas fa-user-circle"></span>
        <span className="fas fa-comment"></span>
        <span className="fas fa-phone-alt"></span>
      </div>
    </div>
  );
}

function FarmerDashboard({ userId, users }) {
  const [isSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetch(`/get_product_user_id/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        console.log(data.product);
      })
      .catch((error) => {
        console.error("Failed to fetch products. Please try again:", error);
      });
    console.log(userId);
  }, [userId]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() !== "") {
      const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category_name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]);
    }
    setCurrentPage(1); // Reset to the first page when searching
  };


  const handleDeleteProduct = async (product_id) => {
    try {
      const response = await fetch(`/delete_product/${product_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== product_id));
      } else {
        console.error(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred while communicating with the server');
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (searchTerm.trim() === "" ? products : filteredProducts).slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil((searchTerm.trim() === "" ? products.length : filteredProducts.length) / productsPerPage);

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

  return (
    <div className="farmerdashboard">
      <div className="farmertop">
        <div className="searchfarmerproduct">
          <SearchBar onSearch={handleSearch} products={products} />
        </div>
      </div>
      <div>
        <div className="farmer">
          <h3 >Farmer dashboard</h3>
        </div>
      </div>

      <div className="flex">
        <div>
          <div className="bg-navy text-white rounded-l-lg p-4">
            <div className={`sidebar ${isSidebarOpen ? "" : "small"}`}>
              <div className="text-6xl font-bold">Agri-Soko </div>
              <Link to="/products">Dashboard</Link><br />
              <Link to="/settings">Settings</Link><br />
              <Link to="/billing">Billing</Link><br />
              <Link to="/userprofile">My Profile</Link><br />
              <Link to="/farmerproductform" className="add">Add Product</Link>
            </div>
          </div>
          <div className="customers">
            <div className="card">
              <div className="card-header">
                <h2>New Customers</h2>
                <button>See all <span className="fas fa-arrow-right"></span></button>
              </div>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <div className="card-body" key={index}>
                    <CustomerCard name={user.username} position={user.role} image={<img src={user.image_link} alt={user.username} />} />
                  </div>
                ))
              ) : (
                <p>Loading data....</p>
              )}
            </div>
          </div>
        </div>

        <div className={`icerik ${isSidebarOpen ? "" : "small"}`}>
          <div className="ust"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {currentProducts.map((product) => (
              <div className="boxfarmer" key={product.product_id}>
                <img
                  src={product.image_link}
                  alt={product.product_name}
                  className="object-cover rounded-md border border-gray-300 h-48 w-full"
                />
                <div className="des">
                  {product.description}<br />
                </div>
                <button className="btn-9" onClick={() => handleDeleteProduct(product.product_id)}>
                  Delete Product
                </button>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn-9">Previous</button>
            <span>{currentPage}/{totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn-9">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;

// import React, { useState,useEffect} from "react";
// import { FaUser } from 'react-icons/fa';
// import "./farmerDashboard.css";
// import { Link} from "react-router-dom";
// import SearchBar from "./SearchBar";


// function CustomerCard(props) {
//   return (
//     <div className="customer">
//       <div className="info">
//         <img src={props.image} height="40px" width="40px" alt="customer" />
//         <div>
//           <h4>{props.name}</h4>
//           <small>{props.position}</small>
//         </div>
//       </div>
//       <div className="contact">
//         <span className="fas fa-user-circle"></span>
//         <span className="fas fa-comment"></span>
//         <span className="fas fa-phone-alt"></span>
//       </div>
//     </div>
//   );
// }

// function FarmerDashboard({userId,users}) {
//   const [isSidebarOpen] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products,setProducts]=useState([]);
//   const [filteredProducts,setFilteredProducts]=useState([]);
 
//   useEffect(() => {
//     fetch(`/get_product_user_id/${userId}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setProducts(data.products);
//         console.log(data.product)
//       })
//       .catch((error) => {
//         console.error("Failed to fetch products. Please try again:", error);
//       });
//        console.log(userId)
//   }, [userId]);


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

//   const handleDeleteProduct = async (product_id) => {
//     try {
//       const response = await fetch(`/delete_product/${product_id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== product_id));
//       } else {
//         console.error(data.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('An error occurred while communicating with the server');
//     }
//   };
//   return (
//     <div className="farmerdashboard" >
//       <div className="farmertop">
//       <div className="searchfarmerproduct">
//       <SearchBar onSearch={handleSearch} products={products}/>
//       </div>
//         <div className="menufarmer">
//           <ul className="flex">
//             <li className="mr-4">
//             <Link to="/userprofile"><FaUser style={{ fontSize: '35px', color: 'rgba(0, 0, 0, 0.514)' }} /></Link>
//             </li>
//           </ul>
//         </div>
//     </div>
//   <div>
//     <div className="farmer">
//          <h3 >Farmer dashboard</h3>
//     </div>
    
//   </div>

//       <div className="flex">
//       <div>
//         <div className="bg-navy text-white rounded-l-lg p-4">
//           <div className={`sidebar ${isSidebarOpen ? "" : "small"}`}>
//             <div className="text-6xl font-bold">Agri-Soko </div>
//             <Link to="/products">Dashboard</Link><br/>
//             <Link to="/settings">Settings</Link><br/>
//             <Link to="/billing">Billing</Link><br/>
//             <Link to="/userprofile">My Profile</Link><br/>
//             <Link to="/farmerproductform" className="add">Add Product</Link>
//           </div>
//         </div>
//         <div className="customers">
//       <div className="card">
//         <div className="card-header">
//           <h2>New Customers</h2>
//           <button>See all <span className="fas fa-arrow-right"></span></button>
//         </div>
//         {users.length > 0 ? (
//       users.map((user, index) => (
//         <div className="card-body"key={index}>
//           <CustomerCard name={user.username} position={user.role} image={<img src={user.image_link} alt={user.username}/> }/>
//         </div>
//       ))
//       ) : (
//         <p>Loading data....</p>
//       )
//     }
//       </div>
//     </div>
//     </div>

//       <div className={`icerik ${isSidebarOpen ? "" : "small"}`}>
//         <div className="ust"></div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
//         {(searchTerm.trim() === "" ? products : filteredProducts).slice(0, 16).map((product) => (

//             <div className="boxfarmer" key={product.product_id}>
//               <img
//                 src={product.image_link}
//                 alt={product.product_name}
//                 className="object-cover rounded-md border border-gray-300 h-48 w-full"
//               />
//               <div className="des">
//                 Description: {product.description}<br/>
//               </div>
//               <button className="btn-9"onClick={() => handleDeleteProduct(product.product_id)}>
//                Delete Product
//              </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default FarmerDashboard;

