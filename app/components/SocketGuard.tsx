import { useSnackbar } from "notistack"
import { type PropsWithChildren, useEffect } from "react"
import { ReadyState } from "react-use-websocket"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import constants from "~/utils/constants"

const SocketGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()

	const { readyState, sendMessage } = useWebSocket(constants.wsUrl, {
		// onOpen: () => console.log("connected"),
		// onClose: () => console.log("disconnected"),
		onError: (event: WebSocketEventMap["error"]) => console.error(JSON.stringify(event)),
		disableJson: false,
		reconnectInterval: (attemptNumber) => Math.min(2 ** attemptNumber * 1000, 10000),
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
			if ("syn" !== message.data) {
				sendMessage("ack")
				return false
			}
			return true
		},
	})

	useEffect(() => {
		const connectionMap = {
			[ReadyState.CONNECTING]: "Connecting",
			[ReadyState.OPEN]: "Connected",
			[ReadyState.CLOSING]: "Closing",
			[ReadyState.CLOSED]: "Closed",
			[ReadyState.UNINSTANTIATED]: "Uninstantiated",
		}

		enqueueSnackbar(`${connectionMap[readyState]}...`, { variant: "success" })
	}, [enqueueSnackbar, readyState])

	return <>{children}</>
}

export default SocketGuard
