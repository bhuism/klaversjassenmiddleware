import useUserId from "./useUserId"
import type { User } from ".generated-sources/openapi"

const SESSION_STORAGE_USER = "CardSeverUser"

export const setUser = (user: User) => {
	sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user))
}

const useUser = () => {
	const { userId } = useUserId()

	if (userId) {
		const stringUser = sessionStorage.getItem(SESSION_STORAGE_USER)

		if (stringUser) {
			const user = JSON.parse(stringUser) as User

			if (userId === user.id) {
				return { user }
			}
		}
	}

	return { user: undefined }
}

export default useUser
