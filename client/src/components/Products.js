

import React, { useState,useEffect } from "react";
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import Page from "./ThemeSwitch";


import "./products.css";
import { Link } from "react-router-dom";
// import  logo from "./"
import SearchBar from "./SearchBar";

function CustomerCard(props) {
  return (
    <div className="customer">
      <div className="info">
        <img src={props.image} height="40px" width="40px" alt="customer" />
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

function Products({users}) {
  const [isSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])

  useEffect(() => {
    fetch("/get_all_products")
      .then((response) => response.json())
      .then((data) => {setProducts(data.products)
     console.log(data)
      })

      .catch((error) => console.error("Error fetching products:", error));
  }, []);

    const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() !== "") {
      const filteredProducts = products.filter((product) =>
        product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]);
    }
  };

  return (

    <div className="products">
      <div className="top">
      <div className="search">
        <SearchBar onSearch={handleSearch} products={products}/>
       </div>
       <div className="menu">
          <ul className="flex">
            <li className="mr-4">
              <Link to="/otp"><FaHeart style={{ fontSize: '24px', color: '#00ff00' }} /></Link>
            </li>

            <li className="mr-4">
             <Link to="/cart" ><FaShoppingCart style={{ fontSize: '24px', color: '#00ff00' }} /></Link>
            </li>
            <li className="mr-4">
             <Link to="/userprofile"><FaUser style={{ fontSize: '24px', color: '#00ff00' }} /></Link>
            </li>
          </ul>
        </div>

  </div>
  <div>
      </div>

      <div className="flex">
      <div className="sideContainer">
        <div className="sideuppcontainer">
        <div className="bg-navy text-white rounded-l-lg p-4">
          <div className={`sidebar ${isSidebarOpen ? "" : "small"}`}>
            <div className="text-6xl font-bold">Agri-Soko </div>
            <Link to="/cart">My Orders</Link><br/>
            <Link to="/settings">Settings</Link><br/>
            <Link to="/contact">Contact</Link><br/>
            <Link to="/billing">Billing</Link><br/>
            <Link to="/userprofile">My Profile</Link>
          </div>
        </div>
        </div>
        <div className="customers">
      <div className="card">
        <div className="card-header">
          <h2>New Customers</h2>
          <button>See all <span className="fas fa-arrow-right"></span></button>
        </div>

      {/* {users.slice(0, 4).map((user, index) => (
        <div className="card-body"key={index}>
          <CustomerCard name={user.username} position={user.role} image={<img src={user.image_link} alt={user.username}/> }/>
        </div>
      ))} */}
      </div>
    </div>
      </div>

      <div className={`icerik ${isSidebarOpen ? "" : "small"}`}>
        <div className="ust"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {(searchTerm.trim() === "" ? products : filteredProducts).slice(0, 16).map((product) => (
              <Link to={`/products/${product.product_id}`}>
            <div className="box" key={product.product_id}>
           
              <img
                src={product.image_link}
                alt={product.product_name}
                // className="object-cover border-radius-5 border-bottom-right-radius-60 h-160 w-full"
                className="object-cover rounded-md border border-gray-300 h-48 w-full"
              />
             
              <div className="des">
                Description: {product.description}

              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>   

  );
}

export default Products;







