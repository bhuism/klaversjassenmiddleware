import { CircularProgress, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import ReloadButton from "~/components/button/ReloadButton"
import useLoadOnce from "~/hooks/useLoadOnce"
import useWhoAmIApi from "~/hooks/useWhoAmIApi"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"
import { LOCAL_STORAGE_USERID_KEY } from "./UidContextProvider"
import type { User } from ".generated-sources/openapi"

const WhoAmI = () => {
	const whoamiApi = useWhoAmIApi()
	const { data, isLoading, error } = useLoadOnce<User>(() => whoamiApi.whoami())
	const navigate = useNavigate()

	if (error !== undefined) {
		return <Typography>{`Error: ${error}`}</Typography>
	}

	if (isLoading) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<p>Loading current User...</p>
			</CenterComponents>
		)
	}

	if (!data || !data.id || data.id.length !== 28) {
		return (
			<CenterComponents>
				<Star />
				<p>No User..</p>
				<ReloadButton />
			</CenterComponents>
		)
	}

	localStorage.setItem(LOCAL_STORAGE_USERID_KEY, JSON.stringify(data))

	navigate("/")
}

export default WhoAmI
