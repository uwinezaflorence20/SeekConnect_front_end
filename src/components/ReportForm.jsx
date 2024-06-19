import React, { useState } from "react";
import axios from "axios";

const ReportForm = () => {
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
    Found: false,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

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
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
    setErrors({
      ...errors,
      file: "",
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.file) {
      newErrors.file = "File is required";
      valid = false;
    }

    // Validate other form fields here

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

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
    data.append("Found", formData.Found);

    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/missingPerson",
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
        Found: false,
      });
      setErrors({});
      setMessage("Form submitted successfully!");
      setIsSuccess(true);
      setShowModal(true);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Server responded with status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
      setMessage("There was an error submitting the form. Please try again later.");
      setIsSuccess(false);
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Missing Person Report
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Form fields here */}
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 font-medium">
              Photo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.file ? "border-red-500" : ""
              }`}
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              User Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.Email ? "border-red-500" : ""
              }`}
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">{errors.Email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.FirstName ? "border-red-500" : ""
              }`}
            />
            {errors.FirstName && (
              <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LastName ? "border-red-500" : ""
              }`}
            />
            {errors.LastName && (
              <p className="text-red-500 text-sm mt-1">{errors.LastName}</p>
            )}
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
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.Race ? "border-red-500" : ""
              }`}
            />
            {errors.Race && (
              <p className="text-red-500 text-sm mt-1">{errors.Race}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="countryOfOrigin" className="block text-gray-700 font-medium">
              Country of Origin
            </label>
            <input
              type="text"
              id="countryOfOrigin"
              name="CountryOfOrigin"
              value={formData.CountryOfOrigin}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.CountryOfOrigin ? "border-red-500" : ""
              }`}
            />
            {errors.CountryOfOrigin && (
              <p className="text-red-500 text-sm mt-1">{errors.CountryOfOrigin}</p>
            )}
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
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.Age ? "border-red-500" : ""
              }`}
            />
            {errors.Age && (
              <p className="text-red-500 text-sm mt-1">{errors.Age}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lostDate" className="block text-gray-700 font-medium">
              Lost Date
            </label>
            <input
              type="date"
              id="lostDate"
              name="LostDate"
              value={formData.LostDate}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LostDate ? "border-red-500" : ""
              }`}
            />
            {errors.LostDate && (
              <p className="text-red-500 text-sm mt-1">{errors.LostDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lostPlaceCountry" className="block text-gray-700 font-medium">
              Lost Place Country
            </label>
            <input
              type="text"
              id="lostPlaceCountry"
              name="LostPlace.Country"
              value={formData.LostPlace.Country}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["LostPlace.Country"] ? "border-red-500" : ""
              }`}
            />
            {errors["LostPlace.Country"] && (
              <p className="text-red-500 text-sm mt-1">{errors["LostPlace.Country"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lostPlaceProvince" className="block text-gray-700 font-medium">
              Lost Place Province
            </label>
            <input
              type="text"
              id="lostPlaceProvince"
              name="LostPlace.Province"
              value={formData.LostPlace.Province}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["LostPlace.Province"] ? "border-red-500" : ""
              }`}
            />
            {errors["LostPlace.Province"] && (
              <p className="text-red-500 text-sm mt-1">{errors["LostPlace.Province"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lostPlaceDistrict" className="block text-gray-700 font-medium">
              Lost Place District
            </label>
            <input
              type="text"
              id="lostPlaceDistrict"
              name="LostPlace.District"
              value={formData.LostPlace.District}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["LostPlace.District"] ? "border-red-500" : ""
              }`}
            />
            {errors["LostPlace.District"] && (
              <p className="text-red-500 text-sm mt-1">{errors["LostPlace.District"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lostPlaceSector" className="block text-gray-700 font-medium">
              Lost Place Sector
            </label>
            <input
              type="text"
              id="lostPlaceSector"
              name="LostPlace.Sector"
              value={formData.LostPlace.Sector}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["LostPlace.Sector"] ? "border-red-500" : ""
              }`}
            />
            {errors["LostPlace.Sector"] && (
              <p className="text-red-500 text-sm mt-1">{errors["LostPlace.Sector"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lostPlaceCell" className="block text-gray-700 font-medium">
              Lost Place Cell
            </label>
            <input
              type="text"
              id="lostPlaceCell"
              name="LostPlace.Cell"
              value={formData.LostPlace.Cell}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["LostPlace.Cell"] ? "border-red-500" : ""
              }`}
            />
            {errors["LostPlace.Cell"] && (
              <p className="text-red-500 text-sm mt-1">{errors["LostPlace.Cell"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lostPlaceVillage" className="block text-gray-700 font-medium">
              Lost Place Village
            </label>
            <input
              type="text"
              id="lostPlaceVillage"
              name="LostPlace.Village"
              value={formData.LostPlace.Village}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["LostPlace.Village"] ? "border-red-500" : ""
              }`}
            />
            {errors["LostPlace.Village"] && (
              <p className="text-red-500 text-sm mt-1">{errors["LostPlace.Village"]}</p>
            )}
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
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.Comment ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.Comment && (
              <p className="text-red-500 text-sm mt-1">{errors.Comment}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              <input
                type="checkbox"
                name="Found"
                checked={formData.Found}
                onChange={handleChange}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">Found</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            {isSubmitting ? "Posting..." : "Submit"}
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
                    <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${isSuccess ? "bg-green-100" : "bg-red-100"} sm:mx-0 sm:h-10 sm:w-10`}>
                      <svg className={`h-6 w-6 ${isSuccess ? "text-green-600" : "text-red-600"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={isSuccess ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.293 10.293a1 1 0 011.414 0L10 10.586l0.293-0.293a1 1 0 111.414 1.414L10 13.414l-2-2a1 1 0 011.414-1.414z"} clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{isSuccess ? "Success" : "Error"}</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${isSuccess ? "bg-green-600 hover:bg-green-700 focus:ring-green-500" : "bg-red-600 hover:bg-red-700 focus:ring-red-500"} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
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

export default ReportForm;
