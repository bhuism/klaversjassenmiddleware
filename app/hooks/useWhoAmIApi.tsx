import { useMemo } from "react"
import { useAuth } from "react-oidc-context"
import constants from "~/utils/constants"
import { Configuration, WhoamiApi } from ".generated-sources/openapi"

const useWhoAmIApi = () => {
	const { user: authUser } = useAuth()

	const token = authUser?.id_token

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
