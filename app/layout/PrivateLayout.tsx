import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import { Outlet } from "react-router"
import MenuBar from "~/components/MenuBar"

const PrivateLayout: React.FC = () => {
	const queryClient = new QueryClient()

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<MenuBar />
				<Outlet />
			</QueryClientProvider>
		</>
	)
}

export default PrivateLayout
