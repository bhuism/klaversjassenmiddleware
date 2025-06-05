import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import LogoutButton from "~/components/button/LogoutButton"
import ReloadPrompt from "~/components/button/ReloadPrompt"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"

const Home: React.FC = () => {
	const navigate = useNavigate()
	return (
		<>
			<CenterComponents>
				<Logo192 />
				<h3>Home is where the heart is</h3>
				<Button variant="outlined" onClick={() => navigate("/game")}>
					New Game
				</Button>
				<Button variant="outlined" onClick={() => navigate("/games")}>
					Games
				</Button>
				<LogoutButton />
				<ReloadPrompt />
			</CenterComponents>
		</>
	)
}

export default Home
