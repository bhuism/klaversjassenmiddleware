import { Stack, TextField } from "@mui/material"
import { useState } from "react"
import useCardApi from "~/hooks/useGameApi"
import CenterComponents from "~/utils/CenterComponents"

const MessageBoard: React.FC = () => {
	const cardApi = useCardApi()
	const [message, setMessage] = useState<string>("")

	const onKeyPress = (e: unknown) => {
		if (e.key === "Enter") {
			e.preventDefault()
			if (message && message.length > 0) {
				cardApi.sendAMesage({ message })
			}
			setMessage("")
		}
	}

	return (
		<div>
			<CenterComponents>
				<Stack>
					<TextField
						id="outlined-basic"
						label="Outlined"
						value={message}
						variant="outlined"
						onKeyDown={onKeyPress}
						onChange={(e) => setMessage(e.target.value)}
						autoFocus
					/>
				</Stack>
			</CenterComponents>
		</div>
	)
}

export default MessageBoard
