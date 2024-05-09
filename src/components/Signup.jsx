// SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SlArrowDown } from "react-icons/sl";
import { RxDoubleArrowLeft } from "react-icons/rx";
const SignUp = () => {
  // State for email, password, and confirm password inputs
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your sign-up logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    setTimeout(() => {
         navigate('/signin')
    }, 3000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-12 lg:px-8">
      <div className="max-w-lg p-6 rounded-md bg-white shadow-md">
      <div>
    <SlArrowDown className='ml-10 md:ml-44 text-[#8a9de9] text-6xl md:text-8xl' />
    <p className="text-4xl md:text-6xl text-[#8a9de9] mb-6 md:mb-10 font-bold">SeekConnect</p>
    <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">Register</h2>
</div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Firstname
            </label>
            <input
            placeholder="Enter First Name"
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="firstname"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Lastname
            </label>
            <input
            placeholder="Enter Last Name"
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="lastname"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
            placeholder="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
            placeholder="Enter password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
           placeholder="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
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
          <Link to={"/signin"} className='text-blue-400 pb-4'>back to SignIn</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;






