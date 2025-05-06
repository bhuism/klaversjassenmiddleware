import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import dayjs from "dayjs"
import { useEffect } from "react"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router"
import constants from "~/utils/constants"

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

const Login = () => {
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
				<span>{TranslateActivateNavigator[auth.activeNavigator]}</span>
			</>
		)
	}

	return (
		<>
			{auth.error ? (
				<>
					<span>auth error: {auth.error.message}</span>
				</>
			) : (
				<></>
			)}

			{auth.isAuthenticated ? (
				<>
					<RedirectHome />
				</>
			) : (
				<LoginButton />
			)}
		</>
	)
}

export default Login
