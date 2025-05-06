import CircularProgress from "@mui/material/CircularProgress"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import { useAuth } from "react-oidc-context"
import { Navigate, Outlet } from "react-router"
import MenuBar from "~/components/MenuBar"
import SocketGuard from "~/components/SocketGuard"
import CenterComponents from "~/utils/CenterComponents"

const RedirectToLogin: React.FC = () => {
	return <Navigate to="/login" />
}

const RootLayout: React.FC = () => {
	const auth = useAuth()

	const queryClient = new QueryClient()

	if (!auth.isAuthenticated) {
		auth.clearStaleState()
		return (
			<>
				<RedirectToLogin />
				<CenterComponents>
					<CircularProgress />
					<p>To Login thou shall go</p>
				</CenterComponents>
			</>
		)
	}

	return (
		<SocketGuard>
			<QueryClientProvider client={queryClient}>
				<MenuBar />
				<Outlet />
			</QueryClientProvider>
		</SocketGuard>
	)
}

export default RootLayout
