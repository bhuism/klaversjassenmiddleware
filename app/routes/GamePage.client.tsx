import { useRef } from "react"
import { useParams } from "react-router"
import GameComponent from "~/components/GameComponent"
import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const GamePage: React.FC = () => {
	const phaserRef = useRef<IRefPhaserGame | null>(null)

	const toggleFullScreen = () => {
		phaserRef.current?.game?.scale.toggleFullscreen()
	}

	const { gameId } = useParams()

	return (
		<>
			<button type="button" onClick={toggleFullScreen} className="button">
				fullscreen
			</button>

			{gameId ? <GameComponent gameId={gameId} /> : <div>Game {gameId} not found</div>}

			<PhaserGame ref={phaserRef} />
		</>
	)
}

export default GamePage
