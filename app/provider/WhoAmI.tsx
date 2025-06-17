import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "react-oidc-context"
import { Navigate } from "react-router"
import ReloadButton from "~/components/button/ReloadButton"
import { setUser } from "~/hooks/useUser"
import useWhoAmIApi from "~/hooks/useWhoAmIApi"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import { LOCAL_STORAGE_JWT } from "./JwtGuard"

const WhoAmI = () => {
	const { user: authUser } = useAuth()

	const whoamiApi = useWhoAmIApi(authUser?.id_token)

	const { isPending, error, data } = useQuery({
		queryKey: ["authUser", authUser],
		queryFn: () => whoamiApi?.whoami(),
	})

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

	if (isPending) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>Auth is loading...</Typography>
			</CenterComponents>
		)
	}

	const jwt = data?.jwt
	const user = data?.user

	if (!user || !jwt || jwtDecode(jwt).sub?.length !== 28) {
		return (
			<CenterComponents>
				<Logo192 />
				<Typography>No User..</Typography>
				<ReloadButton />
			</CenterComponents>
		)
	}

	localStorage.setItem(LOCAL_STORAGE_JWT, jwt)
	setUser(user)

	return <Navigate to="/" />
}

export default WhoAmI
