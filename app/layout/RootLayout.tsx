import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { nlNL } from "@mui/x-date-pickers/locales"
import "dayjs/locale/nl"
import AuthSessionProviderAuth0 from "~/provider/AuthSessionProviderAuth0"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import CircularProgress from "@mui/material/CircularProgress"
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript"
import { SnackbarProvider } from "notistack"
import type { PropsWithChildren } from "react"
import { useAuth } from "react-oidc-context"
import { Outlet } from "react-router"
import CenterComponents from "~/utils/CenterComponents"
import theme from "./theme"
//import theme from "./theme"

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const auth = useAuth()

	if (!auth) {
		return <>no auth</>
	}

	if (auth.isLoading) {
		return (
			<CenterComponents>
				<CircularProgress />
				<p>auth is loading</p>
			</CenterComponents>
		)
	}

	// just log
	if (auth.error) {
		return (
			<CenterComponents>
				<p>`${JSON.stringify(auth.error)}`</p>
			</CenterComponents>
		)
	}

	return <>{children}</>
}

const RootLayout: React.FC = () => {
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
							<AuthSessionProviderAuth0>
								<AuthGuard>
									<Outlet />
								</AuthGuard>
							</AuthSessionProviderAuth0>
						</ThemeProvider>
					</Box>
				</Box>
			</SnackbarProvider>
		</LocalizationProvider>
	)
}
export default RootLayout
