import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className="admin" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white' }}>
        <div style={{ fontSize: '70px', fontFamily: 'Romantimes', marginTop: '10px' }}>
            <b>Welcome Our Dear Administrator</b>
        </div>
        <div style={{ fontSize: '30px', marginTop: '10px' }}>
            What would you like to view today 
        </div>
      <div style={{ margin: '10px', fontSize: '35px' }}>
        <Link to="/users" style={{ margin: '10px', fontSize: '35px' , color: 'white' }}>Users</Link>
        <Link to="/allproducts" style={{ margin: '10px', fontSize: '35px' , color: 'white' }}>Products</Link>
      </div>
      <div style={{ margin: '10px', fontSize: '35px' }}>
      click to view 
      </div>
    </div>
  );
}

export default Admin;

