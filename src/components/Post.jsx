import React from 'react'
import { useState } from 'react';

const Post = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('None');

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full max-w-xl p-4 border rounded shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={toggleNotifications}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
            notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
              notificationsEnabled ? 'translate-x-6' : ''
            }`}n
          ></div>
        </button>
        <span className="text-gray-600">Notifications</span>
      </div>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="w-full p-2 border rounded"
      >
        <option value="None">None</option>
        <option value="None">phone</option>
        <option value="None"> identification card</option>
        <option value="None">Person</option>
        <option value="None">Document</option>
       
      </select>
    </div>
  );
};



export default Post
