import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { tableCellClasses } from "@mui/material/TableCell"
import type React from "react"
import type { GameState } from "~/types"
import UsThem from "./UsThem"
import { trickSummer } from "./common/utils"
import CompletedPlayerCards from "./game/CompletedPlayerCards"
import CompletedTricks from "./game/CompletedTricks"
import PlayerName from "./game/PlayerName"
import SuitImage from "./game/SuitImage"

// const PlayerName: React.FC<{ playerUid: string }> = ({ playerUid }) => {
// 	return <Typography>{`${playerUid}`}</Typography>
// }

const GameStats: React.FC<{ game: GameState }> = ({ game }) => {
	const allPoints = game.calculateAllTrickPoints(game)

	const { zeroTwoPoints, oneThreePoints } = allPoints.reduce(trickSummer, {
		zeroTwoPoints: 0,
		oneThreePoints: 0,
	})

	return (
		<Container maxWidth="xl">
			<TableContainer component={Paper}>
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
										<PlayerName playerUid={[...game.players][0]} /> & <PlayerName playerUid={[...game.players][2]} />,{" "}
										{zeroTwoPoints} punten
									</>
								) : (
									<>
										{" "}
										<UsThem game={game} zeroTwo={false} />
										<span>, </span>
										<PlayerName playerUid={[...game.players][1]} /> & <PlayerName playerUid={[...game.players][3]} />,{" "}
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
										<PlayerName playerUid={[...game.players][0]} /> & <PlayerName playerUid={[...game.players][2]} />,{" "}
										{zeroTwoPoints} punten
									</>
								) : (
									<>
										{" "}
										<UsThem game={game} zeroTwo={false} />
										<span>, </span>
										<PlayerName playerUid={[...game.players][1]} /> & <PlayerName playerUid={[...game.players][3]} />,{" "}
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
								<PlayerName playerUid={[...game.players][game.elder as number]} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>deler</TableCell>
							<TableCell colSpan={10}>
								<PlayerName playerUid={[...game.players][game.dealer]} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>gemaakt door</TableCell>
							<TableCell colSpan={10}>
								<PlayerName playerUid={game.creator} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>verloop</TableCell>
							<TableCell colSpan={10}>
								<CompletedTricks game={game} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>kaarten</TableCell>
							<TableCell colSpan={10}>
								<CompletedPlayerCards game={game} />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}
export default GameStats
