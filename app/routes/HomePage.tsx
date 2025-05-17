import LoginButton from "~/components/LoginButton"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"

const Home: React.FC = () => {
	return (
		<CenterComponents>
			<Star />
			<h3>Home is where the heart is</h3>
			<LoginButton />
		</CenterComponents>
	)
}

export default Home
