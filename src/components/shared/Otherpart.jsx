import React from 'react';
import { GoArrowRight } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

const Otherpart = () => {
  const { user } = useUser();
  const { name, email } = user;

  return (
    <div>
      <div className="w-80 p-3 mt-12 flex flex-col">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-400 rounded-full text-4xl font-thin pl-1 w-12 h-12">
            <FaRegCircleUser className="mt-1.5" />
          </div>
          <div>
            <p className="text-sm ml-4">Hi, {name}</p>
            <p className="text-sm ml-4 font-thin">{email}</p>
            <Link to="/">
              <button className="bg-[#8a9de9] ml-4 text-white px-1 py-1 rounded-lg">Logout</button>
            </Link>
          </div>
        </div>
        <div className="mt-10 w-60 p-8 bg-[#8a9de9]">
          <p className="bg-[#8a9de9] text-white font-light text-lg px-4 py-2">Run Image Search</p>
          <p className="bg-[#8a9de9] text-white ml-4 font-extralight text-sm">Find missing person with simple image</p>
          <GoArrowRight className='text-white mt-8 ml-36' />
        </div>
      </div>
    </div>
  );
};

export default Otherpart;
