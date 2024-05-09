// SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
const Signin = () => {
  // State for email and password inputs
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [clickMessage, setClickMessage] = useState("");
  const [emailPrompt, setEmailPrompt] = useState("");
  const [passwordPrompt, setPasswordPrompt] = useState("");
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setEmailError("Please fill in the email.");
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      setPasswordError("Please fill in the password.");
    } else {
      setPasswordError("");
    }
    if (email.trim() !== "" && password.trim() !== "") {
      // You can add your sign-in logic here
      console.log("Email:", email);
      console.log("Password:", password);
      setTimeout(() => navigate("/home"), 2000);
    }
  };
  // Function to handle button click
  const handleButtonClick = () => {
    setClickMessage("Email and password are filled.");
    setEmailPrompt("Please enter the email.");
    setPasswordPrompt("Please enter the password.");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full p-6 rounded-md bg-white shadow-md">
        <div>
        <div className="text-center">
  <SlArrowDown className="text-[#8a9de9] text-6xl md:text-8xl" />
  <p className="text-4xl md:text-6xl text-[#8a9de9] font-bold">SeekConnect</p>
</div>

          <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
            Sign in to get stared
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm  font-medium text-gray-700"
            >
              Email address
            </label>
            <input
            placeholder="Enter your names"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {emailError && (
              <p className="text-red-400 text-center mt-1">{emailError}</p>
            )}
            {emailPrompt && (
              <p className="text-indigo-600 text-center mt-1">{emailPrompt}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
            placeholder="Enter your password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {passwordError && (
              <p className="text-red-400 text-center mt-1">{passwordError}</p>
            )}
            {passwordPrompt && (
              <p className="text-indigo-600 text-center mt-1">
                {passwordPrompt}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              onClick={handleButtonClick}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          {clickMessage && (
            <p className="text-green-500 text-center mt-1">{clickMessage}</p>
          )}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#8a9de9] hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
          <p className="text-center text-sm">
            
            <Link
              to="/resetpassword"
              className="font-medium text-[#8a9de9] hover:text-indigo-500"
            >
          Forgot your password?{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signin;