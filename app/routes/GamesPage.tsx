import { Typography } from "@mui/material"
import Games from "~/components/Games"
import type { Route } from "./+types/GamesPage"

// function getCookie(cookieString: string, key: string) {
// 	const b = cookieString.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)
// 	return b ? b.pop() : ""
// }

export async function loader({ context }: Route.LoaderArgs) {
	const { user } = context

	const games: Set<string> = new Set()

	// 	if (token) {
	// 		games = await new GameApi(
	// 			new Configuration({
	// 				basePath: constants.apiUrl,
	// 				headers: { Authorization: `Bearer ${token}` },
	// 			})
	// 		).getGames()
	// 	}

	// 	// 	const cardApi = context.get("cardApi");
	// 	// //	const { cardApi } = useCardApi()
	// 	// 	// biome-ignore lint/suspicious/noConsole: <explanation>
	// 	// 	console.log(`context:${JSON.stringify(context)}`)
	// 	// 	const games = cardApi.getGames()
	// 	// 	return games
	// }

	//	const id = "test"

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
