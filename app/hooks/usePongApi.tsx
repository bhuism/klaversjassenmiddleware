import { useMemo } from "react"
import useConfiguration from "./useConfiguration"
import { PongApi } from ".generated-sources/openapi"

const usePongApi = () => {
	const configuration = useConfiguration()

	return useMemo(() => {
		return new PongApi(configuration)
	}, [configuration])
}

export default usePongApi
