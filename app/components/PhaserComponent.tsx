import { Button } from "@mui/material"
import { useRef } from "react"
import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const PhaserComponent: React.FC = () => {
	const phaserRef = useRef<IRefPhaserGame | null>(null)

	const toggleFullScreen = () => {
		phaserRef.current?.game?.scale.toggleFullscreen()
	}

	return (
		<>
			<Button autoFocus variant="outlined" onClick={toggleFullScreen}>
				fullscreen
			</Button>

			<PhaserGame ref={phaserRef} />
		</>
	)
}

export default PhaserComponent
