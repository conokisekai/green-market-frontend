import React from "react";
import "./homepage.css"
import { Link } from 'react-router-dom';


function HomePage(props){
  return (
<div className="homepage">
<div className="space-x-4">
        <Link to="/products">Prodece</Link>
        <Link to="/farmerdashboard">FarmerDashboard</Link>
          <Link to="/usersignup">
            Signup  & Login
          </Link> 
          <Link to="/users" >
            Users
          </Link> 
          <Link to="/homepage" >
            Home
          </Link> 


        </div>
</div>
  );
};
export default HomePage



// <div id="about">
// <div className="container">
//   <div className="row">
//     <div className="col-xs-12 col-md-6">
//       {" "}
//       <img src="./polly.jpg" className="img-responsive" alt="" />{" "}
//     </div>
//     <div className="col-xs-12 col-md-6">
//       <div className="about-text">
//         <h2>About Us</h2>
//         <p>{props.data ? props.data.paragraph : "loading..."}</p>
//         <h3>Why Choose Us?</h3>
//         <div className="list-style">
//           <div className="col-lg-6 col-sm-6 col-xs-12">
//             <ul>
//               {props.data
//                 ? props.data.Why.map((d, i) => (
//                     <li key={`${d}-${i}`}>{d}</li>
//                   ))
//                 : "loading"}
//             </ul>
//           </div>
//           <div className="col-lg-6 col-sm-6 col-xs-12">
//             <ul>
//               {props.data
//                 ? props.data.Why2.map((d, i) => (
//                     <li key={`${d}-${i}`}> {d}</li>
//                   ))
//                 : "loading"}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>