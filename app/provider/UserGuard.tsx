import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import ReloadButton from "~/components/button/ReloadButton"
import useCardApi from "~/hooks/useGameApi"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import UserContext from "./UserContext"
import type { User } from ".generated-sources/openapi"

const NavigateAndSet: React.FC<{ user: User }> = ({ user }) => {
	const { setUser } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		setUser(user)
		navigate("/")
	}, [user, setUser, navigate])

	return (
		<CenterComponents>
			<Logo192 />
			<Typography>Redirecting</Typography>
			<ReloadButton />
		</CenterComponents>
	)
}

const UserGuard: React.FC<{ userId: string }> = ({ userId }) => {
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
		//return <Navigate to={"/"} />
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

	return <NavigateAndSet user={user} />
}

export default UserGuard
