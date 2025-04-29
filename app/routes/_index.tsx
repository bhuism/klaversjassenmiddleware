import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"
import { convertDateToUserTz } from "~/utils/dates"
import type { Route } from "./+types/_index"

export const meta: MetaFunction = () => {
	return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}
export const loader = ({ request }: Route.LoaderArgs) => {
	const timezoneDate = convertDateToUserTz(new Date(), request)
	return {
		timezoneDate: timezoneDate.toTimeString(),
	}
}
export default function Index({ loaderData }: Route.ComponentProps) {
	const { timezoneDate } = loaderData
	const { t } = useTranslation()
	return (
		<div>
			<h1>{t("hi")}</h1>
			<p>timezone: {timezoneDate}</p>
		</div>
	)
}
