import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

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
    icon: <HiOutlineCube />,
  },
  {
    key: "transactions",
    label: "Lost Persons",
    path: "/transactions",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "Found person",
    label: "Found Person",
    path: "/orders",
    icon: <HiOutlineShoppingCart />,
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
  
  // {
  //   key: "messages",
  //   label: "Messages",
  //   path: "/messages",
  //   icon: <HiOutlineAnnotation />,
  // },
  {
    key: "messages",
    label: "Messages",
    path: "/messages",
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
