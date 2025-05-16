import { NavLink } from "react-router"

const GameComponent: React.FC<{ gameId: string }> = ({ gameId }) => {
	return (
		<>
			<NavLink to={`/game/${gameId}`}>{gameId}</NavLink>
		</>
	)
}

export default GameComponent
