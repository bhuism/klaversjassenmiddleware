import { Outlet } from "react-router"
import CenterComponents from "~/utils/CenterComponents"
import star from "./star.png"

const PublicLayout: React.FC = () => {
	return (
		<CenterComponents>
			<img src={star} alt={"logo"} fetchPriority="high" rel="preload" />
			<Outlet />
		</CenterComponents>
	)
}

export default PublicLayout
