import { useQuery } from "@tanstack/react-query"
import useGameApi from "~/hooks/useGameApi"

const PlayerName: React.FC<React.PropsWithChildren<{ playerUid: string }>> = ({ playerUid }) => {
	const cardApi = useGameApi()

	const { isPending, error, data } = useQuery({
		queryKey: [playerUid],
		queryFn: () => cardApi.getUser(playerUid),
	})

	if (error) {
		return <>{`${playerUid}`}</>
	}

	if (isPending) {
		return <span className="blink">{`${playerUid}`}</span>
	}

	return <>{`${data.displayName}`}</>
}

export default PlayerName
