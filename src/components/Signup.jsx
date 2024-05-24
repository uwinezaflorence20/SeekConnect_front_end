import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDoubleArrowLeft } from "react-icons/rx";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isValid = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Email is invalid");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm password is required");
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    return valid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/signUp",
        {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
          ConfirmPassword: confirmPassword,
        }
      );
      console.log("response.data", response.data);
      navigate('/otp-verify');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex mt-12 items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 rounded-md bg-white shadow-md">
        <div>
          <p className="text-4xl md:text-4xl text-[#8a9de9] mb-6 md:mb-10 font-bold">
            SeekConnect
          </p>
          <h2 className="mt-6 text-center text-xl font-extrabold mb-4 md:text-xl text-gray-900">
            Register
          </h2>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="Firstname" className="block mr-96 text-gray-700 font-medium">
              Firstname
            </label>
            <input
              type="text"
              id="Firstname"
              name="Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {firstNameError && <p className="text-red-500">{firstNameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Lastname" className="block mr-96 text-gray-700 font-medium">
              Lastname
            </label>
            <input
              type="text"
              id="Lastname"
              name="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {lastNameError && <p className="text-red-500">{lastNameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mr-96 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mr-80 font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mr-80 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSignUp}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
          <div className="flex">
            <p> Have an account? </p>
            <RxDoubleArrowLeft className="ml-48 text-md text-blue-400 pt-2" />
            <Link to={"/signin"} className="text-blue-400 pb-4">
              back to SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
