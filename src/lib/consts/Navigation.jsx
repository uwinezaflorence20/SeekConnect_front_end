import {
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'Home',
		label: 'Home',
		path: '/dash',
		icon: <CiHome />
	},
	{
		key: 'My items',
		label: 'My items',
		path: '/products',
		icon: <CiUser />

	},
	{
		key: 'Bookmarks',
		label: 'bookmarks',
		path: '/orders',
		icon: <CiBookmark />
	},
	
	
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
