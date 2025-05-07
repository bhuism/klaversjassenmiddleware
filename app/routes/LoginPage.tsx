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

export async function loader({ context, request }: Route.LoaderArgs) {
	const { lang, clientEnv, env } = context.get(globalAppContext)
	return { lang, clientEnv, env, request }
}

const LoginButton = () => {
	const { signinRedirect } = useAuth()

	return (
		<>
			<Button variant="outlined" size="large" onClick={() => signinRedirect()}>
				Login
			</Button>
			<div style={{ color: "#444" }}>
				{`${dayjs().to(constants.gitDate)}`}
				{" - "}
				{constants.gitHash ? constants.gitHash.substring(0, 7) : "undefined"}
			</div>
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

const Login = ({ loaderData }: Route.ComponentProps) => {
	const auth = useAuth()

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
					<LoginButton />
					<Typography>{`lang: ${loaderData.lang}`}</Typography>
					<Typography>{`clientEnv: ${JSON.stringify(loaderData.clientEnv)}`}</Typography>
					<Typography>{`env: ${JSON.stringify(loaderData.env)}`}</Typography>
					<Typography>{`request: ${JSON.stringify(loaderData.request)}`}</Typography>
				</>
			)}
		</>
	)
}

export default Login
