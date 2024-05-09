
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { SlArrowDown } from "react-icons/sl";
import { RxDoubleArrowLeft } from "react-icons/rx";
const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(errors).length === 0) {
      // Submit the form, reset password logic here
      setSuccessMessage("Password reset successfully!");
      // Clear form data after successful submission
      setFormData({
        email: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setErrors(errors);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 rounded-md bg-white shadow-md">
      <div>
      <p className="text-4xl md:text-4xl text-[#8a9de9] mb-6 md:mb-10 font-bold">SeekConnect</p>
      <h2 className="mt-6 text-center text-xl font-extrabold mb-4 md:text-xl text-gray-900">Register</h2>
  </div>
        
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mr-96 text-gray-700 font-medium">
              Firstname
            </label>
            <input
              type="Firstname"
              id="Firstname"
              name="Firstname"
              value={formData.email}
              onChange={handleChange}
              className={`"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mr-80 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mr-96 text-gray-700 font-medium">
              Lastname
            </label>
            <input
              type="Lastname"
              id="Lastname"
              name="Lastname"
              value={formData.email}
              onChange={handleChange}
              className={`"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mr-80 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mr-96 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mr-80 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700  mr-80 font-medium"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ${
                errors.newPassword ? "border-red-500" : ""
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 mr-72 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mr-80 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mr-60 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <button
             type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
          <div className="flex">
          <p> Have an account? </p>
         <RxDoubleArrowLeft className='ml-48 text-md text-blue-400 pt-2' />
          <Link to={"/signin"} className='text-blue-400 pb-4'>back to SignIn</Link>          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
