import React, { useState } from 'react';
import ReportForm from './ReportForm';
import LostForm from './LostForm';

const Post = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('None');
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false); // Define showReportForm state

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'Document') {
      setShowDocumentForm(true);
      setShowReportForm(false); // Ensure only one form is shown at a time
    } else if (event.target.value === 'Person') {
      setShowReportForm(true);
      setShowDocumentForm(false); // Ensure only one form is shown at a time
    } else {
      setShowDocumentForm(false);
      setShowReportForm(false);
    }
  };

  const handleCloseForm = () => {
    setShowDocumentForm(false);
    setShowReportForm(false); // Ensure both forms can be closed
    setSelectedOption('None');
  };

  return (
    <div className="w-[100vh] max-w-full p-4 border rounded shadow-lg">
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
            }`}
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
        <option value="phone">Phone</option>
        <option value="identification card">Identification Card</option>
        <option value="Person">Person</option>
        <option value="Document">Document</option>
      </select>
      {showReportForm && (
        <div className="relative">
          <button
            onClick={handleCloseForm}
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          <ReportForm onClose={handleCloseForm} />
        </div>
      )}
      {showDocumentForm && (
        <div className="relative">
          <button
            onClick={handleCloseForm}
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          <LostForm onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default Post;
