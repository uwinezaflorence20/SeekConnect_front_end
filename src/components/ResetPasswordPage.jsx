import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDoubleArrowLeft } from "react-icons/rx";
const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState(""); // New state for modal message
  const [modalSuccess, setModalSuccess] = useState(false); // New state for modal success

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

  const handleSubmit = async (e) => {
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
      try {
        const response = await fetch("https://seekconnect-backend-1.onrender.com/resetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: formData.email,
            Password: formData.newPassword,
            ConfirmPassword: formData.confirmPassword,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setModalMessage(data.message);
          setModalSuccess(true);
          setFormData({
            email: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setErrors(data.errors);
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        setErrors({ general: "An error occurred. Please try again later." });
      }
    } else {
      setErrors(errors);
    }
  };

  const closeModal = () => {
    setModalMessage("");
    setModalSuccess(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {modalMessage && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Notification
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{modalMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${modalSuccess ? "bg-green-500" : "bg-red-500"} text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-md w-full p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mr-80 font-medium">
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
              <p className="text-red-500 mr-60 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mr-64 text-gray-700 font-medium">
              New Password
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
              <p className="text-red-500 mr-40 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mr-56 text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mr-40 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex mt-4">
            <RxDoubleArrowLeft className="ml-2 text-md text-blue-400 pt-1" />
            <Link to={"/signin"} className="text-blue-400 ml-2">
              back to SignIn
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
