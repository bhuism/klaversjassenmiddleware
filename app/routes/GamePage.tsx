import React from "react"
import GameStats from "~/components/GameStats"
import constants from "~/utils/constants"
import type { Route } from "./+types/GamePage"
import { Configuration, type Game, GameApi } from ".generated-sources/openapi"
//import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

export async function loader({ context, params: { gameId } }: Route.LoaderArgs) {
	const { user } = context

	if (user?.email) {
		const configuration = new Configuration({
			basePath: constants.apiUrl,
			headers: { "API-Key": `${user.email}`, "API-Secret": context.apiSecret },
		})

		const game = new GameApi(configuration).getGame(gameId)

		return game
	}

	return undefined
}

export const GameContext = React.createContext<Game | undefined>(undefined)

const GamePage: React.FC<Route.ComponentProps> = ({ loaderData: game }) => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	// biome-ignore lint/style/useTemplate: <explanation>
	console.log("game=" + game?.creator)

	//const phaserRef = useRef<IRefPhaserGame | null>(null)

	// const toggleFullScreen = () => {
	// 	phaserRef.current?.game?.scale.toggleFullscreen()
	// }

	if (!game) {
		return "no game"
	}

	return (
		<>
			{/* <button type="button" onClick={toggleFullScreen} className="button">
				fullscreen
			</button> */}

			{/* {gameId ? <GameComponent gameId={gameId} /> : <div>Game {gameId} not found</div>} */}

			{/* <PhaserGame ref={phaserRef} /> */}

			<GameContext.Provider value={game}>
				<GameStats game={game} />
			</GameContext.Provider>
			{/* <PhaserComponent /> */}
		</>
	)
}

export default GamePage
