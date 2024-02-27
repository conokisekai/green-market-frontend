import React, { useState } from 'react';

const Chat = () => {
  const [messages] = useState([
    { id: 1, sender: 'buyer', text: 'Hi, I am interested in your products.' },
    { id: 2, sender: 'farmer', text: 'Sure, which products are you interested in?' }
    // Add more messages as needed
  ]);

  const sendMessage = () => {
    // Logic to send a message
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.sender === 'buyer' ? 'text-left' : 'text-right'
            } mb-4`}
          >
            <span
              className={`${
                message.sender === 'buyer' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              } inline-block px-4 py-2 rounded-lg`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
