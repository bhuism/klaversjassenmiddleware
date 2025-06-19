import { CircularProgress, Typography } from "@mui/material"
import { PhaserGame } from "~/game/PhaserGame"
import useGameState from "~/hooks/useGameState"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import ReloadButton from "./button/ReloadButton"

const PhaserComponent: React.FC<{ gameId: string }> = ({ gameId }) => {
	const { error, isLoading, game } = useGameState(gameId)

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

	if (!game) {
		return (
			<CenterComponents>
				<Logo192 />
				<Typography>No Game</Typography>
				<ReloadButton />
			</CenterComponents>
		)
	}

	return <PhaserGame gameState={game} />
}

export default PhaserComponent
