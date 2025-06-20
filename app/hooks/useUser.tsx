import type { User } from ".generated-sources/openapi"

const SESSION_STORAGE_USER = "CardSeverUser"

export const setUserInStorage = (user: User) => {
	sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user))
}

export const getUserFromStorage = (): User | undefined => {
	const stringUser = sessionStorage.getItem(SESSION_STORAGE_USER)
	try {
		if (stringUser) {
			return JSON.parse(stringUser) as User
		}
		return undefined
	} catch (e) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error("", e)
		return undefined
	}
}

// const useUser = () => {
// 	const [user, _setUser] = useState<User | undefined>(getUserFromStorage())

// 	const setUser = (user: User) => {
// 		setUserInSession(user)
// 		_setUser(user)
// 	}

// 	return { user, setUser }
// }

// export default useUser
