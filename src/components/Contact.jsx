import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-lg w-full p-6 rounded-md bg-white shadow-md"
      >
        <div>
          <p className="text-xl text-center md:text-6xl text-[#8a9de9] mb-6 md:mb-10 font-bold">Contact Us</p>
        </div>
        <h2 className="text-sm font-extralight text-center mb-6">We’re a super friendly bunch and here to help you out with any query you may have. No question is too small, so don’t be shy! Just get in touch using the contact form below and one of our fantastic support team will get back to you as soon as possible. </h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Your email"
              className="border rounded-xl border-l-pink-100 w-96 mx-8 p-2"
            />
          </div>
          <div className="mb-4">
            <input
              required
              type="text"
              id="text"
              name="text"
              placeholder="Your Names"
              className="border rounded-xl border-l-pink-100 mx-8 w-96 p-2"
            />
          </div>
          <div>
            <textarea
              required
              name=""
              id=""
              className="mx-8 border rounded-xl border-l-pink-100 w-96 h-40"
              placeholder="Your message"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-80 ml-12 mt-8 flex justify-center mx-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a9de9] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Contact;

