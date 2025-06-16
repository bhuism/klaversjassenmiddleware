import { Button, Grid, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import useCardApi from "~/hooks/useGameApi"

const MessageBoard: React.FC = () => {
	const cardApi = useCardApi()
	const [message, setMessage] = useState<string>("")
	const ref = React.createRef<HTMLDivElement>()

	const { refetch, isLoading } = useQuery<boolean>({
		queryFn: ({ queryKey }) => {
			if (message && message.length > 0) {
				return cardApi.sendAMessage({ message: queryKey[1] as unknown as string }).then(() => true)
			}
			return Promise.resolve(true)
		},
		queryKey: ["message", message],
		refetchOnMount: false,
		enabled: false,
	})

	const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			refetch().then(() => setMessage(""))
		}
	}

	return (
		<div>
			<Grid container spacing={2}>
				<Grid size={11}>
					<TextField
						inputRef={ref}
						fullWidth
						disabled={isLoading}
						value={message}
						variant="outlined"
						onKeyDown={onKeyPress}
						onChange={(e) => setMessage(e.target.value)}
						autoFocus
					/>
				</Grid>
				<Grid size={1}>
					<Button
						variant="outlined"
						onClick={() => refetch().then(() => setMessage(""))}
						disabled={isLoading || message === undefined || message.length === 0}
					>
						Send
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default MessageBoard
