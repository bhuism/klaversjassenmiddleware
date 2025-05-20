import { Button, CircularProgress } from "@mui/material"
import { useAuth } from "react-oidc-context"

const LoginButton: React.FC = () => {
	const { isLoading, isAuthenticated, signinRedirect, removeUser } = useAuth()

	if (isLoading) {
		return <CircularProgress />
	}

	if (isAuthenticated) {
		return (
			<>
				<Button variant="outlined" size="large" onClick={() => removeUser()}>
					Sign Out
				</Button>
			</>
		)
	}

	return (
		<>
			<Button variant="outlined" size="large" onClick={() => signinRedirect()}>
				Sign In
			</Button>
		</>
	)
}
export default LoginButton
