import { createContext } from "react"
import type { ReadyState } from "react-use-websocket"
import type { SendJsonMessage } from "react-use-websocket/dist/lib/types"
import type { MessageType } from "~/provider/SocketGuard"

type WebSocketContextType = {
	sendJsonMessage: SendJsonMessage | undefined
	lastJsonMessage: MessageType | undefined
	readyState: ReadyState | undefined
}

const WebSocketContext = createContext<WebSocketContextType>({
	lastJsonMessage: undefined,
	readyState: undefined,
	sendJsonMessage: undefined,
})

export default WebSocketContext
