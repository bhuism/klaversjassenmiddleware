import { CircularProgress, Typography } from "@mui/material"
import { Suspense, lazy } from "react"
import Logo192 from "~/layout/Logo192"
import type { GameState } from "~/types"
import CenterComponents from "~/utils/CenterComponents"

const PhaserComponent = lazy(() =>
	import("./PhaserComponent").then((module) => ({
		default: module.default,
	}))
)

const LoadingGame: React.FC<{ game: GameState }> = ({ game }) => {
	return (
		<CenterComponents>
			<Logo192 />
			<CircularProgress />
			<Typography>{`Game ${game.id} is loading...`}</Typography>
		</CenterComponents>
	)
}

const GamePlay: React.FC<{ game: GameState }> = ({ game }) => {
	return (
		<>
			<Typography>{`Playing game ${game.id}`}</Typography>
			<Suspense fallback=<LoadingGame game={game} />>
				<PhaserComponent />
			</Suspense>
		</>
	)
}

export default GamePlay
