import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/Navigation';
import { Link, useLocation } from 'react-router-dom';

const linkClasses = "flex item-center gap-2 text-xl px-3 py-2 hover:bg-neutral-100 hover:no-underline rounded-sm text-base";

export default function Sidebar() {
  return (
    <div className=" ml-40 mt-8 w-60 p-3 flex flex-col text-[#8a9de9]">
     
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
    <Link to={item.path} className={`${pathname === item.path ? '' : ''} ${linkClasses}`}>
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
