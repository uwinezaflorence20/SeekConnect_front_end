import React, { useState } from "react";
import ReportForm from "./ReportForm";
import LostForm from "./LostForm";
import Foundperson from "./Foundperson";
import Founddoc from "./Founddoc"
const Foundform = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("None");
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false); 

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Document") {
      setShowDocumentForm(true);
      setShowReportForm(false); 
    } else if (event.target.value === "Person") {
      setShowReportForm(true);
      setShowDocumentForm(false); 
    } else {
      setShowDocumentForm(false);
      setShowReportForm(false);
    }
  };

  const handleCloseForm = () => {
    setShowDocumentForm(false);
    setShowReportForm(false);   
    setSelectedOption("None");
  };

  return (
    <div className="w-[100vh] max-w-full p-4 border rounded shadow-lg">
     
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="w-full p-2 border rounded"
      >
        <option value="None">None</option>
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
          <Foundperson onClose={handleCloseForm} />
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
          <Founddoc onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default Foundform;
