import { useMemo } from "react"
import useConfiguration from "./useConfiguration"
import { DefaultApi } from ".generated-sources/openapi"

const useCardApi = () => {
	const configuration = useConfiguration()

	return useMemo(() => {
		return new DefaultApi(configuration)
	}, [configuration])
}

export default useCardApi
