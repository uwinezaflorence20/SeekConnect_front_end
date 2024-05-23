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
    label: "Lost Items",
    path: "/product",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Found Items",
    path: "/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "All Users",
    path: "/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <HiOutlineDocumentText />,
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
