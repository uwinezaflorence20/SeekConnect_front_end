import React, { useState } from 'react';
import axios from 'axios';
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://seekconnect-backend-1.onrender.com/contactUs', formData);
      setResponseMessage('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setResponseMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section>
        <div className="mx-auto mt-10 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="text-4xl text-center mb-12 font-bold">Contact Us</p>
              <p className="max-w-xl text-lg font-light">
                Wanna send a message or have any questions? We are here for you. You can tell us your questions.
              </p>
              <div>
                <div className="flex gap-4 mt-8">
                  <FaPhoneVolume className="mt-2 text-[#8a9de9]" />
                  <a href="tel:+25079124543" className="text-xl text-[#8a9de9]">+250 79124543</a>
                </div>
                <div className="flex gap-4 mt-8">
                  <MdOutlineMail className="mt-2 text-[#8a9de9]" />
                  <a href="mailto:info@example.com" className="text-xl text-[#8a9de9]">Email Us</a>
                </div>
                <div className="flex gap-4 mt-8">
                  <FaLocationDot className="mt-2 text-[#8a9de9]" />
                  <p className="text-xl text-[#8a9de9]">Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-100 p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="name">Name</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">Email</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">Phone</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Phone Number"
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">Message</label>
                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Message"
                    rows="8"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-[#8a9de9] hover:bg-indigo-700 ml-4 px-20 py-3 font-medium text-white sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {responseMessage && <p className="mt-4 text-center text-lg">{responseMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
