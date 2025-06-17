import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { type PropsWithChildren, useEffect } from "react"
import ReloadButton from "~/components/button/ReloadButton"
import useCardApi from "~/hooks/useGameApi"
import useUser, { SESSION_STORAGE_JWT } from "~/hooks/useUser"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"
import { LOCAL_STORAGE_JWT } from "./JwtGuard"

const Pinger: React.FC<PropsWithChildren> = ({ children }) => {
	const cardApi = useCardApi()

	const MINUTE_MS = 15 * 1000

	useEffect(() => {
		const interval = setInterval(() => {
			cardApi.ping()
		}, MINUTE_MS)

		return () => clearInterval(interval)
	}, [cardApi])

	useEffect(() => {
		cardApi.ping()
	}, [cardApi])

	return <>{children}</>
}

const LoadUser: React.FC<React.PropsWithChildren<{ userId: string }>> = ({ userId, children }) => {
	const cardApi = useCardApi()

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
				<Typography>User is loading...</Typography>
			</CenterComponents>
		)
	}

	if (!user) {
		localStorage.setItem(LOCAL_STORAGE_JWT, "")
		return (
			<CenterComponents>
				<Logo192 />
				<Typography>No user</Typography>
				<ReloadButton />
			</CenterComponents>
		)
	}

	sessionStorage.setItem(SESSION_STORAGE_JWT, JSON.stringify(user))

	return <Pinger>{children}</Pinger>
}

const UserGuard: React.FC<React.PropsWithChildren<{ userId: string }>> = ({ userId, children }) => {
	const { user } = useUser()

	if (!user || user.id !== userId) {
		return <LoadUser userId={userId}>{children}</LoadUser>
	}

	return <Pinger>{children}</Pinger>
}

export default UserGuard
