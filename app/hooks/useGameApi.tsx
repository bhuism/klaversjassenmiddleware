import { useContext, useMemo } from "react"
import UidContext from "~/provider/UidContextProvider"
import constants from "~/utils/constants"
import { Configuration, DefaultApi } from ".generated-sources/openapi"

const useCardApi = () => {
	const { user } = useContext(UidContext)

	return useMemo(() => {
		return new DefaultApi(
			new Configuration({
				basePath: `${constants.apiUrl}/api/vi`,
				headers: { cardserverauth: `${user?.id}` },
			})
		)
	}, [user])
}

export default useCardApi
