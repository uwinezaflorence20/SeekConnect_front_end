import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


export default function Layoutwo() {
  return (
    <div className="flex flex-row bg-white h-screen w-screen">
      <Sidebar />
      <div className="flex-grow overflow-y-auto relative">
       
        <div >
          <Outlet className="  absolute top-0 bottom-0 left-0 right-0 overflow-y-auto" />
        </div>
      </div> 
    </div>
  );
}
