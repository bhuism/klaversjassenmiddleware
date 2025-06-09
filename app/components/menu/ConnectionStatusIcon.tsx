import { CloudOutlined } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { useContext } from "react"
import { ReadyState } from "react-use-websocket"
import WebSocketContext from "~/context/WebSocketContext"
import { connectionMap } from "~/provider/SocketGuard"

const ConnectionStatusIcon = () => {
	const { readyState, sendMessage } = useContext(WebSocketContext)

	// export declare enum ReadyState {
	//     UNINSTANTIATED = -1,
	//     CONNECTING = 0,
	//     OPEN = 1,
	//     CLOSING = 2,
	//     CLOSED = 3
	// }

	const readyStateColorMap: Record<ReadyState, string> = {
		"-1": "gray",
		"0": "blue",
		"1": "lightgreen",
		"2": "lightred",
		"3": "red",
	}

	return (
		<Tooltip title={readyState ? connectionMap[readyState] : ""}>
			<IconButton
				sx={{ mr: 1 }}
				aria-label={readyState ? connectionMap[readyState] : ""}
				onClick={() => (sendMessage ? sendMessage("syn") : {})}
				style={{
					color: readyState ? readyStateColorMap[readyState] : "gray",
				}}
				className={readyState === ReadyState.CONNECTING || readyState === ReadyState.CLOSING ? "blink" : undefined}
			>
				<CloudOutlined />
			</IconButton>
		</Tooltip>
	)
}

export default ConnectionStatusIcon
