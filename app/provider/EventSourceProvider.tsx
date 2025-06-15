import { EventSource } from "eventsource"
import { useSnackbar } from "notistack"
import { type PropsWithChildren, useContext, useEffect } from "react"
import UidContext from "~/context/UidContext"
import constants from "~/utils/constants"

const EventSourceProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { user } = useContext(UidContext)

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
						Authorization: `Bearer ${user?.id}`,
					},
				}),
		})

		eventSource.addEventListener("cardservermessage", (e) => {
			enqueueSnackbar(`update${JSON.stringify(e.data)}`, { variant: "info" })
		})

		eventSource.addEventListener("message", (e) => {
			enqueueSnackbar(`message:${JSON.stringify(e.data)}`, { variant: "info" })
		})

		eventSource.addEventListener("error", (e) => {
			enqueueSnackbar(`error${JSON.stringify(e.message)}`, { variant: "error" })
		})

		// terminating the connection on component unmount
		return () => eventSource.close()
	}, [user?.id, enqueueSnackbar])

	// useEffect(() => {
	// 	enqueueSnackbar(`${connectionMap[readyState]}...`, { variant: readyState === ReadyState.CLOSED ? "error" : "info" })
	// }, [enqueueSnackbar, readyState])

	return <>{children}</>
}

export default EventSourceProvider
