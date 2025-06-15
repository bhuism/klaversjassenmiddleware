import { useMemo } from "react"
import { LOCAL_STORAGE_JWT } from "~/provider/JwtGuard"
import constants from "~/utils/constants"
import { Configuration, DefaultApi } from ".generated-sources/openapi"

const useCardApi = () => {
	const jwt = localStorage.getItem(LOCAL_STORAGE_JWT)

	return useMemo(() => {
		return new DefaultApi(
			new Configuration({
				basePath: `${constants.apiUrl}/api/v1`,
				headers: { Authorization: `Bearer ${jwt}` },
			})
		)
	}, [jwt])
}

export default useCardApi
