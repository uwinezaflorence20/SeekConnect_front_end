import {
  HiOutlineViewGrid,
  
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,

} from "react-icons/hi";
import { IoIosPerson } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { IoMdDocument } from "react-icons/io";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: " AdminDashboard",
    path: "/dashboardadmin",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "product",
    label: "Lost Documents",
    path: "productadmin",
    icon: <IoMdDocument />,
  },
  {
    key: "transactions",
    label: "Lost Persons",
    path: "/transactions",
    icon: <IoIosPerson />,
  },
  {
    key: "Found person",
    label: "Found Person",
    path: "/orders",
    icon: <BsPersonFill />,
  },
  {
    key: "transactions",
    label: "Found document",
    path: "/foundd",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "customers",
    label: "All Users",
    path: "/customers",
    icon: <HiOutlineUsers />,
  },
  
  {
    key: "messages",
    label: "Messages",
    path: "/messages",
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
 
 
];
