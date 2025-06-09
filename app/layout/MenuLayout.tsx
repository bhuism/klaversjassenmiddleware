import type React from "react"
import { Outlet } from "react-router"
import MenuBar from "~/components/menu/MenuBar"

const MenuLayout: React.FC = () => {
	return (
		<>
			<MenuBar />
			<Outlet />
		</>
	)
}

export default MenuLayout
