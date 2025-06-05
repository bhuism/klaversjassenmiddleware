import ReloadPrompt from "~/components/button/ReloadPrompt"
import Logo192 from "~/layout/Logo192"
import CenterComponents from "~/utils/CenterComponents"

const Home: React.FC = () => {
	return (
		<>
			<CenterComponents>
				<Logo192 />
				<ReloadPrompt />
			</CenterComponents>
		</>
	)
}

export default Home
