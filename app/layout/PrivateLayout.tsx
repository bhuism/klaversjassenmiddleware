import { CircularProgress, Typography } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import { useAuth } from "react-oidc-context"
import { Navigate, Outlet, useLocation } from "react-router"
import useWebSocket from "react-use-websocket"
import LoginButton from "~/components/LoginButton"
import MenuBar from "~/components/menu/MenuBar"
import WebSocketContext from "~/context/WebSocketContext"
import type { MessageType } from "~/provider/SocketGuard"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import Star from "./Star"

const PrivateLayout: React.FC = () => {
	const { isAuthenticated, isLoading, error, activeNavigator, removeUser } = useAuth()
	const { pathname } = useLocation()
	const queryClient = new QueryClient()
	const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<MessageType>(constants.wsUrl, { share: true })

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
		removeUser()
		return (
			<CenterComponents>
				<Star />
				<Typography style={{ color: "red" }}>
					{error.name}:{error.message}
				</Typography>
				<LoginButton />
			</CenterComponents>
		)
	}

	if (!isAuthenticated && pathname !== "/") {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.log("to root thou shall go")
		return <Navigate to={"/"} />
	}

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<WebSocketContext.Provider value={{ readyState, sendJsonMessage, lastJsonMessage }}>
					<MenuBar />
					<Outlet />
				</WebSocketContext.Provider>
			</QueryClientProvider>
		</>
	)
}

export default PrivateLayout
