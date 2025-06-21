import { Container } from "@mui/material"
import type React from "react"
import GamePlay from "~/components/game/GamePlay"
import type { Route } from "./+types/GamePage"

const PlayPage: React.FC<Route.ComponentProps> = ({ params: { gameId } }) => {
	return (
		<Container
			maxWidth={false}
			style={{
				width: "100vw",
				height: "100vh",
				margin: 0,
				padding: 0,
				border: 0,
				maxWidth: "100%",
				maxHeight: "100%",
			}}
		>
			<GamePlay gameId={gameId} />
		</Container>
	)
}

export default PlayPage
