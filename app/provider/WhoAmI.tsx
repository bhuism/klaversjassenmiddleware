import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router"
import LoginButton from "~/components/button/LoginButton"
import ReloadButton from "~/components/button/ReloadButton"
import useWhoAmIApi from "~/hooks/useWhoAmIApi"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import { LOCAL_STORAGE_JWT } from "./JwtGuard"

const WhoAmI = () => {
	const navigate = useNavigate()
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
				<LoginButton />
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
				<p>No User..</p>
				<LoginButton />
				<ReloadButton />
			</CenterComponents>
		)
	}

	localStorage.setItem(LOCAL_STORAGE_JWT, jwt)
	sessionStorage.clear()
	sessionStorage.setItem("user", JSON.stringify(user))

	navigate("/")
}

export default WhoAmI
