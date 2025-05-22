import type React from "react"
import type { GameState } from "~/types"

const UsThem: React.FC<React.PropsWithChildren<{ game: GameState; zeroTwo: boolean }>> = () => {
	// if (
	// 	(zeroTwo && (game.players[0] === uid || game.players[2] === uid)) ||
	// 	(!zeroTwo && (game.players[1] === uid || game.players[3] === uid))
	// ) {
	// 	return <>Wij 😏</>
	// }
	return <>Zij 😒</>
}

export default UsThem
