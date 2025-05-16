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

	return { games }
}

const GamesPage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
	const { games } = loaderData

	return (
		<>
			<Games games={games} />
		</>
	)
}
export default GamesPage
