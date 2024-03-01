import React, { useState } from "react";
import "./resetpassword.css";
import Newpass from "./NewPassword";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setShowNewPass(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className="container">
      <div align="center" className="form-h">
        <div align="center">
          <img
            className="img-1"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS785biEGWYfQ3kCbvts_QRuNPn7IJpvovN4A&usqp=CAU"
            width="100px"
            alt="Logo"
          />
          <h3 className="heading">Reset Password</h3>
          <p className="instructions">
            An OTP will be sent to your email address for verification
          </p>
        </div>
        {!showNewPass ? (
          <form onSubmit={handleSubmit}>
            <div align="center">
              <input
                className="mobile"
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div align="center">
              <button type="submit" className="btn-otp">
                SEND TOKEN
              </button>
            </div>
          </form>
        ) : (
          <Newpass email={email} />
        )}
        <div align="center">
          <hr />
          {message && <span>{message}</span>}
          {error && <span>{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

