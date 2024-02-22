// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import Home from './components/Home';
import Chat from './components/Chat'; // Import the Chat component
import Products from './components/Products';
import Product from './components/Product';
import FarmerDashboard from './components/FarmerDashboard';
import FarmerProductForm from './components/FarmerProductForm';
import Cart from './components/Cart';

function App() {
  const[userId , setUserId] = useState(null);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/usersignup" element={<UserSignUp setUserId={setUserId} />} />
          <Route path="/chat" element={<Chat />} /> {/* Add a route for the Chat component */}
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:product_id" element={<Product userId={userId}/>}/>
          <Route path = "/farmerdashboard" element={<FarmerDashboard userId={userId}/>} />
          <Route path = "/farmerproductform" element={<FarmerProductForm userId={userId}/>} />
          <Route path = "/cart" element={<Cart  userId={userId}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


