import { EventSource } from "eventsource"
import { useSnackbar } from "notistack"
import { type PropsWithChildren, createContext, useEffect, useState } from "react"
import useCardApi from "~/hooks/useGameApi"
import useJwt from "~/hooks/useJwt"
import constants from "~/utils/constants"

export const EventListenerContext = createContext<{
	eventSource: EventSource | undefined
}>({ eventSource: undefined })

const EventSourceProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()
	const jwt = useJwt()
	const cardApi = useCardApi()
	const [uuid, setUuid] = useState<string>()
	const [eventSource, setEventSource] = useState<EventSource>()

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

		setEventSource(eventSource)

		eventSource.addEventListener("cardservermessage", (e) => {
			enqueueSnackbar(`${e.data}`, { variant: "info" })
		})

		eventSource.addEventListener("message", (e) => {
			enqueueSnackbar(`:${JSON.stringify(e.data)}`, { variant: "warning" })
		})

		eventSource.addEventListener("ping", ({ data }) => {
			// // biome-ignore lint/suspicious/noConsole: <explanation>
			// console.log(`got ping ${data}`)
			setUuid(data)
			cardApi.pong(data)
		})

		// eventSource.addEventListener("pong", ({ data }) => {
		// 	// biome-ignore lint/suspicious/noConsole: <explanation>
		// 	console.log(`got pong ${data}`)
		// })

		eventSource.addEventListener("error", (e) => {
			enqueueSnackbar(`${JSON.stringify(e.message)}`, { variant: "error" })
		})

		// terminating the connection on component unmount
		return () => eventSource.close()
	}, [jwt, enqueueSnackbar, cardApi])

	const MINUTE_MS = 15 * 1000

	useEffect(() => {
		const interval = setInterval(() => {
			if (uuid) {
				cardApi.ping(uuid)
			}
		}, MINUTE_MS)

		return () => clearInterval(interval)
	}, [cardApi, uuid])

	useEffect(() => {
		if (uuid) {
			cardApi.ping(uuid)
		}
	})

	return <EventListenerContext value={{ eventSource }}>{children}</EventListenerContext>
}

export default EventSourceProvider
