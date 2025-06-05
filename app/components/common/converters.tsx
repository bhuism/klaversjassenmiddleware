import Suit from "~/components/common/Suit"
import type { Cardtype, GameState, PlayerCard } from "~/types"
import GameStateImpl from "./GameStateImpl"
import type { Card, CardNr, Game, Suit as OpenApiSuit } from ".generated-sources/openapi"

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

export const convertGame = (data: Game): GameState => {
	return new GameStateImpl(
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
}
