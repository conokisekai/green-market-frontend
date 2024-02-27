import React, { useState, useEffect } from 'react';
import './users.css';


const Users = ({users,error}) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {users.length > 0 ? (
        users.map((user, index) => (
          <div className="users-container" key={index}>
            <span className="pro">{user.role}</span>
            <div className="search-wrapper">
                <img src={user.image_link} alt={user.username} />
            </div>
            <h3>{user.username}</h3>
            <h6>Email: {user.email}</h6>
            <h6>Phone: {user.phone}</h6>
            <h6>Address: {user.address}</h6>
            <label className='online'>
              <input type="checkbox" id={`online-status-${index}`} />
              <span>Online</span>
            </label>
          </div>
        ))
      ) : (
        <p>Loading user data...</p>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Users;

