import LoginButton from "~/components/LoginButton"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import type { Route } from "./+types/HomePage"

import Star from "~/layout/Star"

const Home: React.FC<Route.ComponentProps> = () => {
	return (
		<CenterComponents>
			<Star />
			<h3>Home is where the heart is</h3>
			<LoginButton />
		</CenterComponents>
	)
}

export default Home
