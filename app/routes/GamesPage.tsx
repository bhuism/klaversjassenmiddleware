import Games from "~/components/Games"
import constants from "~/utils/constants"
import type { Route } from "./+types/GamesPage"
import { Configuration, GameApi } from ".generated-sources/openapi"

function getCookie(cookieString: string, key: string) {
	const b = cookieString.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)
	return b ? b.pop() : ""
}
export async function loader({ request }: Route.LoaderArgs) {
	const cookieString = request.headers.get("Cookie")

	let games: Set<string> = new Set()
	let token: string | undefined = ""

	if (cookieString) {
		token = getCookie(cookieString, "token")

		if (token) {
			games = await new GameApi(
				new Configuration({
					basePath: constants.apiUrl,
					headers: { Authorization: `Bearer ${token}` },
				})
			).getGames()
		}

		// 	const cardApi = context.get("cardApi");
		// //	const { cardApi } = useCardApi()
		// 	// biome-ignore lint/suspicious/noConsole: <explanation>
		// 	console.log(`context:${JSON.stringify(context)}`)
		// 	const games = cardApi.getGames()
		// 	return games
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
