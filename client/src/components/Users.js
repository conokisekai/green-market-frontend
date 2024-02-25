
import React, { useState, useEffect } from 'react';
import './users.css';

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch('/users'); // Update the endpoint to match your backend route
        if (response.ok) {
          const data = await response.json();
          setUserList(data.users);
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {userList.map((user, index) => (
        <div className="users-container" key={index}>
          <span className="pro">{user.role}</span>
          <div className="search-wrapper">
            <label className="camera">
                <img src={user.image_link} alt={user.username}/>
            </label>
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
      ))}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Users;

