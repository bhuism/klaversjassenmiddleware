import { useCallback } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import constants from "~/utils/constants"

const MessageBoard: React.FC = () => {
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(constants.wsUrl, {
		share: true,
	})

	const handleClickSendMessage = useCallback(
		() => sendJsonMessage({ key: Math.random().toString(36).substring(2, 7) }),
		[sendJsonMessage]
	)

	return (
		<div>
			<button
				type="button"
				onClick={handleClickSendMessage}
				className="button"
				disabled={readyState !== ReadyState.OPEN}
			>
				Send
			</button>
			<p>{`${JSON.stringify(lastJsonMessage)}`}</p>
		</div>
	)
}

export default MessageBoard
