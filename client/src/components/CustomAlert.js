import React, { useState, useEffect } from "react";
import "./CustomAlert.css"; // Import CSS file for custom alert styling

function CustomAlert({ message, onClose }) {
  const [showAlert, setShowAlert] = useState(true);

  // Close the alert after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Call onClose when the alert is fully hidden
  useEffect(() => {
    if (!showAlert) {
      onClose();
    }
  }, [showAlert, onClose]);

  return (
    <div className={`custom-alert ${showAlert ? "slide-in" : "slide-out"}`}>
      <h4>{message}</h4>
    </div>
  );
}

export default CustomAlert;
