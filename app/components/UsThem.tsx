import type React from "react"
import { useContext } from "react"
import UidContext from "~/provider/UidContextProvider"
import type { Game } from ".generated-sources/openapi"

const UsThem: React.FC<React.PropsWithChildren<{ game: Game; zeroTwo: boolean }>> = ({ game, zeroTwo }) => {
	const { user } = useContext(UidContext)

	if (!user) {
		return <>no user</>
	}

	if (
		(zeroTwo && (game.players[0].id === user.id || game.players[2].id === user.id)) ||
		(!zeroTwo && (game.players[1].id === user.id || game.players[3].id === user.id))
	) {
		return <>Wij 😏</>
	}
	return <>Zij 😒</>
}

export default UsThem
