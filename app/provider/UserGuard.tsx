import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router"
import useCardApi from "~/hooks/useGameApi"
import useUser from "~/hooks/useUser"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import { LOCAL_STORAGE_JWT } from "./JwtGuard"

const LoadUser: React.FC<React.PropsWithChildren<{ userId: string }>> = ({ userId, children }) => {
	const cardApi = useCardApi()
	const { setUser } = useUser()

	const {
		data: user,
		isPending,
		error,
	} = useQuery({
		queryFn: ({ queryKey }) => cardApi.getUser(queryKey[1]),
		queryKey: ["userId", userId],
	})

	if (error) {
		localStorage.setItem(LOCAL_STORAGE_JWT, "")
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
		localStorage.setItem(LOCAL_STORAGE_JWT, "")
		return <Navigate to={"/"} />
	}

	setUser(user)

	return <>{children}</>
}

const UserGuard: React.FC<React.PropsWithChildren<{ userId: string }>> = ({ userId, children }) => {
	const { user } = useUser()

	if (!user || user.id !== userId) {
		return <LoadUser userId={userId}>{children}</LoadUser>
	}

	return <>{children}</>
}

export default UserGuard
