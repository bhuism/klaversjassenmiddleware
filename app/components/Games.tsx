import { DeleteOutlineTwoTone } from "@mui/icons-material"
import { Box, Container } from "@mui/material"
import { DataGrid, GridActionsCellItem, type GridColDef } from "@mui/x-data-grid"
import { useDialogs } from "@toolpad/core/useDialogs"
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import { useContext } from "react"
import { useNavigate } from "react-router"
import { default as useGameApi } from "~/hooks/useGameApi"
import useLoadOnce from "~/hooks/useLoadOnce"
import UidContext from "~/provider/UidContextProvider"
import PlayerName from "./game/PlayerName"
import type { Game } from ".generated-sources/openapi"

const Games: React.FC = () => {
	const navigate = useNavigate()
	const cardApi = useGameApi()
	const { user } = useContext(UidContext)
	const { enqueueSnackbar } = useSnackbar()
	const dialogs = useDialogs()

	const { data, isLoading, error, reload } = useLoadOnce(() => cardApi.getGames(), [])

	if (error) {
		return <span style={{ color: "red" }}>{error.message}</span>
	}

	const columns: GridColDef[] = [
		{ field: "id" },
		{ field: "creator", renderCell: (r) => <PlayerName playerUid={r.row.creator} /> },
		{ field: "created", width: 200, renderCell: (r) => `${dayjs(new Date()).to(r.row.created)}` },
		{
			field: "updated",
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
							const confirmed = await dialogs.confirm(`Delete game ${row.id}?`, {
								okText: "Delete",
								cancelText: "Cancel",
							})
							if (confirmed) {
								cardApi
									.deleteGame(row.id)
									.then(() => {
										enqueueSnackbar(`Deleted game ${row.id}`, { variant: "success" })
										reload()
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
		<>
			<Container>
				<Box alignItems="center">
					<DataGrid
						columns={[...columns, actions()]}
						rows={data}
						hideFooter
						loading={isLoading}
						onRowClick={(r) => navigate(`/game/${r.row.id}`)}
						disableColumnFilter
						disableColumnMenu
						disableColumnResize
						disableColumnSelector
						disableColumnSorting
						disableDensitySelector
						disableMultipleRowSelection
						disableVirtualization
					/>
				</Box>
			</Container>
		</>
	)
}

export default Games
