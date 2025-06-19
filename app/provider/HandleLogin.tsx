import { CircularProgress, Typography } from "@mui/material"
import { useAuth } from "react-oidc-context"
import { Navigate, useLocation } from "react-router"
import LoginButton from "~/components/button/LoginButton"
import ReloadButton from "~/components/button/ReloadButton"
import Logo192 from "~/layout/Logo192"
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
				<Logo192 />
				<CircularProgress />
				<Typography>{activeNavigator}</Typography>
			</CenterComponents>
		)
	}

	if (isLoading) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>Auth is loading...</Typography>
			</CenterComponents>
		)
	}

	if (error) {
		return (
			<CenterComponents>
				<Logo192 />
				<Typography style={{ color: "red" }}>
					{error.name}:{error.message}
				</Typography>
				<ReloadButton />
			</CenterComponents>
		)
	}

	if (!isAuthenticated || !user) {
		return (
			<>
				<CenterComponents>
					<Logo192 />
					<LoginButton />
				</CenterComponents>
			</>
		)
	}

	return <WhoAmI />
}

export default HandleLogin
