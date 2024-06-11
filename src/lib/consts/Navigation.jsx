import {
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'Home',
		label: 'Home',
		path: '/dash',
		icon: <CiHome />
	},
	{
		key: 'Lost items',
		label: 'Lost Items',
		path: 'product',
		icon: <CiUser />

	},{
		key: 'Found items',
		label: 'Found Items',
		path: '/founditems',
		icon: <CiUser />

	},
	
	
	
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'Logout',
		label: 'Logout',
		path: '/',
		icon: <IoLogOutOutline />,
	},
	
]
