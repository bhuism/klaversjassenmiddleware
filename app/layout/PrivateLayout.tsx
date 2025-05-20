import { CircularProgress, Typography } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import { useAuth } from "react-oidc-context"
import { Navigate, Outlet, useLocation } from "react-router"
import MenuBar from "~/components/MenuBar"
import CenterComponents from "~/utils/CenterComponents"
import Star from "./Star"

const PrivateLayout: React.FC = () => {
	const { isAuthenticated, isLoading, error } = useAuth()
	const { pathname } = useLocation()
	const queryClient = new QueryClient()

	if (isLoading) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography>Auth is loading...</Typography>
			</CenterComponents>
		)
	}

	if (error) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography style={{ color: "red" }}>{error.message}</Typography>
			</CenterComponents>
		)
	}

	if (!isAuthenticated && pathname !== "/") {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		// biome-ignore lint/style/useTemplate: <explanation>
		console.error("Not authenticated: " + isAuthenticated + ", redirecting")
		return <Navigate to={"/"} />
	}

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
