import dayjs from "dayjs"
import "dayjs/locale/nl"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const constants = {
	gitHash: import.meta.env.VITE_GIT_SHA as string,
	gitDate: import.meta.env.VITE_GIT_DATE as Date,
	wsUrl: import.meta.env.VITE_WS_URL as string,
	apiUrl: import.meta.env.VITE_API_URL as string,
}

export default constants
