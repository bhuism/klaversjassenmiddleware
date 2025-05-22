import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import type React from "react"
import type { Cardtype, GameState } from "~/types"
import PlayingCard from "../common/PlayingCard"
import PlayerName from "./PlayerName"

const CompletedPlayerCards: React.FC<React.PropsWithChildren<{ game: GameState }>> = ({ game }) => {
	const playerPoints = (player: number): number => {
		return [...Array(game.tricksPlayed())]
			.map((_x, trickNr) => trickNr)
			.filter((trickNr) => game.determineTrickWinner(trickNr) === player)
			.map((trickNr) => game.calculateTrickPoints(trickNr))
			.reduce((sum, current) => sum + current, 0)
	}

	const winningCards: Cardtype[] = [...Array(game.tricksPlayed())].map((_x, trickNr) => {
		return game.determineTrickWinningCard(trickNr)
	})

	return (
		<TableContainer>
			<Table>
				<TableBody>
					{game.players.map((uid: string, index: number) => (
						<TableRow key={uid}>
							<TableCell key={uid} style={{ width: "20%" }} className={"text-center align-middle"}>
								<p>
									{game.elder === game.players.indexOf(uid) ? (
										<>
											<i className={"bi bi-arrow-right-circle"} />{" "}
										</>
									) : (
										<></>
									)}
									<PlayerName playerUid={uid} />
								</p>
								<p className={"fs-5"}>{playerPoints(index)}</p>
							</TableCell>
							{game.getAllPlayerCards(index).map((c) => (
								<TableCell
									key={c}
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
