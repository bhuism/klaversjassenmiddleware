import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { NavLink } from "react-router"

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
								<TableCell>
									<NavLink to={`/game/${gameId}`}>{gameId}</NavLink>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default Games
