import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router"
import ReloadButton from "~/components/button/ReloadButton"
import useCardApi from "~/hooks/useGameApi"
import { setUser } from "~/hooks/useUser"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"

const UserGuard: React.FC<React.PropsWithChildren<{ userId: string }>> = ({ children, userId }) => {
	const cardApi = useCardApi()

	const {
		data: user,
		isPending,
		error,
	} = useQuery({
		queryFn: ({ queryKey }) => {
			if (!queryKey[1]) {
				throw new Error("no userid")
			}
			return cardApi.getUser(queryKey[1])
		},
		queryKey: ["userId", userId],
	})

	if (error) {
		localStorage.clear()
		sessionStorage.clear()
		return <Navigate to={"/"} />
	}

	if (isPending) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>User is loading...</Typography>
			</CenterComponents>
		)
	}

	if (!user) {
		localStorage.clear()
		sessionStorage.clear()
		return (
			<CenterComponents>
				<Logo192 />
				<Typography>No User</Typography>
				<ReloadButton />
			</CenterComponents>
		)
	}

	setUser(user)

	return <>{children}</>
}

export default UserGuard
