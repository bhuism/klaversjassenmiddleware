import useGameApi from "~/hooks/useGameApi"
import useLoadOnce from "~/hooks/useLoadOnce"

// export const getPlayerName = (cardApi: GameApi, uid: string): Promise<string> => {
// 	const cacheName = names.get(uid)

// 	if (!cacheName) {
// 		return cardApi.getUser(uid).then((u) => u.displayName)
// 	}

// 	return Promise.resolve(cacheName)
// }

const PlayerName: React.FC<React.PropsWithChildren<{ playerUid: string }>> = ({ playerUid }) => {
	const { cardApi } = useGameApi()

	const { data, error, isLoading } = useLoadOnce(() => cardApi.getUser(playerUid))

	if (error) {
		return <>{`${playerUid}`}</>
	}

	if (isLoading) {
		return <span className="blink">loading</span>
	}

	return <>{`${data ? data.displayName : playerUid}`}</>
}

export default PlayerName
