import type React from "react"
import { useContext } from "react"
import UidContext from "~/provider/UidContextProvider"
import type { GameState } from "~/types"

const UsThem: React.FC<React.PropsWithChildren<{ game: GameState; zeroTwo: boolean }>> = ({ game, zeroTwo }) => {
	const { user } = useContext(UidContext)

	if (!user) {
		return <>no user</>
	}

	if (
		(zeroTwo && (game.players[0] === user.id || game.players[2] === user.id)) ||
		(!zeroTwo && (game.players[1] === user.id || game.players[3] === user.id))
	) {
		return <>Wij 😏</>
	}
	return <>Zij 😒</>
}

export default UsThem
