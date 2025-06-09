import { useRef } from "react"
import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"
import type { GameState } from "~/types"

const PhaserComponent: React.FC<{ game: GameState }> = ({ game }) => {
	const phaserRef = useRef<IRefPhaserGame | null>(null)

	// const toggleFullScreen = () => {
	// 	phaserRef.current?.game?.scale.toggleFullscreen()
	// }

	return <PhaserGame ref={phaserRef} gameState={game} />
}

export default PhaserComponent
