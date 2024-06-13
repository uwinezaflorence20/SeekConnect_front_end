import React, { useState } from "react";
import axios from "axios";

const Foundperson = () => {
  const [formData, setFormData] = useState({
    file: null,
    Email: "",
    FirstName: "",
    LastName: "",
    Race: "",
    CountryOfOrigin: "",
    Age: "",
    LostDate: "",
    LostPlace: {
      Country: "",
      Province: "",
      District: "",
      Sector: "",
      Cell: "",
      Village: "",
    },
    Comment: "",
    returnedToOwner: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", formData.file);
    data.append("Email", formData.Email);
    data.append("FirstName", formData.FirstName);
    data.append("LastName", formData.LastName);
    data.append("Race", formData.Race);
    data.append("CountryOfOrigin", formData.CountryOfOrigin);
    data.append("Age", formData.Age);
    data.append("LostDate", formData.LostDate);
    data.append("LostPlace.Country", formData.LostPlace.Country);
    data.append("LostPlace.Province", formData.LostPlace.Province);
    data.append("LostPlace.District", formData.LostPlace.District);
    data.append("LostPlace.Sector", formData.LostPlace.Sector);
    data.append("LostPlace.Cell", formData.LostPlace.Cell);
    data.append("LostPlace.Village", formData.LostPlace.Village);
    data.append("Comment", formData.Comment);
    data.append("returnedToOwner", formData.returnedToOwner);

    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/foundMissingPerson",
        data
      );
      console.log("Form data submitted:", response.data);
      setFormData({
        file: null,
        Email: "",
        FirstName: "",
        LastName: "",
        Race: "",
        CountryOfOrigin: "",
        Age: "",
        LostDate: "",
        LostPlace: {
          Country: "",
          Province: "",
          District: "",
          Sector: "",
          Cell: "",
          Village: "",
        },
        Comment: "",
        returnedToOwner: false,
      });
      setIsSubmitted(true);
      setMessage("Form submitted successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Found Person Report
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 font-medium">
              Photo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              User ID
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="race" className="block text-gray-700 font-medium">
              Race
            </label>
            <input
              type="text"
              id="race"
              name="Race"
              value={formData.Race}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="countryOfOrigin"
              className="block text-gray-700 font-medium"
            >
              Country of Origin
            </label>
            <input
              type="text"
              id="countryOfOrigin"
              name="CountryOfOrigin"
              value={formData.CountryOfOrigin}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-medium">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostDate"
              className="block text-gray-700 font-medium"
            >
              Date when the person was Found
            </label>
            <input
              type="date"
              id="lostDate"
              name="LostDate"
              value={formData.LostDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.country"
              className="block text-gray-700 font-medium"
            >
              Country where the person was Found
            </label>
            <input
              type="text"
              id="lostPlace.country"
              name="LostPlace.Country"
              value={formData.LostPlace.Country}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.province"
              className="block text-gray-700 font-medium"
            >
              Province where the person was Found
            </label>
            <input
              type="text"
              id="lostPlace.province"
              name="LostPlace.Province"
              value={formData.LostPlace.Province}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.district"
              className="block text-gray-700 font-medium"
            >
              District where the person was Found
            </label>
            <input
              type="text"
              id="lostPlace.district"
              name="LostPlace.District"
              value={formData.LostPlace.District}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.sector"
              className="block text-gray-700 font-medium"
            >
              Sector where the person was Found
            </label>
            <input
              type="text"
              id="lostPlace.sector"
              name="LostPlace.Sector"
              value={formData.LostPlace.Sector}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.cell"
              className="block text-gray-700 font-medium"
            >
              Cell where the person was Found
            </label>
            <input
              type="text"
              id="lostPlace.cell"
              name="LostPlace.Cell"
              value={formData.LostPlace.Cell}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.village"
              className="block text-gray-700 font-medium"
            >
              Village where the person was Found
            </label>
            <input
              type="text"
              id="lostPlace.village"
              name="LostPlace.Village"
              value={formData.LostPlace.Village}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 font-medium">
              Comment
            </label>
            <textarea
              id="comment"
              name="Comment"
              value={formData.Comment}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Has the person been returned to their owner?
            </label>
            <input
              type="checkbox"
              id="returnedToOwner"
              name="returnedToOwner"
              checked={formData.returnedToOwner}
              onChange={handleChange}
              className="mt-1 p-2"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Success</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foundperson;




