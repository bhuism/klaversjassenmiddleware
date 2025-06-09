import { Suspense, lazy } from "react"
import type { GameState } from "~/types"
import CenterComponents from "~/utils/CenterComponents"

const PhaserComponent = lazy(() =>
	import("./PhaserComponent").then((module) => ({
		default: module.default,
	}))
)

const GamePlay: React.FC<{ game: GameState }> = ({ game }) => {
	return (
		<Suspense fallback={<CenterComponents>Loading...</CenterComponents>}>
			<PhaserComponent game={game} />
		</Suspense>
	)
}

export default GamePlay
