import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DialogsProvider } from "@toolpad/core/useDialogs"
import type React from "react"
import { Outlet } from "react-router"
import { UidContextProvider } from "~/provider/UidContextProvider"

const PrivateLayout: React.FC = () => {
	const queryClient = new QueryClient()
	//	const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<MessageType>(constants.wsUrl, { share: true })

	return (
		<DialogsProvider>
			<QueryClientProvider client={queryClient}>
				<UidContextProvider>
					<Outlet />
				</UidContextProvider>
			</QueryClientProvider>
		</DialogsProvider>
	)
}

export default PrivateLayout
