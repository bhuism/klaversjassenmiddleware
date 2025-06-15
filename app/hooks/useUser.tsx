import { useMemo } from "react"

export const SESSION_STORAGE_JWT = "CardSeverUser"

const useUser = () => {
	const stringUser = sessionStorage.getItem(SESSION_STORAGE_JWT)

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
