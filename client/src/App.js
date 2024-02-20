// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import Home from './components/Home';
import Chat from './components/Chat'; // Import the Chat component

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route path="/chat" element={<Chat />} /> {/* Add a route for the Chat component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;


