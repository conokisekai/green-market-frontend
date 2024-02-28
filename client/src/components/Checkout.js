import React, { useState } from "react";
import "./checkout.css";

const Checkout = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^254\d{9}$/;
    if (!phone.match(phoneRegex)) {
      setErrorMessage("Phone number must start with '254' and be 12 digits.");
      return;
    }

    const amountRegex = /^\d+$/;
    if (!amount.match(amountRegex)) {
      setErrorMessage("Amount must be a valid integer.");
      return;
    }

    try {
      const response = await fetch("/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
          amount: amount,
        }),
      });

      const data = await response.json();
      console.log(data);

      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="checkout">
    <div className="product-card">
      <div className="mpesa-card">
        M-Pesa
        <p>Quick payment/Quick transfer</p>
      </div>

      <header>
        <a target="_blank" href="#">
          <img
            src="https://i.pinimg.com/564x/30/54/5b/30545b0c7faf7f887eb931fcf8422687.jpg"
            alt="M-Pesa Logo"
          />
        </a>
      </header>
      <div className="product-bio">
        <p>
          To use M-Pesa to pay with your phone number and send money to Agri
          Soko's Paybill, you would typically follow these steps:
        </p>
        <ol>
          <li>
            <strong>Dial the M-Pesa Menu:</strong> On your phone, dial *150# or
            the M-Pesa short code for your country to access the M-Pesa menu.
          </li>
          <li>
            <strong>Select "Lipa na M-Pesa":</strong> From the M-Pesa menu,
            select the option for "Lipa na M-Pesa," which is usually option 4 or
            a similar number.
          </li>
          <li>
            <strong>Select "Paybill":</strong> Choose the option for "Paybill"
            from the Lipa na M-Pesa menu. This is typically option 2 or another
            number depending on the country.
          </li>
          <li>
            <strong>Enter Agri Soko's Paybill Number:</strong> You will be
            prompted to enter the business number (Paybill number) for Agri
            Soko. Enter the correct Paybill number for Agri Soko.
          </li>
          <li>
            <strong>Enter Your Phone Number as the Account Number:</strong> You
            will then be asked to enter your phone number as the account number.
            This helps Agri Soko identify your payment.
          </li>
          <li>
            <strong>Enter the Amount:</strong> Input the amount you want to send
            to Agri Soko.
          </li>
          <li>
            <strong>Enter Your M-Pesa PIN:</strong> You will be prompted to
            enter your M-Pesa PIN to confirm the transaction.
          </li>
          <li>
            <strong>Confirm the Transaction:</strong> Verify that all the
            details are correct, then confirm the transaction to send the money
            to Agri Soko's Paybill.
          </li>
          <li>
            <strong>Wait for Confirmation:</strong> After completing the
            transaction, you will receive a confirmation SMS from M-Pesa with
            the details of the transaction.
          </li>
        </ol>
        <p>
          It's important to ensure that you have sufficient funds in your M-Pesa
          account before initiating the transaction. Also, double-check the
          Paybill number and the amount to avoid any errors in the transaction.
        </p>
        <div className="phone-input">
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              pattern="[0-9]*"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="number"
              pattern="[0-9]*"
              placeholder="Enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      <div className="bottom-left-container">
        <div className="bottom-left-content">
          {/* Additional content goes here */}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 Agri Soko</p>
        </div>
      </footer>
    </div></div>
  );
};

export default Checkout;