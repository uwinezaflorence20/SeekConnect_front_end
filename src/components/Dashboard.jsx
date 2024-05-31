import React from 'react'
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import Lostitem from '../Admin/Lostitem'
import Header from'../Admin/sharedAdmin/Header'
const Dashboard = () => {
  return (
    <div>
      <Header/>
       
       <Lostitem/>
    </div>
  )
}

export default Dashboard
