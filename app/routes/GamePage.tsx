import { CircularProgress, Typography } from "@mui/material"
import type React from "react"
import GameCompleted from "~/components/GameCompleted"
import useGame from "~/hooks/useGame"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import type { Route } from "./+types/GamePage"
//import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const GamePage: React.FC<Route.ComponentProps> = ({ params: { gameId } }) => {
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

	return <GameCompleted game={game} />
}

export default GamePage
