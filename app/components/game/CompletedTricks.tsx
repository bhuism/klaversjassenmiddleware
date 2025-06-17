import { Table, TableBody, TableCell, TableHead, TableRow, tableCellClasses } from "@mui/material"
import PlayingCard from "../common/PlayingCard"
import PlayerName from "./PlayerName"
import type { Card, Game } from ".generated-sources/openapi"

const TrickRow: React.FC<
	React.PropsWithChildren<{
		game: Game
		trickNr: number
		//points: { zeroTwoPoints: number; oneThreePoints: number }
	}>
> = ({ game, trickNr }) => {
	const getCardHolderByCard = (card: Card): number => {
		if (game.playerCard.filter((pc) => pc.player === 0 && pc.card === card).pop()) {
			return 0
		}

		if (game.playerCard.filter((pc) => pc.player === 1 && pc.card === card).pop()) {
			return 1
		}

		if (game.playerCard.filter((pc) => pc.player === 2 && pc.card === card).pop()) {
			return 2
		}

		if (game.playerCard.filter((pc) => pc.player === 3 && pc.card === card).pop()) {
			return 3
		}

		return 0
	}

	return (
		<TableRow>
			<TableCell align="center">{trickNr + 1}</TableCell>
			{[...Array(4)].map((_x, cardNr) => (
				<TableCell
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={cardNr}
					align="center"
					style={{ padding: 1 }}
					// style={
					// 	game.determineTrickWinningCard(trickNr) === game.turns[trickNr * 4 + cardNr]
					// 		? { backgroundColor: "green" }
					// 		: {}
					// }
				>
					<PlayingCard style={{ maxWidth: "12vw" }} cardType={game.turns[trickNr * 4 + cardNr]} showHalf />
					<PlayerName user={game.players[getCardHolderByCard(game.turns[trickNr * 4 + cardNr])]} />
				</TableCell>
			))}
			{/* <TableCell align="center">{points.zeroTwoPoints}</TableCell> */}
			{/* <TableCell align="center">{points.oneThreePoints}</TableCell> */}
		</TableRow>
	)
}

const CompletedTricks: React.FC<React.PropsWithChildren<{ game: Game }>> = ({ game }) => {
	if (game.turns.length !== 32) {
		throw new Error("game should be finished")
	}

	//const allPoints = game.calculateAllTrickPoints(game)

	// const { zeroTwoPoints, oneThreePoints } = allPoints.reduce(trickSummer, {
	// 	zeroTwoPoints: 0,
	// 	oneThreePoints: 0,
	// })

	const tricksPlayed = (game: Game): number => {
		return (game.turns.length - (game.turns.length % 4)) / 4
	}

	return (
		<Table
			sx={{
				[`& .${tableCellClasses.root}`]: {
					borderBottom: "none",
					padding: 0,
					margin: 0,
				},
			}}
		>
			<TableHead>
				<TableRow>
					<TableCell align="center">slag</TableCell>
					<TableCell align="center">1</TableCell>
					<TableCell align="center">2</TableCell>
					<TableCell align="center">3</TableCell>
					<TableCell align="center">4</TableCell>
					<TableCell align="center">{/* <UsThem game={game} zeroTwo={true} /> */}</TableCell>
					<TableCell align="center">{/* <UsThem game={game} zeroTwo={false} /> */}</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{[...Array(tricksPlayed(game))].map((_x, trickNr) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TrickRow key={trickNr} game={game} trickNr={trickNr} />
				))}
				{/* <TableRow
							style={
								zeroTwoPoints + oneThreePoints !== 162 ? { background: game.isCompleted() ? "red" : undefined } : {}
							}
						>
							<TableCell colSpan={5} />
							<TableCell align="center">{zeroTwoPoints}</TableCell>
							<TableCell align="center">{oneThreePoints}</TableCell>
						</TableRow> */}
			</TableBody>
		</Table>
	)
}
export default CompletedTricks
