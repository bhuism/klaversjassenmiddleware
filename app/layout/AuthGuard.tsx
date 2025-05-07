import { Button, CircularProgress, Typography } from "@mui/material"
import dayjs from "dayjs"
import type { PropsWithChildren } from "react"
import { useAuth } from "react-oidc-context"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import Star from "./Star"

const LoginButton: React.FC<{ lang: string }> = ({ lang = "en" }) => {
	const { signinRedirect } = useAuth()

	return (
		<>
			<Button variant="outlined" size="large" onClick={() => signinRedirect()}>
				Login
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
	const auth = useAuth()

	if (!auth) {
		return (
			<CenterComponents>
				<CircularProgress />
				<Typography>no auth</Typography>
			</CenterComponents>
		)
	}

	if (auth.isLoading) {
		return (
			<CenterComponents>
				<CircularProgress />
			</CenterComponents>
		)
	}

	// just log
	if (auth.error) {
		return (
			<CenterComponents>
				<Typography>`${JSON.stringify(auth.error)}`</Typography>
			</CenterComponents>
		)
	}

	const TranslateActivateNavigator = {
		signinRedirect: "Signin In",
		signinResourceOwnerCredentials: "Signin In",
		signinPopup: "Signin In",
		signinSilent: "Signin In",
		signoutRedirect: "Signin Out",
		signoutPopup: "Signin Out",
		signoutSilent: "Signin Out",
	}

	if (auth.activeNavigator) {
		return (
			<>
				<CenterComponents>
					<CircularProgress />
					<Typography>{TranslateActivateNavigator[auth.activeNavigator]}</Typography>
				</CenterComponents>
			</>
		)
	}

	if (!auth.isAuthenticated) {
		return (
			<>
				<CenterComponents>
					<Star />
					<LoginButton lang="en" />
				</CenterComponents>
			</>
		)
	}
	return <>{children}</>
}
export default AuthGuard
