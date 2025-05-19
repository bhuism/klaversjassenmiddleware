import { Typography } from "@mui/material"
import constants from "~/utils/constants"
import type { Route } from "./+types/GamePage"
import { Configuration, GameApi } from ".generated-sources/openapi"
//import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

export async function loader({ context, params: { gameId } }: Route.LoaderArgs) {
	const { user } = context

	try {
		if (user?.email) {
			const configuration = new Configuration({
				basePath: constants.apiUrl,
				headers: { "API-Key": `${user.email}`, "API-Secret": context.apiSecret },
			})

			const game = await new GameApi(configuration).getGame(gameId)

			return { game: game }
		}
	} catch (e) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error(e)
	}

	return { game: undefined }
}

const GamePage: React.FC<Route.ComponentProps> = ({ loaderData: { game } }) => {
	//const phaserRef = useRef<IRefPhaserGame | null>(null)

	// const toggleFullScreen = () => {
	// 	phaserRef.current?.game?.scale.toggleFullscreen()
	// }
	return (
		<>
			{/* <button type="button" onClick={toggleFullScreen} className="button">
				fullscreen
			</button> */}

			{/* {gameId ? <GameComponent gameId={gameId} /> : <div>Game {gameId} not found</div>} */}

			{/* <PhaserGame ref={phaserRef} /> */}

			<Typography>{`gameId: ${game?.created}`}</Typography>
			{/* <PhaserComponent /> */}
		</>
	)
}

export default GamePage
