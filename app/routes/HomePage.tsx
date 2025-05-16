import { Typography } from "@mui/material"
import TimeComponent from "~/components/TimeComponent"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import type { Route } from "./+types/HomePage"

export async function loader({ context, params, request }: Route.LoaderArgs) {
	return { context, params, request }
}

const Home: React.FC<Route.ComponentProps> = ({ loaderData }) => {
	const { context } = loaderData
	const { user } = context

	return (
		<CenterComponents>
			<h3>Home is where the heart is</h3>
			<TimeComponent slug="homepage" />
			<Typography>{`context= ${JSON.stringify(user)}`}</Typography>
			<Typography>t`testSecret=${constants.testSecret}`</Typography>
		</CenterComponents>
	)
}

export default Home
