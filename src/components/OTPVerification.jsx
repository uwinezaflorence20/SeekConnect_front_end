import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerification = () => {
  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {  // Allow only digits
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      
      // Move to the next input field if not the last
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpValue = otp.join("");
    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/otp-verify",
        { otp: otpValue }
      );
      console.log("response.data", response.data);
      toast.success("Logged in successfully");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setError("Invalid OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 rounded-md bg-white shadow-md">
        <h2 className="text-center text-xl font-extrabold mb-4 md:text-xl text-gray-900">
          OTP Verification
        </h2>
        <form onSubmit={handleOTPVerification}>
          <div className="mb-4 flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 p-2 text-center border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ))}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Checking..." : "Verify OTP"}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default OTPVerification;
