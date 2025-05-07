import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import { Outlet } from "react-router"
import MenuBar from "~/components/MenuBar"
import SocketGuard from "~/components/SocketGuard"

const PrivateLayout: React.FC = () => {
	const queryClient = new QueryClient()

	return (
		<SocketGuard>
			<QueryClientProvider client={queryClient}>
				<MenuBar />
				<Outlet />
			</QueryClientProvider>
		</SocketGuard>
	)
}

export default PrivateLayout
