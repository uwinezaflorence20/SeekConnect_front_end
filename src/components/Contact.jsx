import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
const Contact = () => {
  return (
    <div>
<section >
  <div class="mx-auto  mt-10 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div class="lg:col-span-2 lg:py-12">
        <p className="text-4xl text-center mb-12 font-bold">Contact Us</p>
        <p class="max-w-xl text-lg font-light">
          Wanna send message or have any question? We are here for you . you can tell us your question.
        </p>
<div>
        <div class=" flex gap-4 mt-8">
         <FaPhoneVolume  className="mt-2 text-[#8a9de9]"/>  <a href="#" class="text-xl  text-[#8a9de9]">+250 79124543</a>
</div>
<div class=" flex gap-4 mt-8">
         <FaLocationDot className="mt-2 text-[#8a9de9]"/>  <a href="#" class="text-xl  text-[#8a9de9]">Email Us</a>
</div>
<div class=" flex gap-4 mt-8">
         <MdOutlineMail className="mt-2 text-[#8a9de9]"/>  <a href="#" class="text-xl  text-[#8a9de9]">Kigali Rwanda</a>
</div>
          
        </div>
      </div>

      <div class="rounded-lg bg-gray-100 p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form action="#" class="space-y-4">
          <div>
            <label class="sr-only" for="name">Name</label>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
            />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="sr-only" for="email">Email</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
              />
            </div>

            <div>
              <label class="sr-only" for="phone">Phone</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                id="phone"
              />
            </div>
          </div>

         

          <div>
            <label class="sr-only" for="message">Message</label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
            ></textarea>
          </div>

          <div class="mt-4">
            <button
              type="submit"
              class="inline-block w-full  rounded-lg bg-[#8a9de9] hover:bg-indigo-700 ml-4 px-20 py-3 font-medium text-white sm:w-auto"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Contact
