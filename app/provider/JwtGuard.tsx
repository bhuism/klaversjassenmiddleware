import type React from "react"
import { useContext } from "react"
import useUserId from "~/hooks/useUserId"
import AuthSessionProvider from "./AuthSessionProvider"
import HandleLogin from "./HandleLogin"
import UserContext from "./UserContext"
import UserGuard from "./UserGuard"

const DoGoogleLogin = () => {
	return (
		<AuthSessionProvider>
			<HandleLogin />
		</AuthSessionProvider>
	)
}

const JwtGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { userId } = useUserId()
	const { user } = useContext(UserContext)

	if (!user) {
		if (!userId) {
			return <DoGoogleLogin />
		}
		return <UserGuard userId={userId} />
	}

	return <>{children}</>
}

export default JwtGuard
