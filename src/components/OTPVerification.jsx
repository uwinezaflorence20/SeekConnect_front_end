import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const OTPVerification = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate =useNavigate();
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/otp-verify",
        { otp }
      );
      console.log("response.data", response.data); 
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 rounded-md bg-white shadow-md">
        <h2 className="text-center text-xl font-extrabold mb-4 md:text-xl text-gray-900">
          OTP Verification
        </h2>
        <form onSubmit={handleOTPVerification}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-medium">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;