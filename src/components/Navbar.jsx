import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  return (
    <div>
      <header class="bg-white ">
        <div class="mx-auto  max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex-1 md:flex md:items-center md:gap-12">
              <a class="block text-[#0187D0]" href="#">
                <p className="text-xl text-[#8a9de9] font-bold">SeekConnect</p>
              </a>
            </div>

            <div class="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" class="hidden md:block">
                <ul class="flex items-center gap-6 text-lg">
                  <NavLink to="/">
                    <a class=" text-[#8a9de9]  transition hover:text-gray-500/75" href="#">Home </a>
                  </NavLink>

                  <NavLink>
                    <a class=" text-[#8a9de9]  transition hover:text-gray-500/75" href="#">About</a>
                  </NavLink>

                  <NavLink>
                    <a class=" text-[#8a9de9] transition hover:text-gray-500/75" href="#">Features</a>
                  </NavLink>

                  <NavLink>
                    <a class=" text-[#8a9de9] transition hover:text-gray-500/75" href="#">Contact</a>
                  </NavLink>
                </ul>
              </nav>

              <div class="flex items-center gap-4">
                <div class="sm:flex sm:gap-4">
                  <button class=" rounded-full flex  gap-4 px-5 py-1 text-sm bg-[#8a9de9]  hover:bg-indigo-700   text-white shadow">
                    <a href="#">
                      Sign in
                    </a><FaArrowRightLong className="mt-1" />
                  </button>
                </div>

                <div class="block md:hidden">
                  <button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <CiMenuBurger />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
