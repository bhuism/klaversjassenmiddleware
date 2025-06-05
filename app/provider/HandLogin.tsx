import { CircularProgress, Typography } from "@mui/material"
import { useAuth } from "react-oidc-context"
import { Navigate, useLocation } from "react-router"
import LoginButton from "~/components/LoginButton"
import ReloadButton from "~/components/button/ReloadButton"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"
import WhoAmI from "./WhoAmI"

const HandleLogin: React.FC = () => {
	const { user, activeNavigator, isLoading, error, isAuthenticated } = useAuth()
	const { pathname } = useLocation()

	if (pathname !== "/") {
		return <Navigate to={"/"} />
	}

	if (activeNavigator) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography>{activeNavigator}</Typography>
			</CenterComponents>
		)
	}

	if (isLoading) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography>Auth is loading...</Typography>
			</CenterComponents>
		)
	}

	if (error) {
		return (
			<CenterComponents>
				<Star />
				<Typography style={{ color: "red" }}>
					{error.name}:{error.message}
				</Typography>
				<LoginButton />
				<ReloadButton />
			</CenterComponents>
		)
	}

	if (!isAuthenticated || !user) {
		return (
			<>
				<CenterComponents>
					<Star />
					<LoginButton />
					<ReloadButton />
				</CenterComponents>
			</>
		)
	}

	return <WhoAmI />
}

export default HandleLogin
