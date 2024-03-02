import React, { useEffect } from 'react';
import './otpverification.css';

function App() {
  useEffect(() => {
    const inputFields = document.querySelectorAll("input.field");

    inputFields.forEach((field, index) => {
      field.addEventListener("input", handleInput);
      field.addEventListener("keydown", handleKeyDown);
      field.index = index;
    });

    return () => {
      inputFields.forEach((field) => {
        field.removeEventListener("input", handleInput);
        field.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, []);

  function handleInput(e) {
    let inputField = e.target;
    if (inputField.value.length >= 1) {
      let nextField = inputField.nextElementSibling;
      return nextField && nextField.focus();
    }
  }

  function handleKeyDown(e) {
    let inputField = e.target;
    if (e.keyCode === 8 && inputField.value.length === 0) {
      let previousField = inputField.previousElementSibling;
      return previousField && previousField.focus();
    }
  }

  return (
    <div className="container">
      <h3 className="title">OTP Verification</h3>
      <p className="sub-title">
        Enter the OTP you received to
        <span className="phone-number">+254-712-764-067</span>
      </p>
      <div className="wrapper">
        <input type="text" className="field 1" maxLength="1" />
        <input type="text" className="field 2" maxLength="1" />
        <input type="text" className="field 3" maxLength="1" />
        <input type="text" className="field 4" maxLength="1" />
        <input type="text" className="field 5" maxLength="1" />
        <input type="text" className="field 6" maxLength="1" />
      </div>
      <div className="right-side-content">
        <button className="resend">
          Resend OTP
          <i className="fa fa-caret-right"></i>
        </button>
        <img
          src="https://images.sftcdn.net/images/t_app-icon-s/p/60aae1f5-07b5-4ab1-9961-9248d0103c8b/2731256096/blue-vpn-free-unlimited-bandwidth-logo"
          alt=""
        />
      </div>
    </div>
  );
}

export default App;

// // OTPVerification.jsx

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function OTPVerification({ setIsOtpCorrect, otpRequestId, userData }) {
//   const [enteredOtp, setEnteredOtp] = useState('');
//   const navigate = useNavigate();

//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/notify_otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           otp_request_id: otpRequestId,
//           entered_otp: enteredOtp,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         if (data.is_otp_correct) {
//           setIsOtpCorrect(true);

//           // Redirect to UserSignUp page after OTP is correct
//           navigate("/usersignup");
//         } else {
//           console.error("Incorrect OTP");
//         }
//       } else {
//         console.error("Server Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Client Error:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleOTPSubmit}>
//         <h1>Enter OTP</h1>
//         <input type="text" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />
//         <button type="submit">Verify OTP</button>
//       </form>
//     </div>
//   );
// }

// export default OTPVerification;
