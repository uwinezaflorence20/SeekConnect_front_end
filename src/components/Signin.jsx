import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // State for login error message
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate form inputs
  const isValid = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Email is invalid");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    return valid;
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!isValid()) {
      return;
    }

    try {
      // Make login request
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/login",
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract role from response
      const { role, name } = response.data;

      // Navigate based on role and pass the email and name as state
      if (role === "user") {
        navigate("/dash", { state: { name, email } });
      } else if (role === "admin") {
        navigate("/dashboardadmin", { state: { name, email } });
      } else {
        console.log("You're not registered. Please sign up first.");
      }

      // Store response data
      const { role: _, ...data } = response.data; // Exclude role from response data
      setResponseData(data);

    } catch (error) {
      // Handle login errors
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid email or password");
      } else {
        setLoginError("An error occurred. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
        <div>
          <p className="text-3xl md:text-6xl text-[#8a9de9] mb-6 md:mb-10 font-bold">
            SeekConnect
          </p>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                emailError ? "border-red-500" : ""
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                passwordError ? "border-red-500" : ""
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          {loginError && (
            <p className="text-red-500 text-center text-sm mt-1">{loginError}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in to get started
            </button>
          </div>
          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-[#8a9de9] hover:text-indigo-500">
              Register
            </Link>
          </p>
          <p className="text-center text-sm mb-8">
            <Link to="/resetpassword" className="font-medium text-[#8a9de9] hover:text-indigo-500">
              Forgot your password?
            </Link>
          </p>
        </form>
        {responseData && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium">Response Data:</h3>
            <pre className="mt-2 text-sm">{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
