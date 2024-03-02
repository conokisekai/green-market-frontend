import React, { useState,useEffect } from "react";
import { useNavigate ,Link} from "react-router-dom";
import "../App.css";

function UserSignUp({ setUserId ,setRole }) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    signUpImage: "",
    signUpImageUrl: "",
    signUpName: "",
    signUpEmail: "",
    signUpPhone: "",
    signUpAddress: "",
    signUpPassword: "",
    signUpRole: "buyer",
    signInIdentifier: "",
    signInPassword: "",
    imageSource: "upload",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const dataUrl = reader.result;
        setFormData({ ...formData, signUpImage: dataUrl, signUpImageUrl: "" });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageSourceChange = (e) => {
    setFormData({ ...formData, imageSource: e.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageLink = formData.imageSource === "upload" ? formData.signUpImage : formData.signUpImageUrl;
      const response = await fetch("/user_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_link: imageLink,
          username: formData.signUpName,
          email: formData.signUpEmail,
          phone: formData.signUpPhone,
          address: formData.signUpAddress,
          password: formData.signUpPassword,
          role: formData.signUpRole,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Server Error:", response.statusText);
      }
    } catch (error) {
      console.error("Client Error:", error);
    }
  };
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/user_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.signInPassword,
          [formData.signInIdentifier.includes('@')
          ? 'email'
          : formData.signInIdentifier.match(/^\d+$/) 
          ? 'phone'
          : 'username']: formData.signInIdentifier, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Ensure that data.user_id is not undefined or null
        if (data.user_id != null) {
          setUserId(data.user_id);
          setRole(data.role);
          console.log('Welcome to Agri-soko');
          console.log(data.role);
          console.log(data.user_id)

          if (data.role === 'Seller') {
            navigate(`/farmerdashboard`);
          }
          else if (data.role === 'admin') {
            navigate(`/admin`);
          }else(navigate('/products'));
        } else {
          console.error("User ID is not defined in the response:", data);
        }
      } else {
        console.error("Server Error:", response.statusText);
      }
    } catch (error) {
      console.error("Client Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    // No need for event listeners in React
  }, []);


  return (
    <div className="overal">
<div className="center-container">
      </div>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <select value={formData.imageSource} onChange={handleImageSourceChange}>
              <option value="upload">Upload Image</option>
              <option value="url">Image URL</option>
            </select>
            {formData.imageSource === "upload" && (
              <input type="file" onChange={handleFileUpload} />
            )}
            {formData.imageSource === "url" && (
              <input
                type="text"
                placeholder="Image URL"
                value={formData.signUpImageUrl}
                onChange={(e) => setFormData({ ...formData, signUpImageUrl: e.target.value })}
              />
            )}
            <input
              type="text"
              placeholder="Name"
              name="signUpName"
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="signUpEmail"
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="signUpPhone"
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Address"
              name="signUpAddress"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="signUpPassword"
              onChange={handleInputChange}
            />
            <select
              name="signUpRole"
              value={formData.signUpRole}
              onChange={handleInputChange}
              className="mt-3 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Farmer/Seller</option>
            </select>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign in </h1>
            <input
              type="text"
              placeholder="Username, Email, or Phone Number"
              name="signInIdentifier"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="signInPassword"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <Link to="/resetpassword">Reset Password</Link>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => document.getElementById("container").classList.remove("right-panel-active")}>
                <button className="btn-9 bg-white">Sign In</button>
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" id="signUp" onClick={() => document.getElementById("container").classList.add("right-panel-active")}>
               <button className="btn-9 bg-white">Sign Up</button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignUp;


// // UserSignUp.jsx

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import OTPVerification from "./OTPVerification"; // Import your OTP verification component
// import "../App.css";

// function UserSignUp({ setUserId, setRole }) {
//   let navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     signUpImage: "",
//     signUpImageUrl: "",
//     signUpName: "",
//     signUpEmail: "",
//     signUpPhone: "",
//     signUpAddress: "",
//     signUpPassword: "",
//     signUpRole: "buyer",
//     signInIdentifier: "",
//     signInPassword: "",
//     imageSource: "upload",
//     otp: "",
//   });

//   const [isOtpCorrect, setIsOtpCorrect] = useState(false);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const dataUrl = reader.result;
//         setFormData({ ...formData, signUpImage: dataUrl, signUpImageUrl: "" });
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageSourceChange = (e) => {
//     setFormData({ ...formData, imageSource: e.target.value });
//   };

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();

//     if (isOtpCorrect) {
//       try {
//         const imageLink = formData.imageSource === "upload" ? formData.signUpImage : formData.signUpImageUrl;
//         const response = await fetch("/user_signup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             image_link: imageLink,
//             username: formData.signUpName,
//             email: formData.signUpEmail,
//             phone: formData.signUpPhone,
//             address: formData.signUpAddress,
//             password: formData.signUpPassword,
//             role: formData.signUpRole,
//           }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//         } else {
//           console.error("Server Error:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Client Error:", error);
//       }
//     } else {
//       // Redirect to OTP verification page
//       navigate("/otp");
//     }
//   };

//   const handleSignInSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/user_login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           password: formData.signInPassword,
//           [formData.signInIdentifier.includes('@')
//           ? 'email'
//           : formData.signInIdentifier.match(/^\d+$/) 
//           ? 'phone'
//           : 'username']: formData.signInIdentifier, 
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);

//         // Ensure that data.user_id is not undefined or null
//         if (data.user_id != null) {
//           setUserId(data.user_id);
//           setRole(data.role);
//           console.log('Welcome to Agri-soko');
//           console.log(data.role);
//           console.log(data.user_id)

//           if (data.role === 'Seller') {
//             navigate(`/farmerdashboard`);
//           }
//           else if (data.role === 'admin') {
//             navigate(`/admin`);
//           }else(navigate('/products'));
//         } else {
//           console.error("User ID is not defined in the response:", data);
//         }
//       } else {
//         console.error("Server Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Client Error:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   useEffect(() => {
//     // No need for event listeners in React
//   }, []);

//   return (
//     <div className="overal">
//       <div className="center-container">{/* ... (existing code) */}</div>
//       <div className="container" id="container">
//         <div className="form-container sign-up-container">
//           <form onSubmit={handleSignUpSubmit}>
//             <h1>Create Account</h1>
//             <select value={formData.imageSource} onChange={handleImageSourceChange}>
//               <option value="upload">Upload Image</option>
//               <option value="url">Image URL</option>
//             </select>
//             {formData.imageSource === "upload" && <input type="file" onChange={handleFileUpload} />}
//             {formData.imageSource === "url" && (
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 value={formData.signUpImageUrl}
//                 onChange={(e) => setFormData({ ...formData, signUpImageUrl: e.target.value })}
//               />
//             )}
//             <input type="text" placeholder="Name" name="signUpName" onChange={handleInputChange} />
//             <input type="email" placeholder="Email" name="signUpEmail" onChange={handleInputChange} />
//             <input type="text" placeholder="Phone Number" name="signUpPhone" onChange={handleInputChange} />
//             <input type="text" placeholder="Address" name="signUpAddress" onChange={handleInputChange} />
//             <input type="password" placeholder="Password" name="signUpPassword" onChange={handleInputChange} />
//             <select
//               name="signUpRole"
//               value={formData.signUpRole}
//               onChange={handleInputChange}
//               className="mt-3 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//             >
//               <option value="Buyer">Buyer</option>
//               <option value="Seller">Farmer/Seller</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               name="otp"
//               value={formData.otp}
//               onChange={handleInputChange}
//             />
//             <button
//               type="submit"
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               {isOtpCorrect ? "Sign Up" : "Verify OTP"}
//             </button>
//           </form>
//         </div>
//         <div className="form-container sign-in-container">
//           <form onSubmit={handleSignInSubmit}>
//             <h1>Sign in </h1>
//             <input
//               type="text"
//               placeholder="Username, Email, or Phone Number"
//               name="signInIdentifier"
//               onChange={handleInputChange}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="signInPassword"
//               onChange={handleInputChange}
//             />
//             <button
//               type="submit"
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign In
//             </button>
//             <Link to="/resetpassword">Reset Password</Link>
//           </form>
//         </div>
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-panel overlay-left">
//               <h1>Welcome Back!</h1>
//               <p>To keep connected with us please login with your personal info</p>
//               <button
//                 className="ghost"
//                 id="signIn"
//                 onClick={() => document.getElementById("container").classList.remove("right-panel-active")}
//               >
//                 <button className="btn-9">Sign In</button>
//               </button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start the journey with us</p>
//               <button
//                 className="ghost"
//                 id="signUp"
//                 onClick={() => document.getElementById("container").classList.add("right-panel-active")}
//               >
//                 <button className="btn-9">Sign Up</button>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserSignUp;


