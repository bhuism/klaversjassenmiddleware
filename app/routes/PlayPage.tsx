import { CircularProgress, Container, Typography } from "@mui/material"
import type React from "react"
import GamePlay from "~/components/GamePlay"
import useGame from "~/hooks/useGame"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import type { Route } from "./+types/GamePage"

const PlayPage: React.FC<Route.ComponentProps> = ({ params: { gameId } }) => {
	const { game, isLoading, error } = useGame(gameId)

	if (error) {
		return <span style={{ color: "red" }}>{error.message}</span>
	}

	if (isLoading) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>Game ${gameId} is loading...</Typography>
			</CenterComponents>
		)
	}

	if (!game) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>No Game</Typography>
			</CenterComponents>
		)
	}

	return (
		<Container
			maxWidth={false}
			style={{
				width: "100vw",
				height: "100vh",
				margin: 0,
				padding: 0,
				border: 0,
				maxWidth: "100%",
				maxHeight: "100%",
			}}
		>
			<GamePlay game={game} />
		</Container>
	)
}

export default PlayPage
