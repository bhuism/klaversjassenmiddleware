import { CircularProgress, Typography } from "@mui/material"
import Games from "~/components/Games"
import useGameApi from "~/hooks/useGameApi"
import useLoadOnce from "~/hooks/useLoadOnce"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"

const GamesPage: React.FC = () => {
	const { cardApi } = useGameApi()

	const { data, isLoading, error } = useLoadOnce<Set<string>>(() => cardApi.getGames(), new Set())

	if (error) {
		return <span style={{ color: "red" }}>{error.message}</span>
	}

	if (isLoading || !data) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography>Loading games...</Typography>
			</CenterComponents>
		)
	}
	return (
		<>
			<Games games={data} />
		</>
	)
}

export default GamesPage
