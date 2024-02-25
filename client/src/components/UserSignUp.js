import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function UserSignUp({ setUserId }) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    signUpImage:"",
    signUpName: "",
    signUpEmail: "",
    signUpPhone: "",
    signUpAddress: "",
    signUpPassword: "",
    signUpRole: "buyer", // Default role is set to buyer
    signInIdentifier: "",
    signInPassword: "",
  });

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/user_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_link:formData.signUpImage,
          username: formData.signUpName,
          email: formData.signUpEmail,
          phone: formData.signUpPhone,
          address: formData.signUpAddress,
          password: formData.signUpPassword,
          role: formData.signUpRole, // Include the selected role in the request
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
          [formData.signInIdentifier.includes('@') ? 'email' : 'phone']: formData.signInIdentifier,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Ensure that data.user_id is not undefined or null
        if (data.user_id != null) {
          setUserId(data.user_id);
          console.log('Welcome to Agri-soko');
          console.log(data.role);
          console.log(data.user_id)

          if (data.role === 'farmer') {
            navigate(`/farmerdashboard`);
            setUserId(data.user_id);
          } else {
            navigate(`/products`);
          }
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
    <>
      <div className="center-container">
        <h1>AGRI-SOKO</h1>
      </div>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Profile Picture"
              name="signUpImage"
              onChange={handleInputChange}
            />
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
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <Link to="/resetpassword">Reset Password</Link>
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
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" id="signUp" onClick={() => document.getElementById("container").classList.add("right-panel-active")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignUp;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function UserSignUp({ setUserId }) {
//   const [imageLinkType, setImageLinkType] = useState("link");
//   const [imageLink, setImageLink] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     signUpName: "",
//     signUpEmail: "",
//     signUpPhone: "",
//     signUpAddress: "",
//     signUpPassword: "",
//     signUpRole: "buyer",
//     signInIdentifier: "",
//     signInPassword: "",
//   });

//   const googleClientId = "262976602163-i4rjgosbuss6fcahbbb4oh0qqn5b6672.apps.googleusercontent.com";

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/user_signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           imageLink: imageLinkType === "link" ? imageLink : null,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);

//         if (data.user_id != null) {
//           setUserId(data.user_id);

//           if (data.role === "farmer") {
//             navigate(`/farmerdashboard`);
//           } else {
//             navigate(`/products`);
//           }
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
//           [formData.signInIdentifier.includes('@') ? 'email' : 'phone']: formData.signInIdentifier,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);

//         // Ensure that data.user_id is not undefined or null
//         if (data.user_id != null) {
//           setUserId(data.user_id);
//           console.log('Welcome to Agri-soko');
//           console.log(data.role);
//           console.log(data.user_id)

//           if (data.role === 'farmer') {
//             navigate(`/farmerdashboard`);
//             setUserId(data.user_id);
//           } else {
//             navigate(`/products`);
//           }
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
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   function handleFileUpload(e) {
//     const file = e.target.files[0];

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         // FileReader has successfully read the file
//         const dataUrl = reader.result;
//         setImageLink(dataUrl);
//       };

//       reader.readAsDataURL(file);
//     } else {
//       // Clear the image_link state if an invalid file is selected
//       setImageLink("");
//       setError("Please select a valid image file.");
//     }
//   }

//   const getImageInput = () => {
//     if (imageLinkType === "link") {
//       return (
//         <div className="form-group">
//           <label htmlFor="image_link">Image Link</label>
//           <input
//             type="text"
//             className="form-control transparent-input"
//             id="image_link"
//             value={imageLink}
//             onChange={(e) => setImageLink(e.target.value)}
//             placeholder="image_link"
//             required
//           />
//         </div>
//       );
//     } else if (imageLinkType === "file") {
//       return (
//         <div className="form-group">
//           <label htmlFor="imageUpload">Upload Image</label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="imageUpload"
//             onChange={(e) => handleFileUpload(e)}
//             accept="image/*"
//             required
//           />
//           {error && <p className="error-message">{error}</p>}
//         </div>
//       );
//     }
//   };

//   return (
//     <>
//       <div className="center-container">
//         <h1>AGRI-SOKO</h1>
//       </div>
//       <div className="container" id="container">
//         <div className="form-container sign-up-container">
//           <form onSubmit={handleSignUpSubmit}>
//             <h1>Create Account</h1>
//             <div className="form-group">
//               <label htmlFor="imageLinkType">Image Link Type</label>
//               <select
//                 className="form-control"
//                 id="imageLinkType"
//                 value={imageLinkType}
//                 onChange={(e) => {
//                   setImageLinkType(e.target.value);
//                   setImageLink("");
//                 }}
//               >
//                 <option value="link">Link</option>
//                 <option value="file">File Upload</option>
//               </select>
//             </div>

//             {getImageInput()}
//             <input
//               type="text"
//               placeholder="Name"
//               name="signUpName"
//               onChange={handleInputChange}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               name="signUpEmail"
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               placeholder="Phone Number"
//               name="signUpPhone"
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               name="signUpAddress"
//               onChange={handleInputChange}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="signUpPassword"
//               onChange={handleInputChange}
//             />
//             <select
//               name="signUpRole"
//               value={formData.signUpRole}
//               onChange={handleInputChange}
//               className="mt-3 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//             >
//               <option value="buyer">Buyer</option>
//               <option value="farmer">Farmer</option>
//             </select>
//             <button
//               type="submit"
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign Up
//             </button>
//             <Link to="/resetpassword">Reset Password</Link>
//           </form>
//         </div>
//         <div className="form-container sign-in-container">
//           <form onSubmit={handleSignInSubmit}>
//             <h1>Sign in as User</h1>
//             <span>or use your account</span>
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
//               <button className="ghost" id="signIn" onClick={() => document.getElementById("container").classList.remove("right-panel-active")}>
//                 Sign In
//               </button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start the journey with us</p>
//               <button className="ghost" id="signUp" onClick={() => document.getElementById("container").classList.add("right-panel-active")}>
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserSignUp;


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
// import "../App.css";

// function UserSignUp({ setUserId }) {
//   const [signUpGoogleProfile, setSignUpGoogleProfile] = useState(null);
//   const [signInGoogleProfile, setSignInGoogleProfile] = useState(null);
//   let navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     signUpName: "",
//     signUpEmail: "",
//     signUpPhone: "",
//     signUpAddress: "",
//     signUpPassword: "",
//     signUpRole: "buyer", // Default role is set to buyer
//     signInIdentifier: "",
//     signInPassword: "",
//     signUpImageLink: "", // Added for image upload
//   });

//   const googleClientId = "262976602163-i4rjgosbuss6fcahbbb4oh0qqn5b6672.apps.googleusercontent.com";

//   const handleSignUpGoogleSuccess = (response) => {
//     console.log("Google Sign Up Success:", response);
//     setSignUpGoogleProfile(response.profileObj);
//   };

//   const handleSignInGoogleSuccess = (response) => {
//     console.log("Google Sign In Success:", response);
//     setSignInGoogleProfile(response.profileObj);
//   };

//   const googleOnFailure = (error) => {
//     console.error("Google Login Failure:", error);
//   };

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/user_signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: formData.signUpName,
//           email: formData.signUpEmail,
//           phone: formData.signUpPhone,
//           address: formData.signUpAddress,
//           password: formData.signUpPassword,
//           role: formData.signUpRole,
//           image_url: formData.signUpImageLink, // Added for image upload
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//       } else {
//         console.error("Server Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Client Error:", error);
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
//           [formData.signInIdentifier.includes('@') ? 'email' : 'phone']: formData.signInIdentifier,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);

//         // Ensure that data.user_id is not undefined or null
//         if (data.user_id != null) {
//           setUserId(data.user_id);
//           console.log('Welcome to Agri-soko');
//           console.log(data.role);
//           console.log(data.user_id)

//           if (data.role === 'farmer') {
//             navigate(`/farmerdashboard`);
//             setUserId(data.user_id);
//           } else {
//             navigate(`/products`);
//           }
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

//   const handleFileUpload = (e, field) => {
//     const file = e.target.files[0];

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         // FileReader has successfully read the file
//         const dataUrl = reader.result;
//         setFormData({
//           ...formData,
//           [field]: dataUrl,
//         });
//       };

//       reader.readAsDataURL(file);
//     } else {
//       // Clear the field state if an invalid file is selected
//       setFormData({
//         ...formData,
//         [field]: "",
//       });
//       console.error("Please select a valid image file.");
//     }
//   };

//   useEffect(() => {
//     // No need for event listeners in React
//   }, []);

//   return (
//     <>
//       <div className="center-container">
//         <h1>AGRI-SOKO</h1>
//       </div>
//       <div className="container" id="container">
//         <div className="form-container sign-up-container">
//           <form onSubmit={handleSignUpSubmit}>
//             <h1>Create Account</h1>
//             <input
//               type="text"
//               placeholder="Name"
//               name="signUpName"
//               onChange={handleInputChange}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               name="signUpEmail"
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               placeholder="Phone Number"
//               name="signUpPhone"
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               name="signUpAddress"
//               onChange={handleInputChange}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="signUpPassword"
//               onChange={handleInputChange}
//             />
//             <select
//               name="signUpRole"
//               value={formData.signUpRole}
//               onChange={handleInputChange}
//               className="mt-3 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//             >
//               <option value="buyer">Buyer</option>
//               <option value="farmer">Farmer</option>
//             </select>

//             {formData.signUpImageLink && (
//               <img
//                 src={formData.signUpImageLink}
//                 alt="User Avatar"
//                 style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//               />
//             )}
//             <div className="form-group">
//               <label htmlFor="signUpImage">Upload Image</label>
//               <input
//                 type="file"
//                 className="form-control-file"
//                 id="signUpImage"
//                 onChange={(e) => handleFileUpload(e, "signUpImageLink")}
//                 accept="image/*"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign Up
//             </button>
//             <Link to="/resetpassword">Reset Password</Link>
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
//               <button className="ghost" id="signIn" onClick={() => document.getElementById("container").classList.remove("right-panel-active")}>
//                 Sign In
//               </button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start the journey with us</p>
//               <button className="ghost" id="signUp" onClick={() => document.getElementById("container").classList.add("right-panel-active")}>
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserSignUp;