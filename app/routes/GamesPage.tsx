import { Typography } from "@mui/material"
import Games from "~/components/Games"
import { Configuration, GameApi } from ".generated-sources/openapi"

import constants from "~/utils/constants"
import type { Route } from "./+types/GamesPage"

export async function loader({ context }: Route.LoaderArgs) {
	const { user } = context

	let games = new Set<string>()

	if (user?.id && user.provider) {
		const configuration = new Configuration({
			basePath: constants.apiUrl,
			headers: { "API-Key": `${user.provider}|${user.id}`, "API-Secret": context.apiSecret },
		})
		games = await new GameApi(configuration).getGames()
	}

	return { games, user }
}

const GamesPage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
	const { games, user } = loaderData

	//	const { data: session } = useSession()

	return (
		<>
			<Typography>{`${user.id}`}</Typography>
			<Games games={games} />
		</>
	)
}
export default GamesPage
