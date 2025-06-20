import type { User } from ".generated-sources/openapi"

const PlayerName: React.FC<React.PropsWithChildren<{ user: User }>> = ({ user }) => {
	return <>{`${user.displayName}`}</>
}

export default PlayerName
