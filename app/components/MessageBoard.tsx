import { Button, Typography } from "@mui/material"
import { useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import useDidUpdateEffect from "~/hooks/useDidUpdateEffect"
import constants from "~/utils/constants"

const MessageBoard: React.FC = () => {
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(constants.wsUrl, {
		share: true,
	})

	const [value, setValue] = useState<string>()

	useDidUpdateEffect(() => {
		sendJsonMessage({ key: value })
	}, [sendJsonMessage, value])

	return (
		<div>
			<Button
				type="button"
				variant="outlined"
				onClick={() => setValue(Math.random().toString(36).substring(2, 7))}
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
