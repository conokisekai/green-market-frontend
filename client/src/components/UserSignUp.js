import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import "../App.css";

function UserSignUp({ setUserId }) {
  const [signUpGoogleProfile, setSignUpGoogleProfile] = useState(null);
  const [signInGoogleProfile, setSignInGoogleProfile] = useState(null);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    signUpName: "",
    signUpEmail: "",
    signUpPhone: "",
    signUpAddress: "",
    signUpPassword: "",
    signUpRole: "buyer", // Default role is set to buyer
    signInIdentifier: "",
    signInPassword: "",
  });

  const googleClientId = "262976602163-i4rjgosbuss6fcahbbb4oh0qqn5b6672.apps.googleusercontent.com";

  const handleSignUpGoogleSuccess = (response) => {
    console.log("Google Sign Up Success:", response);
    setSignUpGoogleProfile(response.profileObj);
  };

  const handleSignInGoogleSuccess = (response) => {
    console.log("Google Sign In Success:", response);
    setSignInGoogleProfile(response.profileObj);
  };

  const googleOnFailure = (error) => {
    console.error("Google Login Failure:", error);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/user_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
            <h1>Create Account as User</h1>
            <div className="social-container">
              <GoogleLogin
                clientId={googleClientId}
                buttonText="Sign Up with Google"
                onSuccess={handleSignUpGoogleSuccess}
                onFailure={googleOnFailure}
                cookiePolicy={"single_host_origin"}
                className="google-login-btn"
              />

              {signUpGoogleProfile && (
                <div>
                  <h2>Google Profile</h2>
                  <pre>{JSON.stringify(signUpGoogleProfile, null, 2)}</pre>
                </div>
              )}
            </div>
            <span>or use your email for registration</span>
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
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign in as User</h1>
            <div className="social-container">
              <GoogleLogin
                clientId={googleClientId}
                buttonText="Sign In with Google"
                onSuccess={handleSignInGoogleSuccess}
                onFailure={googleOnFailure}
                cookiePolicy={"single_host_origin"}
                className="google-login-btn"
              />

              {signInGoogleProfile && (
                <div>
                  <h2>Google Profile</h2>
                  <pre>{JSON.stringify(signInGoogleProfile, null, 2)}</pre>
                </div>
              )}
            </div>
            <span>or use your account</span>
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
