import { Typography } from "@mui/material"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import dayjs from "dayjs"
import { useEffect } from "react"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router"
import { globalAppContext } from "~/server/context"
import constants from "~/utils/constants"
import type { Route } from "./+types/LoginPage"

export async function loader({ context }: Route.LoaderArgs) {
	const { lang, clientEnv } = context.get(globalAppContext)
	return { lang, clientEnv }
}

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

const RedirectHome = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate("/")
	})

	return (
		<>
			<CircularProgress />
			<p>To Home thou shall go</p>
		</>
	)
}

const Login: React.FC<Route.ComponentProps> = ({ loaderData }: Route.ComponentProps) => {
	const auth = useAuth()

	const lang = loaderData.lang

	// useEffect(() => {
	//   if (auth) {
	//     auth.clearStaleState();
	//   }
	// });

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
				<CircularProgress />
				<Typography>{TranslateActivateNavigator[auth.activeNavigator]}</Typography>
			</>
		)
	}

	return (
		<>
			{auth.error ? (
				<>
					<Typography>auth error: {auth.error.message}</Typography>
				</>
			) : (
				<></>
			)}

			{auth.isAuthenticated ? (
				<>
					<RedirectHome />
				</>
			) : (
				<>
					<LoginButton lang={lang} />
					<Typography style={{ color: "#555" }}>{`NODE_ENV: ${loaderData.clientEnv.NODE_ENV}`}</Typography>
				</>
			)}
		</>
	)
}

export default Login
