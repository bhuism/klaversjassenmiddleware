import { PhaserGame } from "~/game/PhaserGame"
import type { GameState } from "~/types"

const PhaserComponent: React.FC<{ game: GameState }> = ({ game }) => {
	//	const phaserRef = useRef<IRefPhaserGame | null>(null)

	// const toggleFullScreen = () => {
	// 	phaserRef.current?.game?.scale.toggleFullscreen()
	// }

	return <PhaserGame gameState={game} />
}

export default PhaserComponent
