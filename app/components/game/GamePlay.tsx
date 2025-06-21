import { Suspense, lazy } from "react"
import CenterComponents from "~/utils/CenterComponents"

const PhaserComponent = lazy(() =>
	import("./PhaserComponent").then((module) => ({
		default: module.default,
	}))
)

const GamePlay: React.FC<{ gameId: string }> = ({ gameId }) => {
	return (
		<Suspense fallback={<CenterComponents>Loading...</CenterComponents>}>
			<PhaserComponent gameId={gameId} />
		</Suspense>
	)
}

export default GamePlay
