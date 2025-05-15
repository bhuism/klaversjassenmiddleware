import { Typography } from "@mui/material"
import Games from "~/components/Games"
import constants from "~/utils/constants"
import type { Route } from "./+types/GamesPage"
import { Configuration, GameApi } from ".generated-sources/openapi"

// function getCookie(cookieString: string, key: string) {
// 	const b = cookieString.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)
// 	return b ? b.pop() : ""
// }

export async function loader({ context }: Route.LoaderArgs) {
	const { user } = context

	//	console.log("apiSecret:" + context.apiSecret)

	const configuration = new Configuration({
		basePath: constants.apiUrl,
		headers: { "API-Key": user.id, "API-Secret": context.apiSecret },
	})

	// biome-ignore lint/suspicious/noConsole: <explanation>
	// biome-ignore lint/style/useTemplate: <explanation>
	console.log("getGames(): ", constants.apiUrl, user.id, context.apiSecret)

	const games = await new GameApi(configuration).getGames()

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
