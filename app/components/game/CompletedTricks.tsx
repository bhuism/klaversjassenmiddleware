import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	tableCellClasses,
} from "@mui/material"
import type { GameState } from "~/types"
import UsThem from "../UsThem"
import PlayingCard from "../common/PlayingCard"
import { trickSummer } from "../common/utils"
import PlayerName from "./PlayerName"

const TrickRow: React.FC<
	React.PropsWithChildren<{
		game: GameState
		trickNr: number
		points: { zeroTwoPoints: number; oneThreePoints: number }
	}>
> = ({ game, trickNr, points }) => {
	return (
		<TableRow>
			<TableCell align="center">{trickNr + 1}</TableCell>
			{[...Array(4)].map((_x, cardNr) => (
				<TableCell
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={cardNr}
					align="center"
					style={
						game.determineTrickWinningCard(trickNr) === game.turns[trickNr * 4 + cardNr]
							? { backgroundColor: "green" }
							: {}
					}
				>
					<PlayingCard
						style={{ width: "5vw", minWidth: "80px" }}
						cardType={game.turns[trickNr * 4 + cardNr]}
						front={true}
					/>
					<PlayerName playerUid={game.players[game.getCardHolderByCard(game.turns[trickNr * 4 + cardNr])]} />
				</TableCell>
			))}
			<TableCell align="center">{points.zeroTwoPoints}</TableCell>
			<TableCell align="center">{points.oneThreePoints}</TableCell>
		</TableRow>
	)
}

const CompletedTricks: React.FC<React.PropsWithChildren<{ game: GameState }>> = ({ game }) => {
	const allPoints = game.calculateAllTrickPoints(game)

	const { zeroTwoPoints, oneThreePoints } = allPoints.reduce(trickSummer, {
		zeroTwoPoints: 0,
		oneThreePoints: 0,
	})

	return (
		<Container>
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
					<TableHead>
						<TableRow>
							<TableCell align="center">slag</TableCell>
							<TableCell align="center">1</TableCell>
							<TableCell align="center">2</TableCell>
							<TableCell align="center">3</TableCell>
							<TableCell align="center">4</TableCell>
							<TableCell align="center">
								<UsThem game={game} zeroTwo={true} />
							</TableCell>
							<TableCell align="center">
								<UsThem game={game} zeroTwo={false} />
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{[...Array(game.tricksPlayed())].map((_x, trickNr) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<TrickRow key={trickNr} game={game} trickNr={trickNr} points={allPoints[trickNr]} />
						))}
						<TableRow style={zeroTwoPoints + oneThreePoints !== 162 ? { background: "red" } : {}}>
							<TableCell colSpan={5} />
							<TableCell align="center">{zeroTwoPoints}</TableCell>
							<TableCell align="center">{oneThreePoints}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}
export default CompletedTricks
