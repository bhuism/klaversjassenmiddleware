import { useQuery } from "@tanstack/react-query"
import useCardApi from "~/hooks/useGameApi"

const useGameState = (gameId: string | undefined) => {
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

	return { game, isLoading, error, refetch }
}

export default useGameState
