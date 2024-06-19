import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Post from './Post';
import Lostitem from "../Admin/Lostitem";
import LostPeople from "../Admin/LostPeople";
import Header from "../Admin/sharedAdmin/Header";

export default function Dashboard() {
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [lostDocuments, setLostDocuments] = useState([]); // State to store lost documents

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleButtonClick = () => {
    setShowNotificationSettings(!showNotificationSettings);
  };

  const handleLostDocumentSubmit = (document) => {
    setLostDocuments([...lostDocuments, document]);
    setShowNotificationSettings(false); // Close the form after submission
  };

  return (
    <div className="p-4">
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
          {showNotificationSettings && <Post onSubmit={handleLostDocumentSubmit} />}
        </div>
      </div>

     

      <Lostitem />
      <LostPeople />
    </div>
  );
}
