import React, { useState } from "react";
import Otherpart from "./shared/Otherpart";
import { IoIosAdd } from "react-icons/io";
import Post from "./Post";
import Lostitem from "../Admin/Lostitem";
import Foundform from "./Foundform";
import Gridperson from "./Gridperson";
import Griditem from "./Griditem";
import Header from "../Admin/sharedAdmin/Header";

export default function FoundItems() {
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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
    <div className=" w-full max-w-full p-4 border rounded shadow-lg  ">
      <div>
        <div>
          <div className="bg-[#8a9de9] flex h-20 w-full items-center justify-center text-white">
            <IoIosAdd />
            <button onClick={handleButtonClick} className="text-center my-4">
              Report a Found item
            </button>
          </div>
          {showNotificationSettings && <Foundform  />}
        </div>
      </div>

     
      <Gridperson/>
      <Griditem/>
    </div>
  );
}
