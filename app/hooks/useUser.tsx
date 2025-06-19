import type { User } from ".generated-sources/openapi"

const SESSION_STORAGE_USER = "CardSeverUser"

// export const setUser = (user: User) => {
// 	sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user))
// }

const useUser = () => {
	// const [stringUser, setStringUser] = useState<string | null>(sessionStorage.getItem(SESSION_STORAGE_USER))

	// //const stringUser = sessionStorage.getItem(SESSION_STORAGE_USER)

	// const user: User = useMemo(() => {
	// 	console.log("new stringuser")
	// 	try {
	// 		if (!stringUser) {
	// 			return undefined
	// 		}
	// 		return JSON.parse(stringUser)
	// 	} catch (_e) {
	// 		return undefined
	// 	}
	// }, [stringUser])

	// const setUser = useCallback((user: User) => {
	// 	console.log("running setUser")
	// 	const newStringUser = JSON.stringify(user)
	// 	sessionStorage.setItem(SESSION_STORAGE_USER, newStringUser)
	// 	//setStringUser(newStringUser)
	// }, [])

	const stringUser = sessionStorage.getItem(SESSION_STORAGE_USER)

	let user: User | undefined = undefined

	if (stringUser) {
		user = JSON.parse(stringUser)
	} else {
		user = undefined
	}

	const setUser = (a: User) => {
		sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(a))
		user = a
	}

	return { user, setUser }
}

export default useUser
