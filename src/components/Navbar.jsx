import React, { useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-[#0187D0]" href="#">
                <SlArrowDown className='ml-12  text-[#8a9de9] text-3xl '/>
                <p className="text-xl text-[#8a9de9] font-bold">SeekConnect</p>
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-lg">
                  <NavLink to="/">
                    <a className=" text-[#8a9de9]  transition hover:text-gray-500/75" href="#">Home </a>
                  </NavLink>

                  <NavLink to="/about">
                    <a className=" text-[#8a9de9]  transition hover:text-gray-500/75" href="/about">About</a>
                  </NavLink>

                  <NavLink to="/Features">
                    <a className=" text-[#8a9de9] transition hover:text-gray-500/75" href="#">Features</a>
                  </NavLink>

                  <NavLink to="/contact">
                    <a className=" text-[#8a9de9] transition hover:text-gray-500/75" href="#">Contact</a>
                  </NavLink>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link to="/signin">
                    <button className="rounded-full flex gap-4 px-5 py-2 text-sm bg-[#8a9de9] hover:bg-indigo-700 text-white shadow">
                      <a href="#">
                        Sign in
                      </a><FaArrowRightLong className="mt-1" />
                    </button>
                  </Link>
                </div>

                <div className="block bg md:hidden">
                  <button onClick={toggleMenu} className="rounded animate-bounce bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <CiMenuBurger />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded shadow">
          <ul className="py-2">
            <li>
              <NavLink to="/">
                <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu} href="#">
                  Home
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu} href="/about">
                  About
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu} href="#">
                  Features
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu} href="#">
                  Contact
                </a>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
