import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import ReloadButton from "~/components/button/ReloadButton"
import { setJwt } from "~/hooks/useJwt"
import useWhoAmIApi from "~/hooks/useWhoAmIApi"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import UserContext from "./UserContext"
import type { User } from ".generated-sources/openapi"

const NavigateAndSet: React.FC<{ jwt: string; user: User }> = ({ jwt, user }) => {
	const { setUser } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		setJwt(jwt)
		setUser(user)
		navigate("/")
	}, [jwt, user, setUser, navigate])

	return (
		<CenterComponents>
			<Logo192 />
			<Typography>Redirecting</Typography>
			<ReloadButton />
		</CenterComponents>
	)
}

const WhoAmI = () => {
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
		return <NavigateAndSet jwt={jwt} user={user} />
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
