import { useContext, useMemo } from "react"
import UidContext from "~/context/UidContext"
import constants from "~/utils/constants"
import { Configuration, DefaultApi } from ".generated-sources/openapi"

const useCardApi = () => {
	const { user } = useContext(UidContext)

	return useMemo(() => {
		return new DefaultApi(
			new Configuration({
				basePath: `${constants.apiUrl}/api/v1`,
				headers: { cardserverauth: `${user?.id}` },
			})
		)
	}, [user])
}

export default useCardApi
