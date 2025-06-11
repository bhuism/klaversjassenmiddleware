import {
	CheckCircleTwoTone,
	DeleteOutlineTwoTone,
	GroupsTwoTone,
	HelpTwoTone,
	LoopTwoTone,
	PersonOutlineTwoTone,
} from "@mui/icons-material"
import { CircularProgress, Container, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem, type GridColDef } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"
import { useDialogs } from "@toolpad/core/useDialogs"
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import { useContext } from "react"
import { useNavigate } from "react-router"
import { default as useGameApi } from "~/hooks/useGameApi"
import Logo192 from "~/layout/Logo192"
import UidContext from "~/provider/UidContextProvider"
import CenterComponents from "~/utils/CenterComponents"
import PlayerName from "./game/PlayerName"
import type { Game } from ".generated-sources/openapi"

const Games: React.FC = () => {
	const navigate = useNavigate()
	const cardApi = useGameApi()
	const { user } = useContext(UidContext)
	const { enqueueSnackbar } = useSnackbar()
	const dialogs = useDialogs()

	const { data, isLoading, error, refetch } = useQuery({
		queryFn: () => cardApi.getGames(),
		queryKey: ["getGames"],
	})

	if (error) {
		return <span style={{ color: "red" }}>{error.message}</span>
	}

	if (isLoading) {
		return (
			<CenterComponents>
				<Logo192 />
				<CircularProgress />
				<Typography>Games are loading...</Typography>
			</CenterComponents>
		)
	}

	const GameStatus: React.FC<{ game: Game }> = ({ game }) => {
		const { user } = useContext(UidContext)

		if (!user) {
			return <>no user</>
		}

		//const uid = user.id

		if (game.players && game.players.length !== 4) {
			return (
				<>
					<GroupsTwoTone /> {`${game.players.length}/4`}
				</>
			)
		}

		if (game.elder === undefined) {
			return <HelpTwoTone />
		}

		// if (game.isAanslag() === game.players.indexOf(uid) || game.playerSay() === game.players.indexOf(uid)) {
		// 	return (
		// 		<>
		// 			<ScheduleTwoTone className={"blink"} /> {`${game.tricksPlayed()}/8`}
		// 		</>
		// 	)
		// }

		if (game.turns.length === 32) {
			return <CheckCircleTwoTone />
		}

		return (
			<>
				<LoopTwoTone className="my-spin" /> {`${game.turns.length}/8`}
			</>
		)
	}

	const columns: GridColDef<Game>[] = [
		{
			field: "ended",
			renderCell: ({ row: g }) => (g.creator === user?.id ? <PersonOutlineTwoTone /> : <GroupsTwoTone />),
		},
		{
			field: "creator",
			flex: 1,
			headerName: "Gemaakt door",
			renderCell: ({ row: g }) => <PlayerName user={g.players.filter((p) => p.id === g.creator)[0]} />,
		},
		{ field: "status", renderCell: ({ row: g }) => <GameStatus game={g} /> },
		{
			field: "updated",
			flex: 1,
			headerName: "Bijgewerkt",
			renderCell: (r) => `${dayjs(new Date()).to(r.row.updated)}`,
		},
	]

	const actions = (): GridColDef<Game> => {
		return {
			field: "actions",
			type: "actions",
			headerName: "",
			cellClassName: "actions",
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key="delete"
						icon={<DeleteOutlineTwoTone />}
						disabled={user?.id !== row.creator}
						label="Delete"
						color="inherit"
						onClick={async () => {
							const confirmed = await dialogs.confirm(`Verwijder game ${row.id}?`, {
								okText: "Delete",
								cancelText: "Cancel",
								title: "Weet u het zeker?",
							})
							if (confirmed) {
								cardApi
									.deleteGame(row.id)
									.then(() => {
										enqueueSnackbar(`Deleted game ${row.id}`, { variant: "success" })
										refetch()
									})
									.catch((e) => {
										enqueueSnackbar(JSON.stringify(e), { variant: "error" })
										// biome-ignore lint/suspicious/noConsole: <explanation>
										console.error(e)
									})
							}
						}}
					/>,
				]
			},
		}
	}

	return (
		<Container style={{ display: "flex", flexDirection: "column" }}>
			<DataGrid
				loading={isLoading}
				columns={[...columns, actions()]}
				rows={data}
				hideFooter
				onRowClick={(r) => navigate(`${`/${r.row.turns.length === 32 ? "game" : "play"}/`}${r.row.id}`)}
				disableColumnFilter
				disableColumnMenu
				disableAutosize
				disableColumnResize
				disableColumnSelector
				disableColumnSorting
				disableDensitySelector
				disableMultipleRowSelection
				disableVirtualization
				density="compact"
				showCellVerticalBorder={false}
				showColumnVerticalBorder={false}
				showToolbar={false}
			/>
		</Container>
	)
}

export default Games
