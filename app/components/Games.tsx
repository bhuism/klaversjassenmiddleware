import { CircularProgress } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import useCardApi from "~/hooks/useCardApi"
import useLoadOnce from "~/hooks/useLoadOnce"
import CenterComponents from "~/utils/CenterComponents"
import GameComponent from "./GameComponent"

const Games: React.FC = () => {
	const { cardApi } = useCardApi()

	const { data, isLoading, error } = useLoadOnce<Set<string>>(() => cardApi.getGames())

	if (error) {
		return <span style={{ color: "red" }}>{error.message}</span>
	}

	if (isLoading || !data) {
		return (
			<CenterComponents>
				<CircularProgress />
			</CenterComponents>
		)
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{Array.from(data).map((gameId) => (
						<TableRow key={gameId}>
							<TableCell component="th" scope="row">
								<GameComponent gameId={gameId} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default Games
