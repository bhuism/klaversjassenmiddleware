import { useMemo } from "react"
import { GameApi } from ".generated-sources/openapi/apis/GameApi"
import { Configuration } from ".generated-sources/openapi/runtime"

import { useAuth } from "react-oidc-context"
import constants from "~/utils/constants"

const useCardApi = () => {
	const { user } = useAuth()

	const cardApi = useMemo(
		() =>
			new GameApi(
				new Configuration({
					basePath: constants.apiUrl,
					headers: { Authorization: `Bearer ${user?.id_token}` },
				})
			),
		[user?.id_token]
	)

	return { cardApi }
}

export default useCardApi
