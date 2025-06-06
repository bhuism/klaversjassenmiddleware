import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import useCardApi from "~/hooks/useGameApi"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import GameCompleted from "./GameCompleted"
import GamePlay from "./GamePlay"
import { convertGame } from "./common/converters"

const Game: React.FC<{ gameId: string }> = ({ gameId }) => {
	const cardApi = useCardApi()

	const {
		data: game,
		isLoading,
		error,
	} = useQuery({
		queryFn: () => cardApi.getGame(gameId).then((g) => convertGame(g)),
		queryKey: [gameId],
	})

	if (error) {
		return <span style={{ color: "red" }}>{error.message}</span>
	}

	if (isLoading || game === undefined) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>{`Game ${gameId} is loading...`}</Typography>
			</CenterComponents>
		)
	}

	if (!game) {
		return <>no game</>
	}

	return game.isCompleted() ? <GameCompleted game={game} /> : <GamePlay game={game} />
}
export default Game
