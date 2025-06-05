import { Button, CircularProgress } from "@mui/material"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router"

const LoginButton: React.FC = () => {
	const { isLoading, removeUser } = useAuth()
	const navigate = useNavigate()

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<>
			<Button
				variant="outlined"
				onClick={() => {
					localStorage.clear()
					removeUser()
					navigate("/")
				}}
			>
				Sign Out
			</Button>
		</>
	)
}
export default LoginButton
