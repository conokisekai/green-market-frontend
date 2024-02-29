import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUser } from 'react-icons/fa';
import './Navbar.css';  // Import the separate CSS file

function Navbar({ role }) {
  console.log(role);

  return (
    <div className='navbard'>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/usersignup">Signup & Login</Link>
        <Link to="/products">Products</Link>
        {role === 'Seller' ? (
          <Link to="/farmerdashboard">Seller dashboard</Link>
        ) : (
          <span onClick={() => alert("Sign in as a Seller to view or sign up to get a seller account only if you have products to sell")}>
            <a href="#/">Seller dashboard</a>
          </span>
        )}

        <Link to="/settings">
          <FaCog className="inline-block" style={{ fontSize: '18px', color: '#fff' }} />
          Settings
        </Link>

        <li className="mr-4">
          <Link to="/userprofile"><FaUser style={{ fontSize: '18px', color: '#fff' }} /></Link>
        </li>
      </nav>
    </div>
  );
}

export default Navbar;


