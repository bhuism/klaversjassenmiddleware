import { Typography } from "@mui/material"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import LoginButton from "~/components/LoginButton"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import type { Route } from "./+types/HomePage"

import "dayjs/locale/bs"
import "dayjs/locale/en"
import "dayjs/locale/nl"
import Star from "~/layout/Star"

const Home: React.FC<Route.ComponentProps> = () => {
	const {
		i18n: { language },
	} = useTranslation()

	return (
		<CenterComponents>
			<Star />
			<h3>Home is where the heart is</h3>
			<LoginButton />
			<Typography>{`gitDate en: ${dayjs(constants.gitDate).locale("en")}`}</Typography>
			<Typography>{`Language: ${language}`}</Typography>
		</CenterComponents>
	)
}

export default Home
