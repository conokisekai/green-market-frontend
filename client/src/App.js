
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import Products from './components/Products';
import Product from './components/Product';
import FarmerDashboard from './components/FarmerDashboard';
import FarmerProductForm from './components/FarmerProductForm';
import Cart from './components/Cart';
import UserProfile from './components/UserProfile';
import OTPVerification from './components/OTPVerification';
import ResetPassword from './components/ResetPassword';
import Settings from './components/Settings';
import Users from './components/Users';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Checkout from './components/Checkout';
function App() {
  const [users,setUsers]=useState([])
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const[role,setRole]=useState("All");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve dark mode preference from localStorage or use false as default
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch('/admin/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          console.log(data)
        } else {
          console.error('Server Error:', response.statusText);
          setError('Error fetching user list. Please try again.');
        }
      } catch (error) {
        console.error('Client Error:', error);
        setError('Error fetching user list. Please try again.');
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    // Apply or remove dark mode class on body based on isDarkMode state
    document.body.classList.toggle('dark-mode', isDarkMode);

    // Save dark mode preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className={`page ${isDarkMode ? 'dark-mode' : ''}`}>


      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/usersignup" element={<UserSignUp setUserId={setUserId} setRole={setRole}/>} />
          <Route path="/users" element={<Users setUsers={setUsers} users={users} error={error}/>} />
          <Route path="/homepage" element={<HomePage/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/settings" element={<Settings toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>} />
          <Route path="/products" element={<Products role={role} users={users}/>} />
          <Route path="/products/:product_id" element={<Product userId={userId} />} />
          <Route path="/farmerdashboard" element={<FarmerDashboard userId={userId} role={role} users={users}/>} />
          <Route path="/farmerproductform" element={<FarmerProductForm userId={userId} />} />
          <Route path="/cart" element={<Cart userId={userId} />} />
          <Route path="/userprofile" element={<UserProfile userId={userId}/>} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;



