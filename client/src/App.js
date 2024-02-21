// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import Home from './components/Home';
import Chat from './components/Chat'; // Import the Chat component
import Products from './components/Products';
import Product from './components/Product';
import FarmerDashboard from './components/FarmerDashboard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route path="/chat" element={<Chat />} /> {/* Add a route for the Chat component */}
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:product_id" element={<Product/>}/>
          <Route path = "/farmerdashboard" element={<FarmerDashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


