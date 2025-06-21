import { Table, TableBody, TableCell, TableHead, TableRow, tableCellClasses } from "@mui/material"
import type React from "react"
import PlayerName from "./PlayerName"
import SuitImage from "./SuitImage"
import UsThem from "./UsThem"
import type { Game } from ".generated-sources/openapi"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"

const CompletedInfo: React.FC<{ game: Game }> = ({ game }) => {
	// const allPoints = game.calculateAllTrickPoints(game)

	// const { zeroTwoPoints, oneThreePoints } = allPoints.reduce(trickSummer, {
	// 	zeroTwoPoints: 0,
	// 	oneThreePoints: 0,
	// })

	const zeroTwoPoints = 0
	const oneThreePoints = 0

	return (
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
						<TableCell />
						<TableCell>
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
						<TableCell />
						<TableCell>
							<h4>Nat</h4>
						</TableCell>
					</TableRow>
				</TableHead>
			) : (
				<></>
			)}
			<TableBody>
				<TableRow>
					<TableCell>winnaar</TableCell>
					<TableCell>
						{zeroTwoPoints > oneThreePoints ? (
							<>
								{" "}
								<UsThem game={game} zeroTwo={true} />
								<span>, </span>
								<PlayerName user={[...game.players][0]} /> & <PlayerName user={[...game.players][2]} />, {zeroTwoPoints}{" "}
								punten
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
					<TableCell>verliezer</TableCell>
					<TableCell>
						{zeroTwoPoints < oneThreePoints ? (
							<>
								{" "}
								<UsThem game={game} zeroTwo={true} />
								<span>, </span>
								<PlayerName user={[...game.players][0]} /> & <PlayerName user={[...game.players][2]} />, {zeroTwoPoints}{" "}
								punten
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
					<TableCell>troef</TableCell>
					<TableCell>
						<SuitImage suit={game.trump} />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						gegaan <PlayArrowIcon />
					</TableCell>
					<TableCell>
						<PlayerName user={[...game.players][game.elder as number]} />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>deler</TableCell>
					<TableCell>
						<PlayerName user={[...game.players][game.dealer]} />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>gemaakt door</TableCell>
					<TableCell>
						<PlayerName user={game.players.filter((g) => g.id === game.creator)[0]} />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default CompletedInfo
