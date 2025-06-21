import CompletedInfo from "./CompletedInfo"
import CompletedPlayerCards from "./CompletedPlayerCards"
import CompletedTricks from "./CompletedTricks"
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
