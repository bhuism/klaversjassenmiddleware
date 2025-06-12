import { EventSource } from "eventsource"
import { useSnackbar } from "notistack"
import { type PropsWithChildren, useContext } from "react"
import constants from "~/utils/constants"
import UidContext from "./UidContextProvider"

export type MessageType = {
	type: "message"
	text: string
}

const SocketGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { user } = useContext(UidContext)

	if (user?.id) {
		const eventSource = new EventSource(constants.wsUrl, {
			fetch: (input, init) =>
				fetch(input, {
					...init,
					headers: {
						...init.headers,
						cardserverauth: `${user?.id}`,
						Authorization: "Bearer myToken",
					},
				}),
		})

		eventSource.addEventListener("error", (e) => {
			enqueueSnackbar(`error${JSON.stringify(e)}`, { variant: "error" })
		})

		eventSource.addEventListener("notice", (e) => {
			enqueueSnackbar(`notice${JSON.stringify(e)}`, { variant: "info" })
		})

		eventSource.addEventListener("update", (e) => {
			enqueueSnackbar(`update${JSON.stringify(e)}`, { variant: "info" })
		})

		eventSource.addEventListener("event", (e) => {
			enqueueSnackbar(`event${JSON.stringify(e)}`, { variant: "info" })
		})

		eventSource.addEventListener("message", (e) => {
			enqueueSnackbar(`message:${JSON.stringify(e)}`, { variant: "info" })
		})

		// useEffect(() => {
		// 	enqueueSnackbar(`${connectionMap[readyState]}...`, { variant: readyState === ReadyState.CLOSED ? "error" : "info" })
		// }, [enqueueSnackbar, readyState])
	}

	return <>{children}</>
}

export default SocketGuard
