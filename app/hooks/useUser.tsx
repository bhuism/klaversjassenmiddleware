import { useMemo } from "react"
import type { User } from ".generated-sources/openapi"

const SESSION_STORAGE_USER = "CardSeverUser"

export const setUser = (user: User) => {
	sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user))
}

const useUser = () => {
	const stringUser = sessionStorage.getItem(SESSION_STORAGE_USER)

	const user: User = useMemo(() => {
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
