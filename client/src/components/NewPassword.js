import React, { useState } from "react";

function Newpass({ email, onClose }) {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/reset_password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, new_password: newPassword, email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    // Check if the value being pasted is an email
    if (value.includes("@") && value.includes(".")) {
      // Do not update the new password if the value is an email
      return;
    }
    // Update the new password if the value is not an email
    setNewPassword(value);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="token"
              >
                Token:
              </label>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                type="email"
                id="email"
                value={email}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newPassword"
              >
                New Password:
              </label>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              type="submit"
            >
              Submit
            </button>
          </form>
          {message && <span className="text-green-600">{message}</span>}
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}

export default Newpass;
