import { Box, CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { nlNL } from "@mui/x-date-pickers/locales"
import "dayjs/locale/nl"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { SessionProvider } from "@hono/auth-js/react"
import dayjs from "dayjs"
import { SnackbarProvider } from "notistack"
import { Outlet } from "react-router"
import type { Route } from "./+types/RootLayout"
import AuthGuard from "./AuthGuard"
import theme from "./theme"

export async function loader({ context }: Route.LoaderArgs) {
	const { lang } = context
	return { lang }
}

const RootLayout: React.FC<Route.ComponentProps> = ({ loaderData }) => {
	const lang = loaderData.lang

	dayjs.locale(lang)

	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			adapterLocale="nl"
			localeText={nlNL.components.MuiLocalizationProvider.defaultProps.localeText}
		>
			<SnackbarProvider maxSnack={10} autoHideDuration={5000}>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
						<ThemeProvider theme={theme} defaultMode="system">
							<InitColorSchemeScript defaultMode="system" attribute="class" />
							<CssBaseline />
							<SessionProvider>
								<AuthGuard>
									<Outlet />
								</AuthGuard>
							</SessionProvider>
						</ThemeProvider>
					</Box>
				</Box>
			</SnackbarProvider>
		</LocalizationProvider>
	)
}
export default RootLayout
