import { Button, Typography } from "@mui/material"
import { useRef } from "react"
import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"
import { useMounted } from "~/hooks/useMounted"

const PhaserComponent: React.FC = () => {
	const mounted = useMounted()
	const phaserRef = useRef<IRefPhaserGame | null>(null)

	if (!mounted) return <Typography>Not mounted yet...</Typography>

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
