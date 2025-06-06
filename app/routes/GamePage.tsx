import type React from "react"
import Game from "~/components/Game"
import PlayerSelection from "~/components/PlayerSelection"
import type { Route } from "./+types/GamePage"
//import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const GamePage: React.FC<Route.ComponentProps> = ({ params: { gameId } }) => {
	if (gameId && gameId.length === 20) {
		return <Game gameId={gameId} />
	}

	return <PlayerSelection />
}

export default GamePage
