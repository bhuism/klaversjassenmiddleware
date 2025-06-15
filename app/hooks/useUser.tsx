import { useMemo } from "react"

const useUser = () => {
	const stringUser = sessionStorage.getItem("user")

	const user = useMemo(() => {
		try {
			if (!stringUser) {
				return undefined
			}
			return JSON.parse(stringUser)
		} catch (_e) {
			return undefined
		}
	}, [stringUser])

	return { user }
}

export default useUser
