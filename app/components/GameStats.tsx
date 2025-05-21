import type React from "react"
import { useContext } from "react"
import GameContext from "~/context/GameContext"

// const PlayerName: React.FC<{ playerUid: string }> = ({ playerUid }) => {
// 	return <Typography>{`${playerUid}`}</Typography>
// }

const GameStats: React.FC = () => {
	const game = useContext(GameContext)

	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log({ foundGame: game })

	if (!game) {
		return <>no game</>
	}

	return <>creator: {game.creator}</>

	// const allPoints = game.calculateAllTrickPoints(game)

	// const { zeroTwoPoints, oneThreePoints } = allPoints.reduce(trickSummer, {
	// 	zeroTwoPoints: 0,
	// 	oneThreePoints: 0,
	// })

	// return (
	// 	<Container>
	// 		{zeroTwoPoints === 0 || oneThreePoints === 0 ? (
	// 			<Row>
	// 				<Col sm={{ offset: 2, span: 10 }}>
	// 					<h4>Pit</h4>
	// 				</Col>
	// 			</Row>
	// 		) : (
	// 			<></>
	// 		)}
	// 		{(zeroTwoPoints > oneThreePoints && (game.elder === 1 || game.elder === 3)) ||
	// 		(oneThreePoints > zeroTwoPoints && (game.elder === 0 || game.elder === 2)) ? (
	// 			<Row>
	// 				<Col sm={{ offset: 2, span: 10 }}>
	// 					<h4>Nat</h4>
	// 				</Col>
	// 			</Row>
	// 		) : (
	// 			<></>
	// 		)}
	// 		<dl className="row">
	// 			<dt className="col-sm-2">winnaar</dt>
	// 			<dd className="col-sm-10">
	// 				{zeroTwoPoints > oneThreePoints ? (
	// 					<>
	// 						{" "}
	// 						<UsThem zeroTwo={true} />
	// 						<span>, </span>
	// 						<PlayerName playerUid={[...game.players][0]} /> & <PlayerName playerUid={[...game.players][2]} />,{" "}
	// 						{zeroTwoPoints} punten
	// 					</>
	// 				) : (
	// 					<>
	// 						{" "}
	// 						<UsThem zeroTwo={false} />
	// 						<span>, </span>
	// 						<PlayerName playerUid={[...game.players][1]} /> & <PlayerName playerUid={[...game.players][3]} />,{" "}
	// 						{oneThreePoints} punten
	// 					</>
	// 				)}
	// 			</dd>
	// 			<dt className="col-sm-2">verliezer</dt>
	// 			<dd className="col-sm-10">
	// 				{zeroTwoPoints < oneThreePoints ? (
	// 					<>
	// 						{" "}
	// 						<UsThem zeroTwo={true} />
	// 						<span>, </span>
	// 						<PlayerName playerUid={[...game.players][0]} /> & <PlayerName playerUid={[...game.players][2]} />,{" "}
	// 						{zeroTwoPoints} punten
	// 					</>
	// 				) : (
	// 					<>
	// 						{" "}
	// 						<UsThem zeroTwo={false} />
	// 						<span>, </span>
	// 						<PlayerName playerUid={[...game.players][1]} /> & <PlayerName playerUid={[...game.players][3]} />,{" "}
	// 						{oneThreePoints} punten
	// 					</>
	// 				)}
	// 			</dd>
	// 			<dt className="col-sm-2">troef</dt>
	// 			<dd className="col-sm-10">
	// 				<SuitImage suit={game.trump} />
	// 			</dd>
	// 			<dt className="col-sm-2">
	// 				gegaan <i className={"bi bi-arrow-right-circle"} />
	// 			</dt>
	// 			<dd className="col-sm-10">
	// 				<PlayerName playerUid={[...game.players][game.elder as number]} />
	// 			</dd>
	// 			<dt className="col-sm-2">deler</dt>
	// 			<dd className="col-sm-10">
	// 				<PlayerName playerUid={[...game.players][game.dealer]} />
	// 			</dd>
	// 			<dt className="col-sm-2">gemaakt door</dt>
	// 			<dd className="col-sm-10">
	// 				<PlayerName playerUid={game.creator} />
	// 			</dd>
	// 			<dd className="col-sm-10 offset-sm-2">
	// 				<GameSpeak />
	// 			</dd>
	// 			<dt className="col-sm-2">verloop</dt>
	// 			<dd className="col-sm-10">
	// 				<CompletedTricks game={game} />
	// 			</dd>
	// 			<dt className="col-sm-2">kaarten</dt>
	// 			<dd className="col-sm-10">
	// 				<CompletedPlayerCards game={game} />
	// 			</dd>
	// 		</dl>
	// 	</Container>
	// )
}
export default GameStats
