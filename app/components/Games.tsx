//import type { Game } from ".generated-sources/openapi/models/Game"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const GameRow: React.FC<{ gameId: string }> = ({ gameId }) => {
	return <TableCell>{gameId}</TableCell>
}

const Games: React.FC<{ games: Set<string> }> = ({ games }) => {
	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Gemaakt door</TableCell>
							<TableCell>Bijgewerkt</TableCell>
						</TableRow>
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
