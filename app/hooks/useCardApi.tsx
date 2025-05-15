import { useSession } from "@hono/auth-js/react"
import { useMemo } from "react"
import constants from "~/utils/constants"
import { Configuration, GameApi } from ".generated-sources/openapi"

const useCardApi = () => {
	const { data: session } = useSession()

	// biome-ignore lint/style/useTemplate: <explanation>
	const apiKey = "" + session?.user?.id

	const cardApi = useMemo(
		() =>
			new GameApi(
				new Configuration({
					basePath: constants.apiUrl,
					headers: { "API-Key": apiKey, "API-Secret": "changeme" },
				})
			),
		[apiKey]
	)

	return { cardApi }
}

export default useCardApi
