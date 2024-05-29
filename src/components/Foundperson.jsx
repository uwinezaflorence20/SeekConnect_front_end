import React, { useState } from "react";
import axios from "axios";

const Foundperson = () => {
  const [formData, setFormData] = useState({
    file: null,
    UserId: "",
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

    if (!formData.UserId.trim()) {
      newErrors.userId = "User ID is required";
      valid = false;
    }

    if (!formData.FirstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.LastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.Race.trim()) {
      newErrors.race = "Race is required";
      valid = false;
    }

    if (!formData.CountryOfOrigin.trim()) {
      newErrors.countryOfOrigin = "Country of origin is required";
      valid = false;
    }

    if (!formData.Age) {
      newErrors.age = "Age is required";
      valid = false;
    }

    if (!formData.LostDate.trim()) {
      newErrors.lostDate = "Lost date is required";
      valid = false;
    }

    if (!formData.LostPlace.Country.trim()) {
      newErrors["lostPlace.country"] =
        "Country where the person was last seen is required";
      valid = false;
    }

    if (!formData.LostPlace.Province.trim()) {
      newErrors["lostPlace.province"] =
        "Province where the person was last seen is required";
      valid = false;
    }

    if (!formData.LostPlace.District.trim()) {
      newErrors["lostPlace.district"] =
        "District where the person was last seen is required";
      valid = false;
    }

    if (!formData.LostPlace.Sector.trim()) {
      newErrors["lostPlace.sector"] =
        "Sector where the person was last seen is required";
      valid = false;
    }

    if (!formData.LostPlace.Cell.trim()) {
      newErrors["lostPlace.cell"] =
        "Cell where the person was last seen is required";
      valid = false;
    }

    if (!formData.LostPlace.Village.trim()) {
      newErrors["lostPlace.village"] =
        "Village where the person was last seen is required";
      valid = false;
    }

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
    data.append("UserId", formData.UserId);
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

    console.log(data);
    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/foundMissingPerson",
        data
      );
      console.log("Form data submitted:", response.data);
      // Reset the form on successful submission
      setFormData({
        file: null,
        UserId: "",
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
      setErrors({});
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
           Report Found person
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
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.file ? "border-red-500" : ""
              }`}
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700 font-medium">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="UserId"
              value={formData.UserId}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.userId ? "border-red-500" : ""
              }`}
            />
            {errors.userId && (
              <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
            )}
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
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
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
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
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
                errors.race ? "border-red-500" : ""
              }`}
            />
            {errors.race && (
              <p className="text-red-500 text-sm mt-1">{errors.race}</p>
            )}
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
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.countryOfOrigin ? "border-red-500" : ""
              }`}
            />
            {errors.countryOfOrigin && (
              <p className="text-red-500 text-sm mt-1">
                {errors.countryOfOrigin}
              </p>
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
                errors.age ? "border-red-500" : ""
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostDate"
              className="block text-gray-700 font-medium"
            >
              Date when the Person was Lost
            </label>
            <input
              type="date"
              id="lostDate"
              name="LostDate"
              value={formData.LostDate}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.lostDate ? "border-red-500" : ""
              }`}
            />
            {errors.lostDate && (
              <p className="text-red-500 text-sm mt-1">{errors.lostDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.country"
              className="block text-gray-700 font-medium"
            >
              Country where the Person was Last Seen
            </label>
            <input
              type="text"
              id="lostPlace.country"
              name="LostPlace.Country"
              value={formData.LostPlace.Country}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["lostPlace.country"] ? "border-red-500" : ""
              }`}
            />
            {errors["lostPlace.country"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["lostPlace.country"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.province"
              className="block text-gray-700 font-medium"
            >
              Province where the Person was Last Seen
            </label>
            <input
              type="text"
              id="lostPlace.province"
              name="LostPlace.Province"
              value={formData.LostPlace.Province}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["lostPlace.province"] ? "border-red-500" : ""
              }`}
            />
            {errors["lostPlace.province"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["lostPlace.province"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.district"
              className="block text-gray-700 font-medium"
            >
              District where the Person was Last Seen
            </label>
            <input
              type="text"
              id="lostPlace.district"
              name="LostPlace.District"
              value={formData.LostPlace.District}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["lostPlace.district"] ? "border-red-500" : ""
              }`}
            />
            {errors["lostPlace.district"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["lostPlace.district"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.sector"
              className="block text-gray-700 font-medium"
            >
              Sector where the Person was Last Seen
            </label>
            <input
              type="text"
              id="lostPlace.sector"
              name="LostPlace.Sector"
              value={formData.LostPlace.Sector}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["lostPlace.sector"] ? "border-red-500" : ""
              }`}
            />
            {errors["lostPlace.sector"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["lostPlace.sector"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.cell"
              className="block text-gray-700 font-medium"
            >
              Cell where the Person was Last Seen
            </label>
            <input
              type="text"
              id="lostPlace.cell"
              name="LostPlace.Cell"
              value={formData.LostPlace.Cell}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["lostPlace.cell"] ? "border-red-500" : ""
              }`}
            />
            {errors["lostPlace.cell"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["lostPlace.cell"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lostPlace.village"
              className="block text-gray-700 font-medium"
            >
              Village where the Person was Last Seen
            </label>
            <input
              type="text"
              id="lostPlace.village"
              name="LostPlace.Village"
              value={formData.LostPlace.Village}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["lostPlace.village"] ? "border-red-500" : ""
              }`}
            />
            {errors["lostPlace.village"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["lostPlace.village"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-medium"
            >
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
          <div className="mb-4">
            <label htmlFor="found" className="block text-gray-700 font-medium">
              returnedToOwner
            </label>
            <input
              type="checkbox"
              id="found"
              name="returnedToOwner"
              checked={formData.returnedToOwner}
              onChange={handleChange}
              className="mt-1 p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Foundperson;