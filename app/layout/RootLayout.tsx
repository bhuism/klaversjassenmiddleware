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
import SocketGuard from "~/provider/SocketGuard"
import theme from "./theme"

import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
dayjs.locale("nl")

const RootLayout: React.FC = () => {
	return (
		<SnackbarProvider maxSnack={10} autoHideDuration={3000}>
			<SocketGuard>
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale="nl"
					localeText={nlNL.components.MuiLocalizationProvider.defaultProps.localeText}
				>
					{/* <Box sx={{ display: "flex" }}>
						<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}> */}
					<ThemeProvider theme={theme} defaultMode="system">
						<InitColorSchemeScript defaultMode="system" attribute="class" />
						<CssBaseline />
						<AuthSessionProvider>
							{/* <Grid container rowSpacing={2}>
								<Grid
									size={12}
									offset={0}
									// size={{ xs: 12, sm: 12, md: 10, lg: 8, xl: 6 }}
									// offset={{ xs: 0, sm: 0, md: 1, lg: 2, xl: 3 }}
								> */}
							<Outlet />
							{/* </Grid>
							</Grid> */}
						</AuthSessionProvider>
					</ThemeProvider>
					{/* </Box>
					</Box> */}
				</LocalizationProvider>
			</SocketGuard>
		</SnackbarProvider>
	)
}
export default RootLayout
