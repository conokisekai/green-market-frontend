import React from 'react';
import './resetpassword.css'; // Import your CSS file

const ResetPassword = () => {
  return (
    <div align="center" className="form-h">
      <div align="center">
        <img className="img-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS785biEGWYfQ3kCbvts_QRuNPn7IJpvovN4A&usqp=CAU" width="100px" alt="Logo" />
        <h3 className="heading">Reset Password</h3>
        <p className="instructions">An OTP will be sent to your mobile number for verification</p>
      </div>
      <form action="" method="post">
        <div align="center">
          <input className="mobile" type="default" name="" placeholder="Enter Your Email Address" id="" />
        </div>
        <div align="center">
          <a href="">
            <button className="btn-otp">SEND TOKEN</button>
          </a>
        </div>
      </form>
      <div align="center">
        <hr />
        <span> </span>
      </div>
    </div>
  );
};

export default ResetPassword;
