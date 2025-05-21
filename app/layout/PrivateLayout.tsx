import { CircularProgress, Typography } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import { useState } from "react"
import { useAuth } from "react-oidc-context"
import { Navigate, Outlet, useLocation } from "react-router"
import LoginButton from "~/components/LoginButton"
import MenuBar from "~/components/MenuBar"
import CenterComponents from "~/utils/CenterComponents"
import Star from "./Star"

const PrivateLayout: React.FC = () => {
	const { isAuthenticated, isLoading, error, activeNavigator, removeUser } = useAuth()
	const { pathname } = useLocation()
	const queryClient = new QueryClient()
	const [hasError, setHasError] = useState<boolean>(false)

	if (activeNavigator) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography>{activeNavigator}</Typography>
			</CenterComponents>
		)
	}
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
		setHasError(true)
		removeUser().then(() => setHasError(false))

		if (hasError) {
			return (
				<CenterComponents>
					<Star />
					<CircularProgress />
					<Typography style={{ color: "red" }}>
						{error.name}:{error.message}
					</Typography>
				</CenterComponents>
			)
		}

		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography style={{ color: "red" }}>
					{error.name}:{error.message}
				</Typography>
				<LoginButton />
			</CenterComponents>
		)
	}

	if (!isAuthenticated && pathname !== "/") {
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
