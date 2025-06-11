import { Suspense, lazy } from "react"
import CenterComponents from "~/utils/CenterComponents"
import type { Game } from ".generated-sources/openapi"

const PhaserComponent = lazy(() =>
	import("./PhaserComponent").then((module) => ({
		default: module.default,
	}))
)

const GamePlay: React.FC<{ game: Game }> = ({ game }) => {
	return (
		<Suspense fallback={<CenterComponents>Loading...</CenterComponents>}>
			<PhaserComponent game={game} />
		</Suspense>
	)
}

export default GamePlay
