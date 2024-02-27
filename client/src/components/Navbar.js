import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog ,FaUser } from 'react-icons/fa';
import './Navbar.css';  // Import the separate CSS file

function Navbar() {
  return (
    <div className='navbard'>
      <nav className="navbar">
      <Link to="/homepage">Home</Link>
      <Link to="/usersignup">Signup & Login</Link>
        <Link to="/products">Products</Link>
        <Link to="/farmerdashboard">FarmerDashboard</Link>
        <Link to="/users">Users</Link>
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

