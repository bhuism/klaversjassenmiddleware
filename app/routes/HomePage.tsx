import { Typography } from "@mui/material"
import { useAuth } from "react-oidc-context"
import LoginButton from "~/components/LoginButton"
import ReloadPrompt from "~/components/ReloadPrompt"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"

const Home: React.FC = () => {
	const { error } = useAuth()
	return (
		<CenterComponents>
			<Star />
			<h3>Home is where the heart is</h3>
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
