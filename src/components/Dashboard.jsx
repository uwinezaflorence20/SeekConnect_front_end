import React from 'react'
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import Lostitem from '../Admin/Lostitem'
const Dashboard = () => {
  return (
    <div>
       <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4"
        />
      </div>
       <Lostitem/>
    </div>
  )
}

export default Dashboard
