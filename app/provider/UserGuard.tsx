import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import useCardApi from "~/hooks/useGameApi"
import useUser from "~/hooks/useUser"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"

const LoadUser: React.FC<React.PropsWithChildren<{ userId: string }>> = ({ userId, children }) => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log("load user...")

	const cardApi = useCardApi()
	const navigate = useNavigate()
	sessionStorage.clear()

	const {
		data: user,
		isPending,
		error,
	} = useQuery({
		queryFn: ({ queryKey }) => cardApi.getUser(queryKey[1]),
		queryKey: ["userId", userId],
	})

	if (error) {
		localStorage.clear()
		navigate("/")
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
		navigate("/")
	}

	sessionStorage.clear()
	sessionStorage.setItem("user", JSON.stringify(user))

	return <>{children}</>
}

const UserGuard: React.FC<React.PropsWithChildren<{ userId: string }>> = ({ userId, children }) => {
	const { user } = useUser()

	if (user && user.id === userId) {
		return <>{children}</>
	}

	return <LoadUser userId={userId}>{children}</LoadUser>
}

export default UserGuard
