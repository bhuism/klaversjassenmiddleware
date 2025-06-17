import { Table, TableBody, TableCell, TableRow } from "@mui/material"
import PlayingCard from "../common/PlayingCard"
import { rankRegular, rankTrump, suitOf } from "../common/utils"
import PlayerName from "./PlayerName"
import type { Card, Game, Suit } from ".generated-sources/openapi"

const CompletedPlayerCards: React.FC<React.PropsWithChildren<{ game: Game }>> = ({ game }) => {
	if (game.turns.length !== 32) {
		throw new Error("game should be finished")
	}

	// const playerPoints = (player: number): number => {
	// 	return [...Array(game.tricksPlayed())]
	// 		.map((x, trickNr) => trickNr)
	// 		.filter((trickNr) => game.determineTrickWinner(trickNr) === player)
	// 		.map((trickNr) => game.calculateTrickPoints(trickNr))
	// 		.reduce((sum, current) => sum + current, 0)
	// }

	const playerPoints = (_player: number) => 0

	// const winningCards: Cardtype[] = [...Array(game.tricksPlayed())].map((x, trickNr) => {
	// 	return game.determineTrickWinningCard(trickNr)
	// })

	const sortValue = (suit: Suit): number => {
		switch (suit) {
			case "Clubs":
				return 0
			case "Diamonds":
				return 1
			case "Hearts":
				return 2
			case "Spades":
				return 3
		}
	}

	const cardSort = (left: Card, right: Card, trump: Suit): number => {
		return (
			sortValue(suitOf(left)) - sortValue(suitOf(right)) ||
			(suitOf(left) === trump ? rankTrump(right) - rankTrump(left) : rankRegular(right) - rankRegular(left))
		)
	}

	const getAllPlayerCards = (player: number): Card[] => {
		return game.playerCard
			.filter((c) => c.player === player)
			.map((pc) => pc.card)
			.sort((a, b) => cardSort(a, b, game.trump))
	}

	return (
		<Table>
			<TableBody>
				{game.players.map((user, index) => (
					<TableRow key={user.id}>
						<td key={user.id} style={{ width: "20%" }} className={"text-center align-middle"}>
							<p>
								{game.elder === game.players.map((u) => u.id).indexOf(user.id) ? (
									<>
										<i className={"bi bi-arrow-right-circle"} />{" "}
									</>
								) : (
									<></>
								)}
								<PlayerName user={user} />
							</p>
							<p className={"fs-5"}>{playerPoints(index)}</p>
						</td>
						{getAllPlayerCards(index).map((c) => (
							<TableCell key={c} style={{ padding: 1 }}>
								<PlayingCard cardType={c} style={{ maxWidth: "12vw" }} front showHalf />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
export default CompletedPlayerCards
