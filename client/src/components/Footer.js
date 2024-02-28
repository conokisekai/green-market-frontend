// Import Tailwind CSS classes in your component file
import React from 'react';
import './footer.css'; // Assuming footer.css is in the same directory as this component
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="footer-container">
      <div className="flex space-between">
        <div className="mr-4">
          <b>Company <br/></b>
          About us<br/>
          Why Choose US<br/>
          Pricing <br/>
          Testimonial
        </div>
        <div className="mr-4">
          <b>Resources</b><br/>
          Privacy Policy<br/>
          Terms and Condition<br/>
          Blog<br/>
          Contact Us
        </div>
        <div>
          <b>Product</b><br/>
          Project management<br/>
          Time tracker<br/>
          Time schedule<br/>
          Lead generate<br/>
          Remote Collaboration
        </div>
        <div className="mr-10">
        <div className="weekly-schedule">
          <div className="calendar">
            <div className="day-and-activity activity-one flex">
              <div className="activity mr-4">
                <h2>Customers</h2>
                <div className="participants flex">
                  {/* Replaced image URLs */}
                  <img className="w-8 h-8 rounded-full mr-2" src="https://avatars.githubusercontent.com/u/144029137?v=4" alt="" />
                  <img className="w-8 h-8 rounded-full mr-2" src="https://avatars.githubusercontent.com/u/7009215?v=4" alt="" />
                  <img className="w-8 h-8 rounded-full mr-2" src="https://avatars.githubusercontent.com/u/143500646?v=4" alt="" />
                  <img className="w-8 h-8 rounded-full mr-2" src="https://avatars.githubusercontent.com/u/70768898?v=4" alt="" />
                </div>
              </div>
              <button className="btn"><Link to="/usersignup">Join</Link></button>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
}


export default Footer;





// Company
// Resources
// Product
// Site Title
// About Us
// Privacy Policy
// Project managment
// Why Choose us
// Terms and Condition
// Time tracker
// Subscribe to our Newsletter
// Pricing
// Blog
// Time schedule
// Testimonial
// Contact Us
// Lead generate
// Enter your Email

// Remote Collaboration