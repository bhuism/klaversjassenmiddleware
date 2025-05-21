import { CloudOutlined } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { connectionMap } from "~/layout/SocketGuard"
import constants from "~/utils/constants"

const ConnectionStatusIcon = () => {
	const { readyState, sendMessage } = useWebSocket(constants.wsUrl, { share: true })
	return (
		<Tooltip title={connectionMap[readyState]}>
			<IconButton
				sx={{ mr: 1 }}
				aria-label={connectionMap[readyState]}
				onClick={() => sendMessage("syn")}
				style={{
					color:
						readyState === ReadyState.UNINSTANTIATED ||
						readyState === ReadyState.CLOSED ||
						readyState === ReadyState.CLOSING
							? "red"
							: readyState === ReadyState.CONNECTING || readyState === ReadyState.OPEN
								? "lightgreen"
								: undefined,
				}}
				className={readyState === ReadyState.CONNECTING || readyState === ReadyState.CLOSING ? "blink" : undefined}
			>
				<CloudOutlined />
			</IconButton>
		</Tooltip>
	)
}

export default ConnectionStatusIcon
