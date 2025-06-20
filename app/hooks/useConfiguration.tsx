import { useMemo } from "react"
import constants from "~/utils/constants"
import useJwt from "./useJwt"
import { Configuration } from ".generated-sources/openapi"

const useConfiguration = () => {
	const jwt = useJwt()

	return useMemo(() => {
		return new Configuration({
			basePath: `${constants.apiUrl}/api/v1`,
			headers: { Authorization: `Bearer ${jwt}` },
		})
	}, [jwt])
}

export default useConfiguration
