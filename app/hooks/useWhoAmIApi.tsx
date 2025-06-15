import { useMemo } from "react"
import constants from "~/utils/constants"
import { Configuration, WhoamiApi } from ".generated-sources/openapi"

const useWhoAmIApi = (token: string | undefined) => {
	if (!token) {
		return undefined
	}
	return useMemo(() => {
		return new WhoamiApi(
			new Configuration({
				basePath: constants.apiUrl,
				headers: { Authorization: `Bearer ${token}` },
			})
		)
	}, [token])
}

export default useWhoAmIApi
