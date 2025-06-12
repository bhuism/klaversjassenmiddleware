import type React from "react"
import { Outlet } from "react-router"

const PrivateLayout: React.FC = () => {
	return <Outlet />
}

export default PrivateLayout
