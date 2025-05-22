import { useSnackbar } from "notistack"
import type { PropsWithChildren } from "react"
import { ReadyState } from "react-use-websocket"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
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

const SocketGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()

	const { sendMessage } = useWebSocket<MessageType>(constants.wsUrl, {
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
				enqueueSnackbar("Got SYN", { variant: "success" })
				sendMessage("ack")
				return false
			}
			if ("ack" === message.data) {
				enqueueSnackbar("Got ACK", { variant: "success" })
				return false
			}
			return true
		},
	})

	// useEffect(() => {
	// 	enqueueSnackbar(`${connectionMap[readyState]}...`, { variant: readyState === ReadyState.CLOSED ? "error" : "info" })
	// }, [enqueueSnackbar, readyState])

	return <>{children}</>
}

export default SocketGuard
