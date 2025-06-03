import { Button, CircularProgress } from "@mui/material"
import { useAuth } from "react-oidc-context"

const LoginButton: React.FC = () => {
	const { isLoading, removeUser } = useAuth()

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<>
			<Button variant="outlined" onClick={() => removeUser()}>
				Sign Out
			</Button>
		</>
	)
}
export default LoginButton
