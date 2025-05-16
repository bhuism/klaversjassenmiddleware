import { NavLink } from "react-router"

const GameComponent: React.FC<{ gameId: string }> = ({ gameId }) => {
	// if (error) return <span style={{ color: "red" }}>{JSON.stringify(error)}</span>

	return (
		<>
			<NavLink to={`/game/${gameId}`}>{gameId}</NavLink>
		</>
	)
}

export default GameComponent
