import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Otherpart from './Otherpart'
export default function Layoutwo() {
  return (
    <div className="flex flex-row  bg-white h-screen w-screen ">
      
      <Sidebar/>
       
      <div className=''>
      <div></div>
      <div className=''>{<Outlet/>}</div>
     
      </div>
    <Otherpart/>
    </div>
  )
}
 