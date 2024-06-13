import React, { Fragment, useState, useEffect } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { Popover, Transition, Menu } from "@headlessui/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UserContext";

function Headeruser() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex ml-auto items-center gap-2 mr-2">
        

        <Menu as="div" className="relative inline-block text-left">
          <div className="inline-flex">
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/80x80?face")',
                }}
              >
                <span className="sr-only">{user ? user.name : "User"}</span>
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-2 text-gray-700">
                <p className="font-medium">{user ? user.name : "User Name"}</p>
                <p className="text-sm">{user ? user.email : "user@example.com"}</p>
              </div>
            
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default Headeruser;
