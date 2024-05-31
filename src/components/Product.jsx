import React, { useState } from "react";

import { IoIosAdd } from "react-icons/io";
import Post from './Post';
import Lostitem from "../Admin/Lostitem";

export default function Dashboard() {
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState(null); // State to track active button
  const [lostDocuments, setLostDocuments] = useState([]); // State to store lost documents

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleButtonClick = (buttonName) => {
    setShowNotificationSettings(!showNotificationSettings);
    setActiveButton(buttonName); // Update active button state
  };

  const handleLostDocumentSubmit = (document) => {
    setLostDocuments([...lostDocuments, document]);
    setShowNotificationSettings(false); // Close the form after submission
  };

  return (
    <div className="  gap-2 mx-20">
      
       

        <div className="App">
         
            <div>
              <div className="bg-[#8a9de9] w-full flex h-20 items-center justify-center text-white">
                <IoIosAdd />
                <button 
                  onClick={handleButtonClick}
                  className="text-center my-4"
                >
                  Report a Lost item
                </button>
              </div>
              {showNotificationSettings && <Post />}
            </div>
        
         
         

        </div>

        <div className="shadow-md p-4 space-x-4">
          <input
            type="text"
            placeholder="Search by name, category or location"
            className="flex justify-center items-center p-2 w-full"
          />
        </div>

        <div className="text-black mb-6">
          <div className="flex items-center  space-x-4">
            <select
              name=""
              id=""
              className="text-black w-full p-2 bg-gray-100"
              onChange={handleDropdownChange}
              value={selectedOption}
            >
              <option value="">Filter by category</option>
              <option value="Person">Person</option>
              <option value="Document">Document</option>
            </select>
          </div>
        </div>
      
        <div className="p-6">
          <div className="bg-white p-4 shadow-md">
            <div className="flex items-center w-full min-w-96 space-x-4">
              <Lostitem/>
            </div>
          </div>
        </div>

      </div>
   
  );
}
