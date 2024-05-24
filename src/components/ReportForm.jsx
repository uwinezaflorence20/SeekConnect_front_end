import React, { useState } from "react";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    file: null,
    userId: "",
    firstName: "",
    lastName: "",
    race: "",
    countryOfOrigin: "",
    age: "",
    lostDate: "",
    lostPlace: {
      country: "",
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
    },
    comment: "",
    found: false,
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

    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required";
      valid = false;
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.race.trim()) {
      newErrors.race = "Race is required";
      valid = false;
    }

    if (!formData.countryOfOrigin.trim()) {
      newErrors.countryOfOrigin = "Country of origin is required";
      valid = false;
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
      valid = false;
    }

    if (!formData.lostDate.trim()) {
      newErrors.lostDate = "Lost date is required";
      valid = false;
    }

    if (!formData.lostPlace.country.trim()) {
      newErrors["lostPlace.country"] =
        "Country where the person was last seen is required";
      valid = false;
    }

    if (!formData.lostPlace.province.trim()) {
      newErrors["lostPlace.province"] =
        "Province where the person was last seen is required";
      valid = false;
    }

    if (!formData.lostPlace.district.trim()) {
      newErrors["lostPlace.district"] =
        "District where the person was last seen is required";
      valid = false;
    }

    if (!formData.lostPlace.sector.trim()) {
      newErrors["lostPlace.sector"] =
        "Sector where the person was last seen is required";
      valid = false;
    }

    if (!formData.lostPlace.cell.trim()) {
      newErrors["lostPlace.cell"] =
        "Cell where the person was last seen is required";
      valid = false;
    }

    if (!formData.lostPlace.village.trim()) {
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
    data.append("userId", formData.userId);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("race", formData.race);
    data.append("countryOfOrigin", formData.countryOfOrigin);
    data.append("age", formData.age);
    data.append("lostDate", formData.lostDate);
    data.append("lostPlace.country", formData.lostPlace.country);
    data.append("lostPlace.province", formData.lostPlace.province);
    data.append("lostPlace.district", formData.lostPlace.district);
    data.append("lostPlace.sector", formData.lostPlace.sector);
    data.append("lostPlace.cell", formData.lostPlace.cell);
    data.append("lostPlace.village", formData.lostPlace.village);
    data.append("comment", formData.comment);
    data.append("found", formData.found);

    try {
      const response = await fetch(
        "https://seekconnect-backend-1.onrender.com/missingPerson",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      // Handle success, e.g., reset form, show success message, etc.
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show error message, etc.
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        &times;
      </button>
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Missing Person Report
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
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
            <label htmlFor="userId" className="block text-gray-700 font-medium">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
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
              name="firstName"
              value={formData.firstName}
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
              name="lastName"
              value={formData.lastName}
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
              name="race"
              value={formData.race}
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
              name="countryOfOrigin"
              value={formData.countryOfOrigin}
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
              name="age"
              value={formData.age}
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
              Lost Date
            </label>
            <input
              type="date"
              id="lostDate"
              name="lostDate"
              value={formData.lostDate}
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
              Country where the person was last seen
            </label>
            <input
              type="text"
              id="lostPlace.country"
              name="lostPlace.country"
              value={formData.lostPlace.country}
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
              Province where the person was last seen
            </label>
            <input
              type="text"
              id="lostPlace.province"
              name="lostPlace.province"
              value={formData.lostPlace.province}
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
              District where the person was last seen
            </label>
            <input
              type="text"
              id="lostPlace.district"
              name="lostPlace.district"
              value={formData.lostPlace.district}
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
              Sector where the person was last seen
            </label>
            <input
              type="text"
              id="lostPlace.sector"
              name="lostPlace.sector"
              value={formData.lostPlace.sector}
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
              Cell where the person was last seen
            </label>
            <input
              type="text"
              id="lostPlace.cell"
              name="lostPlace.cell"
              value={formData.lostPlace.cell}
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
              Village where the person was last seen
            </label>
            <input
              type="text"
              id="lostPlace.village"
              name="lostPlace.village"
              value={formData.lostPlace.village}
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
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.comment ? "border-red-500" : ""
              }`}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="found"
              name="found"
              checked={formData.found}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="found" className="ml-2 text-gray-700 font-medium">
              Found
            </label>
          </div>
         

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;

