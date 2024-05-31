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
      alert("Form submitted successfully");
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
      alert("There was an error submitting the form. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Missing Person Report
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
            <label htmlFor="country" className="block text-gray-700 font-medium">
              Lost Country
            </label>
            <input
              type="text"
              id="country"
              name="LostPlace.Country"
              value={formData.LostPlace.Country}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LostPlace && errors.LostPlace.Country ? "border-red-500" : ""
              }`}
            />
            {errors.LostPlace && errors.LostPlace.Country && (
              <p className="text-red-500 text-sm mt-1">{errors.LostPlace.Country}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="province" className="block text-gray-700 font-medium">
              Lost Province
            </label>
            <input
              type="text"
              id="province"
              name="LostPlace.Province"
              value={formData.LostPlace.Province}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LostPlace && errors.LostPlace.Province ? "border-red-500" : ""
              }`}
            />
            {errors.LostPlace && errors.LostPlace.Province && (
              <p className="text-red-500 text-sm mt-1">{errors.LostPlace.Province}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-700 font-medium">
              Lost District
            </label>
            <input
              type="text"
              id="district"
              name="LostPlace.District"
              value={formData.LostPlace.District}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LostPlace && errors.LostPlace.District ? "border-red-500" : ""
              }`}
            />
            {errors.LostPlace && errors.LostPlace.District && (
              <p className="text-red-500 text-sm mt-1">{errors.LostPlace.District}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="sector" className="block text-gray-700 font-medium">
              Lost Sector
            </label>
            <input
              type="text"
              id="sector"
              name="LostPlace.Sector"
              value={formData.LostPlace.Sector}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LostPlace && errors.LostPlace.Sector ? "border-red-500" : ""
              }`}
            />
            {errors.LostPlace && errors.LostPlace.Sector && (
              <p className="text-red-500 text-sm mt-1">{errors.LostPlace.Sector}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="cell" className="block text-gray-700 font-medium">
              Lost Cell
            </label>
            <input
              type="text"
              id="cell"
              name="LostPlace.Cell"
              value={formData.LostPlace.Cell}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LostPlace && errors.LostPlace.Cell ? "border-red-500" : ""
              }`}
            />
            {errors.LostPlace && errors.LostPlace.Cell && (
              <p className="text-red-500 text-sm mt-1">{errors.LostPlace.Cell}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="village" className="block text-gray-700 font-medium">
              Lost Village
            </label>
            <input
              type="text"
              id="village"
              name="LostPlace.Village"
              value={formData.LostPlace.Village}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.LostPlace && errors.LostPlace.Village ? "border-red-500" : ""
              }`}
            />
            {errors.LostPlace && errors.LostPlace.Village && (
              <p className="text-red-500 text-sm mt-1">{errors.LostPlace.Village}</p>
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
            />
            {errors.Comment && (
              <p className="text-red-500 text-sm mt-1">{errors.Comment}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="found" className="block text-gray-700 font-medium">
              Found
            </label>
            <input
              type="checkbox"
              id="found"
              name="Found"
              checked={formData.Found}
              onChange={handleChange}
              className={`mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.Found ? "border-red-500" : ""
              }`}
            />
            {errors.Found && (
              <p className="text-red-500 text-sm mt-1">{errors.Found}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
