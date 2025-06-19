import { CircularProgress, Typography } from "@mui/material"
import { PhaserGame } from "~/game/PhaserGame"
import useGameState from "~/hooks/useGameState"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"

const PhaserComponent: React.FC<{ gameId: string }> = ({ gameId }) => {
	//	const phaserRef = useRef<IRefPhaserGame | null>(null)

	// const toggleFullScreen = () => {
	// 	phaserRef.current?.game?.scale.toggleFullscreen()
	// }

	const { game: gameState, isLoading, error } = useGameState(gameId)

	if (error) {
		return <span style={{ color: "red" }}>{error.message}</span>
	}

	if (isLoading) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>Game ${gameId} is loading...</Typography>
			</CenterComponents>
		)
	}

	if (!gameState) {
		return (
			<CenterComponents>
				<Logo192 />
				<Typography>No Game</Typography>
			</CenterComponents>
		)
	}

	return <PhaserGame gameState={gameState} />
}

export default PhaserComponent
