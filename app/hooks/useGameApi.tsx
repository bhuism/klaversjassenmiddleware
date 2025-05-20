import { useMemo } from "react"
import { useAuth } from "react-oidc-context"
import constants from "~/utils/constants"
import { Configuration, GameApi } from ".generated-sources/openapi"

const useCardApi = () => {
	const { user } = useAuth()

	const token = user?.id_token

	const cardApi = useMemo(
		() =>
			new GameApi(
				new Configuration({
					basePath: constants.apiUrl,
					headers: { Authorization: `Bearer ${token}` },
				})
			),
		[token]
	)

	return { cardApi }
}

export default useCardApi
