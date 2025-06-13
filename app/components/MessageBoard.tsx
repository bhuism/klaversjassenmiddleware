import { Stack, TextField } from "@mui/material"
import useCardApi from "~/hooks/useGameApi"
import CenterComponents from "~/utils/CenterComponents"

const MessageBoard: React.FC = () => {
	const cardApi = useCardApi()

	// const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(constants.wsUrl, {
	// 	share: true,
	// })

	//const { sendJsonMessage, lastJsonMessage, readyState } = useContext(WebSocketContext)

	// const generateRandom = () => {
	// 	return Math.random().toString(36).substring(2, 10)
	// }

	// const [value] = useState<string>(generateRandom())

	// useEffect(() => {
	// 	if (sendJsonMessage) {
	// 		sendJsonMessage({ type: "message", message: value })
	// 	}
	// }, [sendJsonMessage, value])

	return (
		<div>
			<CenterComponents>
				<Stack>
					<TextField
						id="outlined-basic"
						label="Outlined"
						variant="outlined"
						onChange={(e) => cardApi.sendAMesage({ message: e.target.value })}
					/>
				</Stack>
			</CenterComponents>
		</div>
	)
}

export default MessageBoard
