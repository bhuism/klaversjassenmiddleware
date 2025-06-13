import { CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { nlNL } from "@mui/x-date-pickers/locales"
import "dayjs/locale/bs"
import "dayjs/locale/en"
import "dayjs/locale/nl"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import dayjs from "dayjs"
import { SnackbarProvider } from "notistack"
import { Outlet } from "react-router"
import theme from "./theme"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DialogsProvider } from "@toolpad/core/useDialogs"
import relativeTime from "dayjs/plugin/relativeTime"
import EventSourceProvider from "~/provider/EventSourceProvider"
import UidContextProvider from "~/provider/UidContextProvider"

dayjs.extend(relativeTime)
dayjs.locale("nl")

const RootLayout: React.FC = () => {
	const queryClient = new QueryClient()
	//	const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<MessageType>(constants.wsUrl, { share: true })

	return (
		<>
			<SnackbarProvider maxSnack={10} autoHideDuration={3000}>
				<QueryClientProvider client={queryClient}>
					<UidContextProvider>
						<EventSourceProvider>
							<ThemeProvider theme={theme} defaultMode="system">
								<InitColorSchemeScript defaultMode="system" attribute="class" />
								<CssBaseline />
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale="nl"
									localeText={nlNL.components.MuiLocalizationProvider.defaultProps.localeText}
								>
									<DialogsProvider>
										<Outlet />
									</DialogsProvider>
								</LocalizationProvider>
							</ThemeProvider>
						</EventSourceProvider>
					</UidContextProvider>
				</QueryClientProvider>
			</SnackbarProvider>
		</>
	)
}
export default RootLayout
