import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
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
			<TableCell>{trickNr + 1}</TableCell>
			{[...Array(4)].map((_x, cardNr) => (
				<TableCell
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={cardNr}
					style={
						game.determineTrickWinningCard(trickNr) === game.turns[trickNr * 4 + cardNr]
							? { backgroundColor: "green" }
							: {}
					}
				>
					<Container>
						<PlayingCard
							style={{ width: "5vw", minWidth: "80px" }}
							cardType={game.turns[trickNr * 4 + cardNr]}
							front={true}
						/>
						<PlayerName playerUid={game.players[game.getCardHolderByCard(game.turns[trickNr * 4 + cardNr])]} />
					</Container>
				</TableCell>
			))}
			<td className={"fs-5 text-center align-middle"}>{points.zeroTwoPoints}</td>
			<td className={"fs-5 text-center align-middle"}>{points.oneThreePoints}</td>
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
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>slag</TableCell>
							<TableCell colSpan={4}>kaarten</TableCell>
							<TableCell>
								<UsThem game={game} zeroTwo={true} />
							</TableCell>
							<TableCell>
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
							<TableCell className={"fs-5"}>{zeroTwoPoints}</TableCell>
							<TableCell className={"fs-5"}>{oneThreePoints}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}
export default CompletedTricks
