import { CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material"
import Fade from "@mui/material/Fade"
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
import { Outlet } from "react-router"
import theme from "./theme"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DialogsProvider } from "@toolpad/core/useDialogs"
import { NotificationsProvider } from "@toolpad/core/useNotifications"
import relativeTime from "dayjs/plugin/relativeTime"
import { SnackbarProvider } from "notistack"
import EventSourceProvider from "~/provider/EventSourceProvider"
import JwtGuard from "~/provider/JwtGuard"
import { UserProvider } from "~/provider/UserContext"

dayjs.extend(relativeTime)
dayjs.locale("nl")

const RootLayout: React.FC = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				refetchOnReconnect: false,
			},
		},
	})

	return (
		<>
			<SnackbarProvider maxSnack={10} TransitionComponent={Fade} autoHideDuration={4000}>
				<NotificationsProvider>
					<QueryClientProvider client={queryClient}>
						<UserProvider>
							<JwtGuard>
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
							</JwtGuard>
						</UserProvider>
					</QueryClientProvider>
				</NotificationsProvider>
			</SnackbarProvider>
		</>
	)
}
export default RootLayout
