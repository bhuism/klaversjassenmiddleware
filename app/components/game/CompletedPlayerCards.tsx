import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Table, TableBody, TableCell, TableContainer, TableRow, tableCellClasses } from "@mui/material"
import type React from "react"
import PlayingCard from "../common/PlayingCard"
import PlayerName from "./PlayerName"
import type { Game, User } from ".generated-sources/openapi"

const CompletedPlayerCards: React.FC<React.PropsWithChildren<{ game: Game }>> = ({ game }) => {
	// const playerPoints = (player: number): number => {
	// 	return [...Array(game.tricksPlayed())]
	// 		.map((_x, trickNr) => trickNr)
	// 		.filter((trickNr) => game.determineTrickWinner(trickNr) === player)
	// 		.map((trickNr) => game.calculateTrickPoints(trickNr))
	// 		.reduce((sum, current) => sum + current, 0)
	// }

	// const winningCards: Cardtype[] = [...Array(game.tricksPlayed())].map((_x, trickNr) => {
	// 	return game.determineTrickWinningCard(trickNr)
	// })

	return (
		<TableContainer>
			<Table
				size="small"
				sx={{
					[`& .${tableCellClasses.root}`]: {
						borderBottom: "none",
						padding: 0,
						margin: 0,
					},
				}}
			>
				<TableBody>
					{game.players.map((user: User, index: number) => (
						<TableRow key={uid}>
							<TableCell key={uid} align="center">
								<p>
									<PlayerName user={user} />
									{game.elder === game.players.indexOf(uid) ? (
										<>
											{" "}
											<PlayArrowIcon />
										</>
									) : (
										<></>
									)}
								</p>
								<p className={"fs-5"}>{playerPoints(index)}</p>
							</TableCell>
							{game.getAllPlayerCards(index).map((c) => (
								<TableCell
									key={c}
									align="center"
									style={{
										backgroundColor: winningCards.includes(c) ? "green" : "",
									}}
								>
									<PlayingCard cardType={c} front={true} style={{ width: "5vw", minWidth: "80px" }} />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
export default CompletedPlayerCards
