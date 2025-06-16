import { EventSource } from "eventsource"
import { useSnackbar } from "notistack"
import { type PropsWithChildren, useEffect } from "react"
import constants from "~/utils/constants"
import { LOCAL_STORAGE_JWT } from "./JwtGuard"

const EventSourceProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()
	const jwt = localStorage.getItem(LOCAL_STORAGE_JWT)

	useEffect(() => {
		const eventSource = new EventSource(`${constants.apiUrl}/subscribe`, {
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
			enqueueSnackbar(`message:${JSON.stringify(e.data)}`, { variant: "info" })
		})

		eventSource.addEventListener("ping", () => console.log("ping"))

		eventSource.addEventListener("error", (e) => {
			enqueueSnackbar(`error${JSON.stringify(e.message)}`, { variant: "error" })
		})

		// terminating the connection on component unmount
		return () => eventSource.close()
	}, [jwt, enqueueSnackbar])

	return <>{children}</>
}

export default EventSourceProvider
