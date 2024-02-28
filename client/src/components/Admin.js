import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ fontSize: '36px', fontFamily: 'Romantimes', marginTop: '10px' }}>
            <b>Welcome Our Dear Administrator</b>
        </div>
        <div>
            What would you like to view today 
        </div>
      <div style={{ margin: '10px', fontSize: '20px' }}>
        <Link to="/users" style={{ margin: '10px', fontSize: '20px' }}>Users</Link>
        <Link to="/allproducts" style={{ margin: '10px', fontSize: '20px' }}>Products</Link>
      </div>
      <div>
      click to view 
      </div>
    </div>
  );
}

export default Admin;

