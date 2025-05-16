import { signIn, signOut, useSession } from "@hono/auth-js/react"
import { Button, CircularProgress } from "@mui/material"

const LoginButton: React.FC = () => {
	const { status } = useSession()

	if (status === "loading") {
		return <CircularProgress />
	}

	if (status === "authenticated") {
		return (
			<>
				<Button variant="outlined" size="large" onClick={() => signOut({ redirect: true })}>
					Sign Out
				</Button>
			</>
		)
	}

	return (
		<>
			<Button variant="outlined" size="large" onClick={() => signIn("google")}>
				Sign In
			</Button>
		</>
	)
}
export default LoginButton
