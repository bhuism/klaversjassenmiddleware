import type React from "react"
import GameStatsLoader from "~/components/GameStatsLoader"
import PlayerSelection from "~/components/PlayerSelection"
import type { Route } from "./+types/GamePage"
//import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const GamePage: React.FC<Route.ComponentProps> = ({ params: { gameId } }) => {
	if (gameId && gameId.length === 20) {
		return <GameStatsLoader gameId={gameId} />
	}
	return <PlayerSelection />
}

export default GamePage
