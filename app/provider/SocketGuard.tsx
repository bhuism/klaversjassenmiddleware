import { EventSource } from "eventsource"
import { useSnackbar } from "notistack"
import type { PropsWithChildren } from "react"
import constants from "~/utils/constants"

export type MessageType = {
	type: "message"
	text: string
}

const SocketGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()

	const eventSource = new EventSource(constants.wsUrl)

	eventSource.addEventListener("error", (e) => {
		enqueueSnackbar(JSON.stringify(e), { variant: "error" })
	})

	// useEffect(() => {
	// 	enqueueSnackbar(`${connectionMap[readyState]}...`, { variant: readyState === ReadyState.CLOSED ? "error" : "info" })
	// }, [enqueueSnackbar, readyState])

	return <>{children}</>
}

export default SocketGuard
