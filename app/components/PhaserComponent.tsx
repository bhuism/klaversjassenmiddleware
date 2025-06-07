import { Button, Container, Stack } from "@mui/material"
import { useRef } from "react"
import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const PhaserComponent: React.FC = () => {
	const phaserRef = useRef<IRefPhaserGame | null>(null)

	const toggleFullScreen = () => {
		phaserRef.current?.game?.scale.toggleFullscreen()
	}

	// const nextScene = () => {
	// 	phaserRef.current?.scene.
	// }

	return (
		<Stack
			spacing={2}
			// divider={<Divider orientation="horizontal" flexItem />}
			alignItems={"center"}
		>
			<Container>
				<Button autoFocus variant="outlined" onClick={toggleFullScreen}>
					fullscreen
				</Button>
				<Button autoFocus variant="outlined" onClick={toggleFullScreen}>
					nextScene
				</Button>
			</Container>
			<PhaserGame ref={phaserRef} />
		</Stack>
	)
}

export default PhaserComponent
