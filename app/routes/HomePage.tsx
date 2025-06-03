import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import LogoutButton from "~/components/LogoutButton"
import ReloadPrompt from "~/components/ReloadPrompt"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"

const Home: React.FC = () => {
	const navigate = useNavigate()
	return (
		<CenterComponents>
			<Star />
			<h3>Home is where the heart is</h3>
			<Button variant="outlined" onClick={() => navigate("/selectPlayers")}>
				New Game
			</Button>
			<Button variant="outlined" onClick={() => navigate("/games")}>
				Games
			</Button>
			<LogoutButton />
			<ReloadPrompt />
		</CenterComponents>
	)
}

export default Home
