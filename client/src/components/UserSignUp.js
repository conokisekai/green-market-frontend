import React, { useEffect, useState } from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GoogleLogin } from "react-google-login";

function UserSignUp() {
  const [signUpGoogleProfile, setSignUpGoogleProfile] = useState(null);
  const [signInGoogleProfile, setSignInGoogleProfile] = useState(null);
  const [formData, setFormData] = useState({
    signUpName: "",
    signUpEmail: "",
    signUpPhone: "",
    signUpAddress: "",
    signUpPassword: "",
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
          role: "user", // Ensure the role is specified
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
          // Adapt to send the correct login identifier (username, email, or phone)
          [formData.signInIdentifier.includes('@') ? 'email' : 'phone']: formData.signInIdentifier,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log('Welcome to Agri-soko');
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
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    // Cleanup function to remove event listeners
    return () => {
      signUpButton.removeEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      signInButton.removeEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    };
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
            <button type="submit">Sign Up</button>
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
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" id="signUp">
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
