import { CircularProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { NavLink } from "react-router"
import useCardApi from "~/hooks/useCardApi"

const GameComponent: React.FC<{ gameId: string }> = ({ gameId }) => {
	const { cardApi } = useCardApi()

	const { status, data, error } = useQuery({
		queryFn: () => cardApi.getGame(gameId),
		queryKey: ["gameId", gameId],
	})

	if (error) return <span style={{ color: "red" }}>{JSON.stringify(error)}</span>

	if (status === "pending") return <CircularProgress />

	return (
		<>
			<NavLink to={`/game/${data.id}`}>{data.id}</NavLink>
		</>
	)
}

export default GameComponent
