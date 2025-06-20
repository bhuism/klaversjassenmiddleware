import { jwtDecode } from "jwt-decode"
import useJwt from "./useJwt"

const useUserId = (): { userId: string | undefined } => {
	const jwt = useJwt()

	try {
		if (!jwt) {
			return { userId: undefined }
		}

		const userId = jwtDecode(jwt, { header: false }).sub

		if (!userId || userId.length !== 28) {
			return { userId: undefined }
		}

		return { userId }
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.log("", error)
		return { userId: undefined }
	}
}
export default useUserId
