import { useSnackbar } from "notistack"
import type { PropsWithChildren } from "react"
import React from "react"
import { ReadyState } from "react-use-websocket"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import WebSocketContext from "~/context/WebSocketContext"
import constants from "~/utils/constants"

export const connectionMap = {
	[ReadyState.CONNECTING]: "Connecting",
	[ReadyState.OPEN]: "Connected",
	[ReadyState.CLOSING]: "Closing",
	[ReadyState.CLOSED]: "Closed",
	[ReadyState.UNINSTANTIATED]: "Uninstantiated",
}

export type MessageType = {
	type: "message"
	text: string
}

export const webSocketContext = React.createContext(WebSocketContext)

const SocketGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()

	const { readyState, sendJsonMessage, lastJsonMessage, sendMessage } = useWebSocket<MessageType>(constants.wsUrl, {
		onOpen: () => sendMessage("syn"),
		// onClose: () => console.log("disconnected"),
		onError: (event: WebSocketEventMap["error"]) => console.error(JSON.stringify(event)),
		disableJson: false,
		reconnectInterval: (attemptNumber) => Math.min(2 ** attemptNumber * 100, 10000),
		retryOnError: true,
		share: true,
		shouldReconnect: () => true,
		heartbeat: {
			message: "syn",
			returnMessage: "ack",
			timeout: 60000,
			interval: 25000,
		},
		filter: (message): boolean => {
			if ("syn" === message.data) {
				// biome-ignore lint/nursery/noProcessEnv: <explanation>
				if ("development" === process.env.NODE_ENV) {
					enqueueSnackbar("Got SYN", { variant: "success" })
				}
				sendMessage("ack")
				return false
			}
			if ("ack" === message.data) {
				// biome-ignore lint/nursery/noProcessEnv: <explanation>
				if ("development" === process.env.NODE_ENV) {
					enqueueSnackbar("Got ACK", { variant: "success" })
				}
				return false
			}
			return true
		},
	})

	// useEffect(() => {
	// 	enqueueSnackbar(`${connectionMap[readyState]}...`, { variant: readyState === ReadyState.CLOSED ? "error" : "info" })
	// }, [enqueueSnackbar, readyState])

	return (
		<WebSocketContext.Provider value={{ readyState, sendJsonMessage, lastJsonMessage, sendMessage }}>
			{children}
		</WebSocketContext.Provider>
	)
}

export default SocketGuard
