import { Typography } from "@mui/material"
import TimeComponent from "~/components/TimeComponent"
import CenterComponents from "~/utils/CenterComponents"
import type { Route } from "./+types/HomePage"

export async function loader({ context, params, request }: Route.LoaderArgs) {
	return { context, params, request }
}

const Home: React.FC<Route.ComponentProps> = ({ loaderData }) => {
	const { context, params, request } = loaderData

	return (
		<CenterComponents>
			<h3>Home is where the heart is</h3>
			<TimeComponent slug="homepage" />
			<Typography>{`context= ${JSON.stringify(context)}`}</Typography>
			<Typography>{`params= ${JSON.stringify(params)}`}</Typography>
			<Typography>{`request= ${JSON.stringify(request)}`}</Typography>
		</CenterComponents>
	)
}

export default Home
