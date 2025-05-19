import type React from "react"
import { useContext } from "react"
import { GameContext } from "~/routes/GamePage"

const UsThem: React.FC<React.PropsWithChildren<{ zeroTwo: boolean }>> = ({ zeroTwo }) => {
	//	const { uid } = useContext(UidContext)

	const game = useContext(GameContext)

	if (!game || !zeroTwo) {
		return <>no game</>
	}

	// if (
	// 	(zeroTwo && (game.players[0] === uid || game.players[2] === uid)) ||
	// 	(!zeroTwo && (game.players[1] === uid || game.players[3] === uid))
	// ) {
	// 	return <>Wij 😏</>
	// }
	return <>Zij 😒</>
}

export default UsThem
