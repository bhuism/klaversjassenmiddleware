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
import AuthSessionProvider from "~/provider/AuthSessionProvider"
import theme from "./theme"

import relativeTime from "dayjs/plugin/relativeTime"
import SocketGuard from "~/provider/SocketGuard"

dayjs.extend(relativeTime)
dayjs.locale("nl")

const RootLayout: React.FC = () => {
	return (
		<SnackbarProvider maxSnack={10} autoHideDuration={3000}>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale="nl"
				localeText={nlNL.components.MuiLocalizationProvider.defaultProps.localeText}
			>
				<ThemeProvider theme={theme} defaultMode="system">
					<InitColorSchemeScript defaultMode="system" attribute="class" />
					<CssBaseline />
					<AuthSessionProvider>
						<SocketGuard>
							<Outlet />
						</SocketGuard>
					</AuthSessionProvider>
				</ThemeProvider>
			</LocalizationProvider>
		</SnackbarProvider>
	)
}
export default RootLayout
