import { useSession } from "@hono/auth-js/react"
import { useMemo } from "react"
import constants from "~/utils/constants"
import { Configuration, GameApi } from ".generated-sources/openapi"

const useCardApi = () => {
	const { data: session } = useSession()
	const cardApi = useMemo(
		() =>
			new GameApi(
				new Configuration({
					basePath: constants.apiUrl,
					headers: { Authorization: `Bearer ${session?.user?.email}` },
				})
			),
		[session]
	)

	return { cardApi }
}

export default useCardApi
