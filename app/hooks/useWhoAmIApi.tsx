import { useMemo } from "react"
import { useAuth } from "react-oidc-context"
import constants from "~/utils/constants"
import { Configuration, WhoamiApi } from ".generated-sources/openapi"

const useWhoAmIApi = () => {
	const { user } = useAuth()

	return useMemo(() => {
		const token = user?.id_token

		return new WhoamiApi(
			new Configuration({
				basePath: constants.apiUrl,
				headers: { Authorization: `Bearer ${token}` },
			})
		)
	}, [user?.id_token])
}

export default useWhoAmIApi
