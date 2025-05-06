import TimeComponent from "~/components/TimeComponent"
import CenterComponents from "~/utils/CenterComponents"

const Home: React.FC = () => {
	return (
		<CenterComponents>
			<h3>Home is where the heart is</h3>
			<TimeComponent slug="homepage" />
		</CenterComponents>
	)
}

export default Home
