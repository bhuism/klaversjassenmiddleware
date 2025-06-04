import { Box, Button, Container, Stack, Typography } from "@mui/material"
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { useSnackbar } from "notistack"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { useIncomingInvitesAndFriends } from "~/hooks/useFriends"
import useCardApi from "~/hooks/useGameApi"
import UidContext from "~/provider/UidContextProvider"

const PlayerSelection: React.FC<React.PropsWithChildren> = () => {
	const { enqueueSnackbar } = useSnackbar()
	const { user } = useContext(UidContext)
	const { friends, isLoading } = useIncomingInvitesAndFriends()
	const navigate = useNavigate()
	const cardApi = useCardApi()
	const [players, setPlayers] = useState<GridRowSelectionModel>({
		type: "include",
		ids: new Set(),
	})
	const [creatingGame, setCreatingGame] = useState<boolean>(false)

	if (!user) {
		return <>no user</>
	}

	const createGame = () => {
		setCreatingGame(true)
		cardApi
			.createGame({ players: new Set([...players.ids].map((r) => r as string)) })
			.then((game) => {
				navigate(`/game/${game.id}`)
			})
			.catch((e) => {
				enqueueSnackbar(JSON.stringify(e), { variant: "error" })
				// biome-ignore lint/suspicious/noConsole: <explanation>
				console.error(e)
			})
			.finally(() => setCreatingGame(false))
	}

	const columns: GridColDef[] = [
		{ field: "id", renderCell: (r) => <Typography>{`${r.row.displayName}`}</Typography>, renderHeader: () => <></> },
	]

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
							Er {players.ids.size === 2 ? "is" : "zijn"} nog {3 - players.ids.size} speler
							{players.ids.size === 2 ? "" : "s"} nodig om het spel te starten.
						</Typography>
						<Button
							variant="outlined"
							disabled={!players || players.ids.size !== 3 || creatingGame}
							onClick={createGame}
						>
							Start Spel
						</Button>
						{/* <Button variant="outlined" onClick={() => setPlayers([])}>
									Opnieuw Spelers Kiezen
								</Button> */}

						<DataGrid
							loading={isLoading}
							columns={columns}
							rows={friends}
							// disableColumnFilter
							disableColumnMenu
							disableColumnResize
							// disableColumnSelector
							disableColumnSorting
							disableDensitySelector
							// disableVirtualization
							density="compact"
							// rowSelection={true}
							hideFooter={true}
							// showToolbar={false}
							rowSelectionModel={players}
							onRowSelectionModelChange={setPlayers}
							checkboxSelection={true}
							isRowSelectable={(r) => players.ids.size < 3 || [...players.ids].filter((row) => row === r.id).length > 0}
							// slots={{
							// 	toolbar: () => <></>,
							// 	bottomContainer: () => <></>,
							// 	panel: () => <></>,
							// 	footer: () => <></>,
							// 	pinnedRows: () => <></>,
							// }}
						/>
						{/* <UserTable
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
						/> */}
					</Stack>
				</Box>
			</Container>
		</>
	)
}

export default PlayerSelection

// const convert = (source: GameStateImpl): Game => {
// 	return {
// 		id: source.id,
// 		created: source.created,
// 		updated: source.updated,
// 		creator: source.creator,
// 		dealer: source.dealer,
// 		playerCard: new Set(source.playerCard.map((pc) => convertPlayerCard(pc))),
// 		ended: source.ended,
// 		players: new Set(source.players),
// 		turns: new Set(source.turns.map((c) => convertCardType(c))),
// 		trump: suitMap[source.trump],
// 	}
// }

// const suitMap: Record<Suit, OpenApiSuit> = {
// 	0: OpenApiSuit.Clubs,
// 	1: OpenApiSuit.Hearts,
// 	2: OpenApiSuit.Spades,
// 	3: OpenApiSuit.Diamonds,
// }

// const convertPlayerCard = (c: PlayerCard): GamePlayerCardInner => {
// 	return {
// 		card: convertCardType(c.card),
// 		player: c.player,
// 	}
// }

// const convertCardType = (c: Cardtype): Card => {
// 	return {
// 		card: convertCardNr[c.charAt(0)],
// 		color: convertSuit[c.charAt(1)],
// 	}
// }

// const convertSuit: Record<string, OpenApiSuit> = {
// 	s: OpenApiSuit.Spades,
// 	h: OpenApiSuit.Hearts,
// 	d: OpenApiSuit.Diamonds,
// 	c: OpenApiSuit.Clubs,
// }

// const convertCardNr: Record<string, CardNr> = {
// 	A: CardNr.Ace,
// 	K: CardNr.King,
// 	Q: CardNr.Queen,
// 	J: CardNr.Jack,
// 	T: CardNr.Ten,
// 	"9": CardNr.Nine,
// 	"8": CardNr.Eight,
// 	"7": CardNr.Seven,
// }
