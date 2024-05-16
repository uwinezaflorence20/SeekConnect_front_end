// ResetPasswordPage.jsx
import React, { useState } from "react";

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
            email: formData.email,
            newPassword: formData.newPassword,
          }),
        });
        if (response.ok) {
          setSuccessMessage("Password reset successfully!");
          setFormData({
            email: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          const data = await response.json();
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}
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
