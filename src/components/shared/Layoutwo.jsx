import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Headeruser from '../../Admin/sharedAdmin/Headeruser';

export default function Layoutwo() {
  return (
    <div className="flex flex-row bg-gray-100 h-screen w-screen">
      <Sidebar />
      <div className="flex-grow overflow-y-auto relative">
       <Headeruser/>
        <div >
          <Outlet className="  absolute top-0 bottom-0 left-0 right-0 overflow-y-auto" />
        </div>
      </div> 
    </div>
  );
}
