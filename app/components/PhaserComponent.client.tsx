import { useRef } from "react"
import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const PhaserComponent: React.FC = () => {
	const phaserRef = useRef<IRefPhaserGame | null>(null)

	const toggleFullScreen = () => {
		phaserRef.current?.game?.scale.toggleFullscreen()
	}

	return (
		<>
			<button type="button" onClick={toggleFullScreen} className="button">
				fullscreen
			</button>

			<PhaserGame ref={phaserRef} />
		</>
	)
}

export default PhaserComponent
