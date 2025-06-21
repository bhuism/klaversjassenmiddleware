import { CircularProgress, Typography } from "@mui/material"
import type React from "react"
import ReloadButton from "~/components/button/ReloadButton"
import GameCompleted from "~/components/game/GameCompleted"
import useGameState from "~/hooks/useGameState"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import type { Route } from "./+types/GamePage"
//import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const GamePage: React.FC<Route.ComponentProps> = ({ params: { gameId } }) => {
	const { game, isLoading, error } = useGameState(gameId)

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
				<Typography>No Game</Typography>
				<ReloadButton />
			</CenterComponents>
		)
	}

	return <GameCompleted game={game} />
}

export default GamePage
