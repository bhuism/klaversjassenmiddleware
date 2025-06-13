import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router"
import LoginButton from "~/components/button/LoginButton"
import ReloadButton from "~/components/button/ReloadButton"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import constants from "~/utils/constants"
import { LOCAL_STORAGE_USERID_KEY } from "./UidContextProvider"
import { Configuration, WhoamiApi } from ".generated-sources/openapi"

const WhoAmI = () => {
	const navigate = useNavigate()
	const { user: authUser } = useAuth()

	const token = authUser?.id_token

	const whoamiApi = new WhoamiApi(
		new Configuration({
			basePath: constants.apiUrl,
			headers: { Authorization: `Bearer ${token}` },
		})
	)

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
				<p>Loading User...</p>
			</CenterComponents>
		)
	}

	if (!user || !user.id || user.id.length !== 28) {
		return (
			<CenterComponents>
				<Logo192 />
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
