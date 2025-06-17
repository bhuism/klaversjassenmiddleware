import CompletedInfo from "./game/CompletedInfo"
import CompletedPlayerCards from "./game/CompletedPlayerCards"
import CompletedTricks from "./game/CompletedTricks"
import type { Game } from ".generated-sources/openapi"

const GameCompleted: React.FC<{ game: Game }> = ({ game }) => {
	if (game.turns.length !== 32) {
		throw new Error("game should be finished")
	}

	return (
		<>
			<CompletedInfo game={game} />
			<CompletedTricks game={game} />
			<CompletedPlayerCards game={game} />
		</>
	)
}

export default GameCompleted
