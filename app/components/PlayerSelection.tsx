import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { useIncomingInvitesAndFriends } from "~/hooks/useFriends"
import useCardApi from "~/hooks/useGameApi"
import UidContext from "~/provider/UidContextProvider"
import type { Cardtype, PlayerCard } from "~/types"
import UserTable from "./UserTable"
import GameStateImpl from "./common/GameStateImpl"
import type Suit from "./common/Suit"
import { allCardtype, getRandomArbitrary, shuffle } from "./common/utils"
import { type Card, CardNr, type Game, type GamePlayerCardInner, Suit as OpenApiSuit } from ".generated-sources/openapi"

const PlayerSelection: React.FC<React.PropsWithChildren> = () => {
	const { enqueueSnackbar } = useSnackbar()
	const { user } = useContext(UidContext)
	const { friends } = useIncomingInvitesAndFriends()
	const navigate = useNavigate()
	const cardApi = useCardApi()

	if (!user) {
		return <>no user</>
	}

	const [players, setPlayers] = useState<string[]>([user.id])

	const createGame = () => {
		const deckNumbers: number[] = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
			31,
		]

		const shuffler: Array<number> = shuffle([...deckNumbers])

		const playerCards = shuffler.map((value, index) => ({
			player: index % 4,
			card: allCardtype[value],
		}))

		const now = new Date()

		const newGame = new GameStateImpl(
			"",
			now,
			now,
			user.id,
			getRandomArbitrary(0, 3),
			playerCards,
			players,
			[],
			getRandomArbitrary(0, 3),
			false,
			undefined,
			[]
		)

		const postGame = convert(newGame)

		cardApi
			.createGame(postGame)
			.then((game) => {
				navigate(`/game/${game.id}`)
			})
			.catch((e) => {
				enqueueSnackbar(JSON.stringify(e), { variant: "error" })
				// biome-ignore lint/suspicious/noConsole: <explanation>
				console.error(e)
			})
	}

	return (
		<>
			<Container>
				<Box alignItems="center">
					<Stack
						// divider={<Divider orientation="horizontal" flexItem />}
						alignItems={"center"}
					>
						<Typography>Voeg hieronder spelers toe aan het spel.</Typography>
						<Typography>
							Er {players.length === 3 ? "is" : "zijn"} nog {4 - players.length} speler
							{players.length === 3 ? "" : "s"} nodig om het spel te starten.
						</Typography>
						{players && players.length === 4 ? (
							<Button variant="outlined" onClick={createGame}>
								Start
							</Button>
						) : (
							<></>
						)}
						<UserTable
							buttons={[
								{
									callback: (u) => setPlayers(players.filter((p) => p !== u.id)),
									button: <RemoveCircleOutlineIcon />,
								},
							]}
							users={(friends ? friends : []).filter((u) => players.includes(u.id))}
							caption={"Gekozen spelers:"}
						/>
						<UserTable
							buttons={[
								{
									callback: (u) => {
										setPlayers(players.concat(u.id))
									},
									button: <AddCircleOutlineIcon />,
								},
							]}
							users={(friends ? friends : []).filter((u) => !players.includes(u.id))}
							caption={"Vrienden"}
						/>
					</Stack>
				</Box>
			</Container>
		</>
	)
}

export default PlayerSelection

const convert = (source: GameStateImpl): Game => {
	return {
		id: source.id,
		created: source.created,
		updated: source.updated,
		creator: source.creator,
		dealer: source.dealer,
		playerCard: new Set(source.playerCard.map((pc) => convertPlayerCard(pc))),
		ended: source.ended,
		players: new Set(source.players),
		turns: new Set(source.turns.map((c) => convertCardType(c))),
		trump: suitMap[source.trump],
	}
}

const suitMap: Record<Suit, OpenApiSuit> = {
	0: OpenApiSuit.Clubs,
	1: OpenApiSuit.Hearts,
	2: OpenApiSuit.Spades,
	3: OpenApiSuit.Diamonds,
}

const convertPlayerCard = (c: PlayerCard): GamePlayerCardInner => {
	return {
		card: convertCardType(c.card),
		player: c.player,
	}
}

const convertCardType = (c: Cardtype): Card => {
	return {
		card: convertCardNr[c.charAt(0)],
		color: convertSuit[c.charAt(1)],
	}
}

const convertSuit: Record<string, OpenApiSuit> = {
	s: OpenApiSuit.Spades,
	h: OpenApiSuit.Hearts,
	d: OpenApiSuit.Diamonds,
	c: OpenApiSuit.Clubs,
}

const convertCardNr: Record<string, CardNr> = {
	A: CardNr.Ace,
	K: CardNr.King,
	Q: CardNr.Queen,
	J: CardNr.Jack,
	T: CardNr.Ten,
	"9": CardNr.Nine,
	"8": CardNr.Eight,
	"7": CardNr.Seven,
}
