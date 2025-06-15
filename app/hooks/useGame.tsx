import { useQuery } from "@tanstack/react-query"
import useCardApi from "~/hooks/useGameApi"

const useGame = (gameId: string | undefined) => {
	const cardApi = useCardApi()

	const {
		data: game,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryFn: ({ queryKey }) => cardApi.getGame(queryKey[1] as unknown as string),
		queryKey: ["gameId", gameId],
	})

	// if (error) {
	// 	return <span style={{ color: "red" }}>{error.message}</span>
	// }

	// if (isLoading || game === undefined) {
	// 	return (
	// 		<CenterComponents>
	// 			<Logo192 />
	// 			<CircularProgress />
	// 			<Typography>{`Game ${gameId} is loading...`}</Typography>
	// 		</CenterComponents>
	// 	)
	// }

	// if (!game) {
	// 	return <>no game</>
	// }

	return { game, isLoading, error, refetch }
}

export default useGame
