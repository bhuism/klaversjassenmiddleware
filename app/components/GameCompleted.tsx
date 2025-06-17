import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Table, TableBody, TableCell, TableHead, TableRow, tableCellClasses } from "@mui/material"
import UsThem from "./UsThem"
import CompletedPlayerCards from "./game/CompletedPlayerCards"
import CompletedTricks from "./game/CompletedTricks"
import PlayerName from "./game/PlayerName"
import SuitImage from "./game/SuitImage"
import type { Game } from ".generated-sources/openapi"

const GameCompleted: React.FC<{ game: Game }> = ({ game }) => {
	if (game.turns.length !== 32) {
		throw new Error("game should be finished")
	}

	// const allPoints = game.calculateAllTrickPoints(game)

	// const { zeroTwoPoints, oneThreePoints } = allPoints.reduce(trickSummer, {
	// 	zeroTwoPoints: 0,
	// 	oneThreePoints: 0,
	// })

	const zeroTwoPoints = 0
	const oneThreePoints = 0

	return (
		<>
			<Table
				size="small"
				sx={{
					[`& .${tableCellClasses.root}`]: {
						borderBottom: "none",
					},
				}}
			>
				{zeroTwoPoints === 0 || oneThreePoints === 0 ? (
					<TableHead>
						<TableRow>
							<TableCell colSpan={2} />
							<TableCell colSpan={10}>
								<h4>Pit</h4>
							</TableCell>
						</TableRow>
					</TableHead>
				) : (
					<></>
				)}
				{(zeroTwoPoints > oneThreePoints && (game.elder === 1 || game.elder === 3)) ||
				(oneThreePoints > zeroTwoPoints && (game.elder === 0 || game.elder === 2)) ? (
					<TableHead>
						<TableRow>
							<TableCell colSpan={2} />
							<TableCell colSpan={10}>
								<h4>Nat</h4>
							</TableCell>
						</TableRow>
					</TableHead>
				) : (
					<></>
				)}
				<TableBody>
					<TableRow>
						<TableCell colSpan={2}>winnaar</TableCell>
						<TableCell colSpan={10}>
							{zeroTwoPoints > oneThreePoints ? (
								<>
									{" "}
									<UsThem game={game} zeroTwo={true} />
									<span>, </span>
									<PlayerName user={[...game.players][0]} /> & <PlayerName user={[...game.players][2]} />,{" "}
									{zeroTwoPoints} punten
								</>
							) : (
								<>
									{" "}
									<UsThem game={game} zeroTwo={false} />
									<span>, </span>
									<PlayerName user={[...game.players][1]} /> & <PlayerName user={[...game.players][3]} />,{" "}
									{oneThreePoints} punten
								</>
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>verliezer</TableCell>
						<TableCell colSpan={10}>
							{zeroTwoPoints < oneThreePoints ? (
								<>
									{" "}
									<UsThem game={game} zeroTwo={true} />
									<span>, </span>
									<PlayerName user={[...game.players][0]} /> & <PlayerName user={[...game.players][2]} />,{" "}
									{zeroTwoPoints} punten
								</>
							) : (
								<>
									{" "}
									<UsThem game={game} zeroTwo={false} />
									<span>, </span>
									<PlayerName user={[...game.players][1]} /> & <PlayerName user={[...game.players][3]} />,{" "}
									{oneThreePoints} punten
								</>
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>troef</TableCell>
						<TableCell colSpan={10}>
							<SuitImage suit={game.trump} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>
							gegaan <PlayArrowIcon />
						</TableCell>
						<TableCell colSpan={10}>
							<PlayerName user={[...game.players][game.elder as number]} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>deler</TableCell>
						<TableCell colSpan={10}>
							<PlayerName user={[...game.players][game.dealer]} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>gemaakt door</TableCell>
						<TableCell colSpan={10}>
							<PlayerName user={game.players.filter((g) => g.id === game.creator)[0]} />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<CompletedTricks game={game} />
			<CompletedPlayerCards game={game} />
		</>
	)
}

export default GameCompleted
