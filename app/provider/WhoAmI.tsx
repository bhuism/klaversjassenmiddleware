import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router"
import LoginButton from "~/components/button/LoginButton"
import ReloadButton from "~/components/button/ReloadButton"
import useWhoAmIApi from "~/hooks/useWhoAmIApi"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"
import { LOCAL_STORAGE_USERID_KEY } from "./UidContextProvider"

const WhoAmI = () => {
	const whoamiApi = useWhoAmIApi()
	const navigate = useNavigate()
	const { user: authUser } = useAuth()

	const {
		isPending,
		error,
		data: user,
	} = useQuery({
		queryKey: [authUser],
		queryFn: () => whoamiApi.whoami(),
	})

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

	if (isPending) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<p>Loading current User...</p>
			</CenterComponents>
		)
	}

	if (!user || !user.id || user.id.length !== 28) {
		return (
			<CenterComponents>
				<Star />
				<p>No User..</p>
				<LoginButton />
				<ReloadButton />
			</CenterComponents>
		)
	}

	localStorage.setItem(LOCAL_STORAGE_USERID_KEY, JSON.stringify(user))

	navigate("/")
}

export default WhoAmI
