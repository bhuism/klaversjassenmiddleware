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

	const eventSource = new EventSource(constants.wsUrl, {
		fetch: (input, init) =>
			fetch(input, {
				...init,
				headers: {
					...init.headers,
					cardserverauth: `${user?.id}`,
				},
			}),
	})

	eventSource.addEventListener("error", (e) => {
		enqueueSnackbar(JSON.stringify(e), { variant: "error" })
	})

	eventSource.addEventListener("message", (e) => {
		enqueueSnackbar(JSON.stringify(e), { variant: "info" })
	})

	// useEffect(() => {
	// 	enqueueSnackbar(`${connectionMap[readyState]}...`, { variant: readyState === ReadyState.CLOSED ? "error" : "info" })
	// }, [enqueueSnackbar, readyState])

	return <>{children}</>
}

export default SocketGuard
