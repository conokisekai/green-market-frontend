
import React, { useState,useEffect } from "react";
import "./farmerDashboard.css";
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

function FarmerDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [slides, setSlides] = useState([
    {
      imageUrl:
        "https://i.pinimg.com/originals/28/d1/e2/28d1e28d41cb6ef0ee7d301441433c36.gif",
      title: "Laurence Ipsen",
      description: "",
    },
    {
      imageUrl:
        "https://i.pinimg.com/originals/59/a5/a0/59a5a0ca931fe2db6756cd7f9fb1fec5.gif",
      title: "Lorem ipsum 2",
      description: "",
    },
    {
      imageUrl:
        "https://i.pinimg.com/originals/b0/aa/3a/b0aa3ac0c38ff1174cdef4ced5d8a5c3.gif",
      title: "Lorem ipsum 3",
      description: "",
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])

  useEffect(() => {
    fetch("/get_all_products")
      .then((response) => response.json())
      .then((data) => {setProducts(data.products)
     
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
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Adjust the interval time (in milliseconds) here

    return () => clearInterval(autoSlideInterval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const updateSlideNav = (index) => {
    setCurrentSlideIndex(index);
  };


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <input type="checkbox" id="mobilmenu" />
      <div className="farmertop">
      <div className="searchfarmerproduct">
      <SearchBar onSearch={handleSearch} products={products}/>
      </div>
        <div className="menufarmer">
          <ul className="flex">
            <li className="mr-4">
              <i className="fa-regular fa-heart"></i>
            </li>
            <li className="facebook">
              <i className="fas fa-watsup"></i>
            </li>
            <li className="mr-4">
              <i className="fa-solid fa-pipe"></i>
            </li>
            <li className="mr-4">
              <i className="fas fa-shopping-cart"></i>
            </li>
            <li className="mr-4">
              <i className="fas fa-user"></i>
            </li>
          </ul>
        </div>
    </div>
  <div>
    <div className="farmer">
         <h3 >Farmer dashboard</h3>
    </div>
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlideIndex ? "active" : ""}`}
        >
          <img src={slide.imageUrl} alt=" Description" />
          <h2 className="slide-title">{slide.title}</h2>
          <p className="slide-desc">{slide.description}</p>
        </div>
      ))}
      <button className="arrow prev" onClick={prevSlide}>
        Prev
      </button>
      <button className="arrow next" onClick={nextSlide}>
        Next
      </button>
      <ul className="slide-nav">
        {slides.map((slide, index) => (
          <li
            key={index}
            className={`nav-item ${
              index === currentSlideIndex ? "item-active" : ""
            }`}
            onClick={() => updateSlideNav(index)}
          ></li>
        ))}
      </ul>
    </div>

  </div>

      <div className="flex">
      <div>
        <div className="bg-navy text-white rounded-l-lg p-4">
          <div className={`sidebar ${isSidebarOpen ? "" : "small"}`}>
            <div className="text-6xl font-bold">Agri-Soko </div>
            <Link to="/dashboard">Dashboard</Link><br/>
            <Link to="/cart">My Orders</Link><br/>
            <Link to="/explore">Explore</Link><br/>
            <Link to="/produce">Featured Products</Link><br/>
            Settings<br/>
            <Link to="/settings">Settings</Link><br/>
            <Link to="/chat">Your Chats</Link><br/>
            <Link to="/produce">Trends</Link><br/>
            <Link to="/contact">Contact</Link><br/>
            <Link to="/billing">Billing</Link><br/>
            <Link to="/profile">My Profile</Link>
          </div>
        </div>
        <div className="customers">
      <div className="card">
        <div className="card-header">
          <h2>New Customers</h2>
          <button>See all <span className="fas fa-arrow-right"></span></button>
        </div>
        <div className="card-body">
          <CustomerCard name="Malik Abushabab" position="CEO" image="https://bit.ly/3bvT89p" />
          <CustomerCard name="John Doe" position="Manager" image="https://bit.ly/3bvT89p" />
          <CustomerCard name="Jane Smith" position="Designer" image="https://bit.ly/3bvT89p" />
          {/* Add more CustomerCard components for additional customers */}
        </div>
      </div>
    </div>
      </div>

      <div className={`icerik ${isSidebarOpen ? "" : "small"}`}>
        <div className="ust"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {(searchTerm.trim() === "" ? products : filteredProducts).slice(0, 16).map((product) => (
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
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default FarmerDashboard;
