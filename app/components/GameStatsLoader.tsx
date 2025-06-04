import { Star } from "@mui/icons-material"
import { CircularProgress, Typography } from "@mui/material"
import Suit from "~/components/common/Suit"
import useCardApi from "~/hooks/useGameApi"
import useLoadOnce from "~/hooks/useLoadOnce"
import type { Cardtype, GameState, PlayerCard } from "~/types"
import CenterComponents from "~/utils/CenterComponents"
import GameStats from "./GameStats"
import GameStateImpl from "./common/GameStateImpl"
import type { Card, CardNr, Game, Suit as OpenApiSuit } from ".generated-sources/openapi"

const GameStatsLoader: React.FC<{ gameId: string }> = ({ gameId }) => {
	const cardApi = useCardApi()

	const { data, error, isLoading } = useLoadOnce<Game>(() => cardApi.getGame(gameId))

	if (error !== undefined) {
		return <Typography>{`Error: ${error}`}</Typography>
	}

	if (isLoading || data === undefined) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<Typography>{`Game ${gameId} is loading...`}</Typography>
			</CenterComponents>
		)
	}

	const cardMap: Record<CardNr, string> = {
		Seven: "7",
		Eight: "8",
		Nine: "9",
		Ten: "T",
		Jack: "J",
		Queen: "Q",
		King: "K",
		Ace: "A",
	}

	const colorMap: Record<OpenApiSuit, string> = {
		Clubs: "c",
		Diamonds: "d",
		Hearts: "h",
		Spades: "s",
	}

	const convertCard = (c: Card): Cardtype => {
		return `${cardMap[c.card]}${colorMap[c.color]}` as Cardtype
	}

	const suitMap: Record<OpenApiSuit, Suit> = {
		Clubs: Suit.Clubs,
		Diamonds: Suit.Diamonds,
		Spades: Suit.Spades,
		Hearts: Suit.Hearts,
	}

	const game: GameState = new GameStateImpl(
		data.id,
		data.created,
		data.updated,
		data.creator,
		data.dealer,
		[...data.playerCard].map(
			(pc) =>
				({
					player: pc.player,
					card: convertCard(pc.card),
				}) as PlayerCard
		),
		[...data.players.values()],
		[...data.turns].map((c) => convertCard(c)),
		suitMap[data.trump],
		data.ended,
		data.elder,
		[]
	)

	return (
		<>
			{/* <button type="button" onClick={toggleFullScreen} className="button">
				fullscreen
			</button> */}

			{/* {gameId ? <GameComponent gameId={gameId} /> : <div>Game {gameId} not found</div>} */}

			{/* <PhaserGame ref={phaserRef} /> */}

			<GameStats game={game} />
			{/* <PhaserComponent /> */}
		</>
	)
}

export default GameStatsLoader
