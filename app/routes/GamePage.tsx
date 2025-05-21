import { CircularProgress, Typography } from "@mui/material"
import type React from "react"
import GameStats from "~/components/GameStats"
import GameContext from "~/context/GameContext"
import useCardApi from "~/hooks/useGameApi"
import useLoadOnce from "~/hooks/useLoadOnce"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"
import type { Route } from "./+types/GamePage"
import type { Game } from ".generated-sources/openapi"
//import { type IRefPhaserGame, PhaserGame } from "~/game/PhaserGame"

const GamePage: React.FC<Route.ComponentProps> = ({ params: { gameId } }) => {
	const { cardApi } = useCardApi()

	const { data, error, isLoading } = useLoadOnce<Game>(() => cardApi.getGame(gameId))

	if (isLoading) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography>{`Game ${gameId} is loading...`}</Typography>
			</CenterComponents>
		)
	}

	if (!data || error) {
		return <Typography>{`Error: ${error}`}</Typography>
	}

	return (
		<>
			{/* <button type="button" onClick={toggleFullScreen} className="button">
				fullscreen
			</button> */}

			{/* {gameId ? <GameComponent gameId={gameId} /> : <div>Game {gameId} not found</div>} */}

			{/* <PhaserGame ref={phaserRef} /> */}

			<GameContext.Provider value={data}>
				<GameStats />
			</GameContext.Provider>
			{/* <PhaserComponent /> */}
		</>
	)
}

export default GamePage
