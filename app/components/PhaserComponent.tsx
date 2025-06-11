import { PhaserGame } from "~/game/PhaserGame"
import type { Game } from ".generated-sources/openapi"

const PhaserComponent: React.FC<{ game: Game }> = ({ game }) => {
	//	const phaserRef = useRef<IRefPhaserGame | null>(null)

	// const toggleFullScreen = () => {
	// 	phaserRef.current?.game?.scale.toggleFullscreen()
	// }

	return <PhaserGame gameState={game} />
}

export default PhaserComponent
