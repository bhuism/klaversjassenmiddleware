import { authConfigManager, signIn, useOauthPopupLogin, useSession } from "@hono/auth-js/react"
import { Button, CircularProgress, Typography } from "@mui/material"
import dayjs from "dayjs"
import { type PropsWithChildren, useEffect } from "react"
//import app from "~/server"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import Star from "./Star"

const LoginButton: React.FC<{ lang: string }> = ({ lang = "en" }) => {
	//const { signinRedirect } = useAuth()

	//const { data: session, status } = useSession()

	//if (!session?.user) return null

	//const { data: session } = useSession()

	const { status } = useOauthPopupLogin("google", {
		callbackUrl: "/auth/success",
	})

	useEffect(() => {
		if (status === "success") {
			authConfigManager.getConfig().fetchSession({ event: "refetch" })
		}
	}, [status])

	return (
		<>
			<Button variant="outlined" size="large" onClick={() => signIn("google")}>
				Sign In
			</Button>
			<Typography style={{ color: "#555" }}>
				{`${dayjs().locale(lang).to(constants.gitDate)}`}
				{" - "}
				{constants.gitHash ? constants.gitHash.substring(0, 7) : "undefined"}
			</Typography>
		</>
	)
}

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { data: session, status } = useSession()

	// app.get("/google", (c) => {
	// 	const token = c.get("token")
	// 	const grantedScopes = c.get("granted-scopes")
	// 	const user = c.get("user-google")

	// 	return c.json({
	// 		token,
	// 		grantedScopes,
	// 		user,
	// 	})
	// })

	if (status === "loading") {
		return (
			<>
				<CenterComponents>
					<Star />
					<CircularProgress />
				</CenterComponents>
			</>
		)
	}

	if (!session?.user) {
		return (
			<>
				<CenterComponents>
					<Star />
					<Typography>{`${status}`}</Typography>
					<LoginButton lang="en" />
				</CenterComponents>
			</>
		)
	}
	return <>{children}</>
}
export default AuthGuard
