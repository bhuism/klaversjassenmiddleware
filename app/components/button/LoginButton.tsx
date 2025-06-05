import { Button, CircularProgress } from "@mui/material"
import { useAuth } from "react-oidc-context"

const LoginButton: React.FC = () => {
	const { isLoading, signinRedirect, removeUser } = useAuth()

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<>
			<Button
				variant="outlined"
				size="large"
				onClick={() => {
					localStorage.clear()
					removeUser()
					signinRedirect()
				}}
			>
				Sign In
			</Button>
		</>
	)
}
export default LoginButton
