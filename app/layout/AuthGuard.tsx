import { Typography } from "@mui/material"
import CircularProgress from "node_modules/@mui/material/esm/CircularProgress/CircularProgress"
import type { PropsWithChildren } from "react"
import { useAuth } from "react-oidc-context"
import CenterComponents from "~/utils/CenterComponents"

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const auth = useAuth()

	if (!auth) {
		return <Typography>no auth</Typography>
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
				<Typography>`${JSON.stringify(auth.error)}`</Typography>
			</CenterComponents>
		)
	}

	return <>{children}</>
}
export default AuthGuard
