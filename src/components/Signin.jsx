// ResetPasswordPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
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
    <div className="min-h-screen flex mt-16 items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
      <div>
  
       <p className="text-3xl md:text-6xl text-[#8a9de9] mb-6 md:mb-10 font-bold">SeekConnect</p>
   </div>
        <h2 className="text-2xl font-bold text-center mb-6">Sign In </h2>
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mr-80 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
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
              className="block text-gray-700 mr-80 font-medium"
            >
           Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.newPassword ? "border-red-500" : ""
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 mr-60 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in to get started
            </button>
          </div>
          <p className="text-center   mr-60 text-sm mt-6 ">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#8a9de9] hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
          <p className="text-center ml-60  text-sm mb-8">
            <Link
              to="/resetpassword"
              className="font-medium text-[#8a9de9]  hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
