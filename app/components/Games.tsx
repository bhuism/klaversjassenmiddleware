//import type { Game } from ".generated-sources/openapi/models/Game"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const GameRow: React.FC<{ gameId: string }> = ({ gameId }) => {
	return <TableCell>{gameId}</TableCell>
}

const Games: React.FC<{ games: Set<string> }> = ({ games }) => {
	//	const { data, isLoading, error } = useLoadOnce<Set<string>>(() => cardApi.getGames())

	//	const {  } = loaderData

	// if (test) {
	// 	// biome-ignore lint/suspicious/noConsole: <explanation>
	// 	console.log("test");
	// }
	//	const { games } = loaderData;

	// if (error) {
	// 	return <span style={{ color: "red" }}>{error.message}</span>
	// }

	// if (isLoading || !data) {
	// 	return (
	// 		<CenterComponents>
	// 			<CircularProgress />
	// 		</CenterComponents>
	// 	)
	// }

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableCell />
						<TableCell>Gemaakt door</TableCell>
						<TableCell />
						<TableCell>Bijgewerkt</TableCell>
					</TableHead>
					<TableBody>
						{[...games].map((gameId) => (
							<TableRow key={gameId}>
								<GameRow gameId={gameId} />
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default Games
