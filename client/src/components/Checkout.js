import React from 'react';

const MpesaPayment = () => {
  return (
    <aside className="product-card">
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
          {/* ... (other list items) */}
        </ol>

        <p>
          It's important to ensure that you have sufficient funds in your M-Pesa
          account before initiating the transaction. Also, double-check the
          Paybill number and the amount to avoid any errors in the transaction.
        </p>

        <input type="text" placeholder="Enter your phone number" />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>

      <div className="bottom-left-container">
        <ul className="bottom-left-list">
          <h2>Delivery</h2>
          <h3>Conrad</h3>
          <h4>Nairobi</h4>
        </ul>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 Agri Soko</p>
        </div>
      </footer>
    </aside>
  );
};

export default MpesaPayment;
