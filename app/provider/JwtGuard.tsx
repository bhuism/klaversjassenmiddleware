import type React from "react"
import useUser from "~/hooks/useUser"
import useUserId from "~/hooks/useUserId"
import AuthSessionProvider from "./AuthSessionProvider"
import HandleLogin from "./HandleLogin"
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
	const { user } = useUser()

	if (!user) {
		if (!userId) {
			return <DoGoogleLogin />
		}
		return <UserGuard userId={userId}>{children}</UserGuard>
	}

	return <>{children}</>
}

export default JwtGuard
