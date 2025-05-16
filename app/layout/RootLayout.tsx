import { Box, CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material"
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
import { SessionProvider } from "@hono/auth-js/react"
import { SnackbarProvider } from "notistack"
import { Outlet } from "react-router"
import theme from "./theme"

const RootLayout: React.FC = () => {
	return (
		<SnackbarProvider maxSnack={10} autoHideDuration={3000}>
			{/* <SocketGuard> */}
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale="nl"
				localeText={nlNL.components.MuiLocalizationProvider.defaultProps.localeText}
			>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
						<ThemeProvider theme={theme} defaultMode="system">
							<InitColorSchemeScript defaultMode="system" attribute="class" />
							<CssBaseline />
							<SessionProvider>
								<Outlet />
							</SessionProvider>
						</ThemeProvider>
					</Box>
				</Box>
			</LocalizationProvider>
			{/* </SocketGuard> */}
		</SnackbarProvider>
	)
}
export default RootLayout
