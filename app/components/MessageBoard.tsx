import { Stack, TextField } from "@mui/material"
import { useState } from "react"
import useCardApi from "~/hooks/useGameApi"

const MessageBoard: React.FC = () => {
	const cardApi = useCardApi()
	const [message, setMessage] = useState<string>("")

	const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
		</div>
	)
}

export default MessageBoard
