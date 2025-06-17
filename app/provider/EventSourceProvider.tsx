import { EventSource } from "eventsource"
import { useSnackbar } from "notistack"
import { type PropsWithChildren, useEffect } from "react"
import useCardApi from "~/hooks/useGameApi"
import constants from "~/utils/constants"
import { LOCAL_STORAGE_JWT } from "./JwtGuard"

const EventSourceProvider: React.FC<PropsWithChildren> = ({ children }) => {
	//const notifications = useNotifications()
	const { enqueueSnackbar } = useSnackbar()
	const jwt = localStorage.getItem(LOCAL_STORAGE_JWT)
	const cardApi = useCardApi()

	useEffect(() => {
		const eventSource = new EventSource(`${constants.apiUrl}/api/v1/subscribe`, {
			fetch: (input, init) =>
				fetch(input, {
					...init,
					mode: "cors",
					credentials: "include",
					redirect: "error",
					keepalive: true,
					cache: "no-store",
					headers: {
						...init.headers,
						Authorization: `Bearer ${jwt}`,
					},
				}),
		})

		eventSource.addEventListener("cardservermessage", (e) => {
			enqueueSnackbar(`${e.data}`, { variant: "info" })
		})

		eventSource.addEventListener("message", (e) => {
			enqueueSnackbar(`:${JSON.stringify(e.data)}`, { variant: "warning" })
		})

		eventSource.addEventListener("ping", () => cardApi.pong())

		eventSource.addEventListener("error", (e) => {
			enqueueSnackbar(`${JSON.stringify(e.message)}`, { variant: "error" })
		})

		// terminating the connection on component unmount
		return () => eventSource.close()
	}, [jwt, enqueueSnackbar, cardApi])

	return <>{children}</>
}

export default EventSourceProvider
