import React, { useState } from "react";
import Otherpart from "./shared/Otherpart";
import { IoIosAdd } from "react-icons/io";
import Post from "./Post";
import Lostitem from "../Admin/Lostitem";
import Foundform from "./Foundform";

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

      <div className="shadow-md w-full p-4 space-x-4">
        <input
          type="text"
          placeholder="Search by name, category or location"
          className="flex justify-center items-center p-2 w-full"
        />
      </div>

      <div className="text-black w-full mb-6">
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
    </div>
  );
}
