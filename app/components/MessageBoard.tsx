import { Button, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { ReadyState } from "react-use-websocket"
import WebSocketContext from "~/context/WebSocketContext"

const MessageBoard: React.FC = () => {
	// const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(constants.wsUrl, {
	// 	share: true,
	// })

	const { sendJsonMessage, lastJsonMessage, readyState } = useContext(WebSocketContext)

	const generateRandom = () => {
		return Math.random().toString(36).substring(2, 10)
	}

	const [value, setValue] = useState<string>(generateRandom())

	useEffect(() => {
		if (sendJsonMessage) {
			sendJsonMessage({ type: "message", message: value })
		}
	}, [sendJsonMessage, value])

	return (
		<div>
			<Button
				type="button"
				variant="outlined"
				onClick={() => setValue(generateRandom())}
				disabled={readyState !== ReadyState.OPEN}
			>
				Send
			</Button>
			<Typography>{`value: ${value}`}</Typography>
			<Typography>{`lastJsonMessage: ${JSON.stringify(lastJsonMessage)}`}</Typography>
		</div>
	)
}

export default MessageBoard
