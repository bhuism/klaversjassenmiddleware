import type { User } from ".generated-sources/openapi"

const PlayerName: React.FC<React.PropsWithChildren<{ user: User }>> = ({ user }) => {
	// const cardApi = useGameApi()

	// const { isPending, error, data } = useQuery({
	// 	queryKey: [playerUid],
	// 	queryFn: () => cardApi.getUser(playerUid),
	// })

	// if (error) {
	// 	return <>{`${playerUid}`}</>
	// }

	// if (isPending) {
	// 	return <span className="blink">{`${playerUid}`}</span>
	// }

	return <>{`${user.displayName}`}</>
}

export default PlayerName
