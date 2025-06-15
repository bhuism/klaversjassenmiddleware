import { jwtDecode } from "jwt-decode"
import type React from "react"
import AuthSessionProvider from "./AuthSessionProvider"
import HandleLogin from "./HandleLogin"
import UserGuard from "./UserGuard"

export const LOCAL_STORAGE_JWT = "CardSeverJwt"

const DoLogin = () => {
	return (
		<AuthSessionProvider>
			<HandleLogin />
		</AuthSessionProvider>
	)
}

const JwtGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const jwt = localStorage.getItem(LOCAL_STORAGE_JWT)

	try {
		if (!jwt) {
			return <DoLogin />
		}

		const sub = jwtDecode(jwt, { header: false }).sub

		if (!sub || sub.length !== 28) {
			return <DoLogin />
		}

		return <UserGuard userId={sub}>{children}</UserGuard>
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.log("", error)
		return <DoLogin />
	}
}

export default JwtGuard
