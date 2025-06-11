import { createContext } from "react"
// biome-ignore lint/complexity/noBannedTypes: <explanation>
type WebSocketContextType = {}

const WebSocketContext = createContext<WebSocketContextType>({})

export default WebSocketContext
