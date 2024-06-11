import React from 'react'
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import Lostitem from '../Admin/Lostitem'
import Header from'../Admin/sharedAdmin/Header'
import FoundItems from './FoundItems';
import Foundperson from './Foundperson';
import Lostpeople from '../Admin/LostPeople';
const Dashboard = () => {
  return (
    <div>
      <Header/>
        <Lostpeople/>
       <Lostitem/> 
     
     
    </div>
  )
}

export default Dashboard
