import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/Navigation';
import { Link, useLocation } from 'react-router-dom';

const linkClasses = "flex item-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex item-center gap-2 px-1 py-3">
        <FcBullish className="text-2xl" />
        <span className='text-neutral-100 text-lg'>SeekConnect</span>
      </div>
      <div className="flex-1 py-8 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(item => (
        <SidebarLink key={item.key} item={item} />
      ))}
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link to={item.path} className={`${pathname === item.path ? 'text-white' : ''} ${linkClasses}`}>
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
