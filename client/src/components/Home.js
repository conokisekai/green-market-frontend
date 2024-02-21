// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-green-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Welcome to Our Market</h1>
        <div className="space-x-4">
        <Link to="/products">Prodece</Link>
        <Link to="/farmerdashboard">FarmerDashboard</Link>
          <Link to="/usersignup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Signup as User
          </Link> 
          <Link to="/chat" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Chat
          </Link> {/* Add a link to the Chat page */}
        </div>
      </div>
    </div>
  );
}

export default Home;


