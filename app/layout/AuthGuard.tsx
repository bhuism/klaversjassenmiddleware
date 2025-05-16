import { signIn, useSession } from "@hono/auth-js/react"
import { Button, CircularProgress, Typography } from "@mui/material"
import dayjs from "dayjs"
import type { PropsWithChildren } from "react"
//import app from "~/server"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import Star from "./Star"

const LoginButton: React.FC<{ lang: string }> = ({ lang = "en" }) => {
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

	if (!session || !session?.user || !session.user.id) {
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
