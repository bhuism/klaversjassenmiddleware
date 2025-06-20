import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router"
import ReloadButton from "~/components/button/ReloadButton"
import { setJwt } from "~/hooks/useJwt"
import { setUser } from "~/hooks/useUser"
import useWhoAmIApi from "~/hooks/useWhoAmIApi"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"

const WhoAmI = () => {
	//	const { setUser } = useUser()

	const whoamiApi = useWhoAmIApi()

	const { isPending, error, data } = useQuery({
		queryKey: [],
		queryFn: () => whoamiApi?.whoami(),
	})

	if (error) {
		localStorage.clear()
		sessionStorage.clear()

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
				<Typography>WhoAmI is loading...</Typography>
			</CenterComponents>
		)
	}

	const user = data?.user
	const jwt = data?.jwt

	if (jwt && user) {
		setJwt(jwt)
		setUser(user)
		return <Navigate to="/" />
	}

	localStorage.clear()
	sessionStorage.clear()

	return (
		<CenterComponents>
			<Logo192 />
			<Typography>No Jwt..</Typography>
			<ReloadButton />
		</CenterComponents>
	)
}

export default WhoAmI
