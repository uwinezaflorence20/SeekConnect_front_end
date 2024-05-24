import React, { useState } from "react";
import Otherpart from "./shared/Otherpart";
import { IoIosAdd } from "react-icons/io";
import Post from './Post';

export default function Dashboard() {
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState(null); // State to track active button

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleButtonClick = (buttonName) => {
    setShowNotificationSettings(!showNotificationSettings);
    setActiveButton(buttonName); // Update active button state
  };

  return (
    <div className="w-full flex gap-2 mx-20">
      <div>
        <div className="flex ml-80 m-4 gap-72 w-96">
          <button 
            className={`bg-[#8a9de9] w-12 h-8 text-white rounded-sm ${activeButton === 'lost' && 'bg-gray-300'}`} // Toggle background color
            onClick={() => handleButtonClick('lost')} // Handle click event
          >
            lost
          </button>
          <button 
            className={`bg-[#8a9de9] w-12 h-8 text-white rounded-sm ${activeButton === 'found' && 'bg-gray-300'}`} // Toggle background color
            onClick={() => handleButtonClick('found')} // Handle click event
          >
            found
          </button>
        </div>

        <div className="App">
          <div className="bg-[#8a9de9] flex h-20 items-center justify-center text-white">
            <IoIosAdd />
            <button 
              onClick={handleButtonClick}
              className="text-center my-4"
            >
              Report a lost item
            </button>
          </div>
          {showNotificationSettings && <Post />}
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
              <option value="Phone">Phone</option>
              <option value="Identification card">Identification card</option>
              <option value="Person">Person</option>
              <option value="Document">Document</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white p-4 shadow-md">
            <div className="flex items-center w-full min-w-96 space-x-4">
              <div>
                <img src="/gloria.jpg" alt="" className="w-48 h-48" />
              </div>
              <div className="mb-20">
                <p className="font-bold text-3xl mb text-[#8a9de9]">Gina Pineiro</p>
                <p className="text-gray-500 font-thin italic">Last seen 10-Jan-1982</p>
                <p className="text-gray-500"><span className="bg-gray-200 rounded-lg">Accent</span>: <span className="text-black font-extrabold">Oregon</span></p>
                <p className="text-gray-500"><span className="bg-gray-200 rounded-lg">Country origin</span>: <span className="text-black font-extrabold">Rwanda</span></p>
                <p className="text-gray-500"><span className="bg-gray-200 rounded-lg">Eye color</span>: <span className="text-black font-extrabold">Brown</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-white p-4 shadow-md">
            <div className="flex items-center w-full min-w-96 space-x-4">
              <div>
                <img src="/gloria.jpg" alt="" className="w-48 h-48" />
              </div>
              <div className="mb-20">
                <p className="font-bold text-3xl mb text-[#8a9de9]">Gina Pineiro</p>
                <p className="text-gray-500 font-thin italic">Last seen 10-Jan-1982</p>
                <p className="text-gray-500"><span className="bg-gray-200 rounded-lg">Accent</span>: <span className="text-black font-extrabold">Oregon</span></p>
                <p className="text-gray-500"><span className="bg-gray-200 rounded-lg">Country origin</span>: <span className="text-black font-extrabold">Rwanda</span></p>
                <p className="text-gray-500"><span className="bg-gray-200 rounded-lg">Eye color</span>: <span className="text-black font-extrabold">Brown</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
