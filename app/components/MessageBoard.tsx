import { Button, Container, Grid, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import useCardApi from "~/hooks/useGameApi"

const MessageBoard: React.FC = () => {
	const cardApi = useCardApi()
	const [message, setMessage] = useState<string>("")
	const inputRef = React.createRef<HTMLDivElement>()

	const { refetch, isLoading } = useQuery<boolean>({
		queryFn: ({ queryKey }) =>
			cardApi
				.sendMessage({ message: queryKey[1] as unknown as string })
				.then(() => setMessage(""))
				.finally(() =>
					setTimeout(() => {
						inputRef.current?.focus()
					}, 100)
				)
				.then(() => true),
		queryKey: ["message", message],
		refetchOnMount: false,
		enabled: false,
	})

	const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			refetch()
		}
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			inputRef.current?.focus()
		}, 100)

		return () => {
			clearTimeout(timeout)
		}
	}, [inputRef])

	return (
		<Container style={{ display: "flex", flexDirection: "column" }}>
			<Grid container spacing={2} padding={2}>
				<Grid size={11}>
					<TextField
						inputRef={inputRef}
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
						onClick={() => refetch()}
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
