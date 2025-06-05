import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DialogsProvider } from "@toolpad/core/useDialogs"
import type React from "react"
import { Outlet } from "react-router"
import useWebSocket from "react-use-websocket"
import MenuBar from "~/components/menu/MenuBar"
import WebSocketContext from "~/context/WebSocketContext"
import type { MessageType } from "~/provider/SocketGuard"
import { UidContextProvider } from "~/provider/UidContextProvider"
import constants from "~/utils/constants"

const PrivateLayout: React.FC = () => {
	const queryClient = new QueryClient()
	const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<MessageType>(constants.wsUrl, { share: true })

	return (
		<DialogsProvider>
			<QueryClientProvider client={queryClient}>
				<UidContextProvider>
					<WebSocketContext.Provider value={{ readyState, sendJsonMessage, lastJsonMessage }}>
						<MenuBar />
						<Outlet />
					</WebSocketContext.Provider>
				</UidContextProvider>
			</QueryClientProvider>
		</DialogsProvider>
	)
}

export default PrivateLayout
