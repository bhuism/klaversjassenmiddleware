import { Button, Container, Stack, Typography } from "@mui/material"
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useNavigate } from "react-router"
import useCardApi from "~/hooks/useGameApi"
import useIncomingInvitesAndFriends from "~/hooks/useIncomingInvitesAndFriends"
import useUser from "~/hooks/useUser"

const PlayerSelection: React.FC<React.PropsWithChildren> = () => {
	const { enqueueSnackbar } = useSnackbar()
	const { user } = useUser()
	const { friends, isLoading, refetch } = useIncomingInvitesAndFriends()
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

	const createGame = (currentUser: string) => {
		setCreatingGame(true)
		cardApi
			.createGame({ players: new Set([...players.ids, currentUser].map((r) => r as string)) })
			.then((game) => {
				navigate(`/play/${game.id}`)
			})
			.catch((e) => {
				enqueueSnackbar(JSON.stringify(e), { variant: "error" })
				// biome-ignore lint/suspicious/noConsole: <explanation>
				console.error(e)
			})
			.finally(() => setCreatingGame(false))
	}

	const columns: GridColDef[] = [
		{
			field: "id",
			renderCell: (r) => `${r.row.displayName}`,
			flex: 1,
			headerName: "",
		},
	]

	return (
		<>
			<Stack alignItems={"center"} justifyItems={"center"} padding={2} spacing={2}>
				<Typography>Voeg hieronder spelers toe aan het nieuwe spel.</Typography>
				<Typography>
					Er {players.ids.size === 2 ? "is" : "zijn"} nog {3 - players.ids.size} speler
					{players.ids.size === 2 ? "" : "s"} nodig om het spel te starten.
				</Typography>
				<Stack direction={"row"} spacing={2}>
					<Button
						variant="outlined"
						disabled={!players || players.ids.size !== 3 || creatingGame}
						onClick={() => createGame(user.id)}
					>
						Start Spel
					</Button>
					<Button variant="outlined" disabled={isLoading} onClick={() => refetch()}>
						Reload
					</Button>
				</Stack>
			</Stack>
			<Container style={{ display: "flex", flexDirection: "column" }} maxWidth={"xs"}>
				<DataGrid
					loading={isLoading}
					columns={columns}
					rows={friends}
					hideFooter
					disableColumnFilter
					disableColumnMenu
					disableAutosize
					disableColumnResize
					disableColumnSelector
					disableColumnSorting
					disableDensitySelector
					disableVirtualization
					density="compact"
					rowSelection
					rowSelectionModel={players}
					onRowSelectionModelChange={setPlayers}
					checkboxSelection={true}
					disableMultipleRowSelection={false}
					isRowSelectable={(r) => players.ids.size < 3 || [...players.ids].filter((row) => row === r.id).length > 0}
					showCellVerticalBorder={false}
					showColumnVerticalBorder={false}
					slotProps={{
						loadingOverlay: {
							variant: "circular-progress",
							noRowsVariant: "circular-progress",
						},
					}}
				/>
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
