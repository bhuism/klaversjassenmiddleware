import { Typography } from "@mui/material"
import type { GameState } from "~/types"

const GamePlay: React.FC<{ game: GameState }> = ({ game }) => {
	return (
		<>
			<Typography>{`Playing game ${game.id}`}</Typography>
			{/* <PhaserComponent /> */}
		</>
	)
}

export default GamePlay
