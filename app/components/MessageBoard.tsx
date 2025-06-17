import { Button, Container, Grid, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import useCardApi from "~/hooks/useGameApi"

const MessageBoard: React.FC = () => {
	const cardApi = useCardApi()
	const [message, setMessage] = useState<string>("")
	const ref = React.createRef<HTMLDivElement>()

	const { refetch, isLoading } = useQuery<boolean>({
		queryFn: ({ queryKey }) => cardApi.sendMessage({ message: queryKey[1] as unknown as string }).then(() => true),
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
		<Container style={{ display: "flex", flexDirection: "column" }}>
			<Grid container spacing={2} padding={2}>
				<Grid size={11}>
					<TextField
						inputRef={ref}
						size="small"
						fullWidth
						disabled={isLoading}
						value={message}
						variant="outlined"
						onKeyDown={onKeyPress}
						onChange={(e) => setMessage(e.target.value)}
						autoFocus
					/>
				</Grid>
				<Grid size={1} display="flex" justifyContent="center" alignItems="center">
					<Button
						variant="contained"
						onClick={() => refetch().then(() => setMessage(""))}
						disabled={isLoading || message === undefined || message.length === 0}
					>
						Send
					</Button>
				</Grid>
			</Grid>
		</Container>
	)
}

export default MessageBoard
