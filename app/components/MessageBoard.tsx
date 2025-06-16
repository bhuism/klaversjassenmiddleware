import { Button, Grid, TextField } from "@mui/material"
import React, { useState } from "react"
import useCardApi from "~/hooks/useGameApi"

const MessageBoard: React.FC = () => {
	const cardApi = useCardApi()
	const [message, setMessage] = useState<string>("")
	const ref = React.createRef<HTMLDivElement>()

	const send = () => {
		if (message && message.length > 0) {
			cardApi.sendAMesage({ message }).finally(() => {
				setMessage("")
				ref.current?.focus()
			})
		}
	}

	const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			send()
		}
	}

	return (
		<div>
			<Grid container spacing={2}>
				<Grid size={11}>
					<TextField
						inputRef={ref}
						fullWidth
						value={message}
						variant="outlined"
						onKeyDown={onKeyPress}
						onChange={(e) => setMessage(e.target.value)}
						autoFocus
					/>
				</Grid>
				<Grid size={1}>
					<Button variant="outlined" onClick={send}>
						Send
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default MessageBoard
