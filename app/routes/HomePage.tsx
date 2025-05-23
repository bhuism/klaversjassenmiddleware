import { Button, Typography } from "@mui/material"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router"
import LoginButton from "~/components/LoginButton"
import ReloadPrompt from "~/components/ReloadPrompt"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"

const Home: React.FC = () => {
	const { error, isAuthenticated } = useAuth()
	const navigate = useNavigate()
	return (
		<CenterComponents>
			<Star />
			{isAuthenticated ? (
				<>
					<h3>Home is where the heart is</h3>
					<Button variant="outlined" onClick={() => navigate("/games")}>
						Games
					</Button>
				</>
			) : (
				<></>
			)}
			<LoginButton />
			{error ? (
				<Typography style={{ color: "red" }}>
					{error.name}:{error.message}
				</Typography>
			) : (
				<></>
			)}
			<ReloadPrompt />
		</CenterComponents>
	)
}

export default Home
