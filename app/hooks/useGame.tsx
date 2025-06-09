import { useQuery } from "@tanstack/react-query"
import { convertGame } from "~/components/common/converters"
import useCardApi from "~/hooks/useGameApi"

const useGame = (gameId: string | undefined) => {
	const cardApi = useCardApi()

	const {
		data: game,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryFn: ({ queryKey }) => {
			if (typeof queryKey[1] !== "string" || (queryKey[1] as unknown as string).length !== 20) {
				throw new Error("no gameId")
			}
			return cardApi.getGame(queryKey[1] as unknown as string).then((g) => convertGame(g))
		},
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
