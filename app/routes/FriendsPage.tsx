import { AddCircleOutlineTwoTone, DeleteOutlineTwoTone } from "@mui/icons-material"
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material"
import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid"
import { useDialogs } from "@toolpad/core/useDialogs"
import { useSnackbar } from "notistack"
import type React from "react"
import { useContext } from "react"
import InviteUser from "~/components/friends/InviteUserDialog"
import MyDataGrid from "~/components/friends/MyDataGrid"
import useCardApi from "~/hooks/useGameApi"
import useIncomingInvitesAndFriends from "~/hooks/useIncomingInvitesAndFriends"
import useOutGoingInvites from "~/hooks/useOutgoingInvites"
import UserContext from "~/provider/UserContext"
import type { User } from ".generated-sources/openapi"

const FriendsPage: React.FC = () => {
	const { friends, inComingInvites, refetch: refetchIncomingInvitesAndFriends } = useIncomingInvitesAndFriends()
	const { outGoingInvites, refetch: refetchOutGoingInvites } = useOutGoingInvites()
	const dialogs = useDialogs()
	const cardApi = useCardApi()
	const { enqueueSnackbar } = useSnackbar()
	const { setUser } = useContext(UserContext)

	const columns: GridColDef<User>[] = [
		{ field: "displayName", flex: 1, headerName: "" },
		{ field: "email", flex: 1, headerName: "" },
		{
			field: "avatar",
			flex: 1,
			headerName: "",
			renderCell: ({ row: { displayName, photoURL } }) => <Avatar alt={displayName} src={photoURL} />,
		},
	]

	const removeFriendActions = (): GridColDef<User> => {
		return {
			field: "actions",
			type: "actions",
			headerName: "",
			cellClassName: "actions",
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key="removeFriend"
						icon={<DeleteOutlineTwoTone />}
						//disabled={user?.id !== row.creator}
						label="Delete"
						color="inherit"
						onClick={async () => {
							const confirmed = await dialogs.confirm(`Verwijder ${row.displayName} als vriend?`, {
								okText: "Verwijder",
								cancelText: "Cancel",
								title: "Weet u het zeker?",
							})
							if (confirmed) {
								cardApi
									.removeInvite(row.id)
									.then((newUser) => {
										enqueueSnackbar(`Friend ${row.displayName} verwijderd`, { variant: "success" })
										setUser(newUser)
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

	const addFriendActions = (): GridColDef<User> => {
		return {
			field: "actions",
			type: "actions",
			headerName: "",
			cellClassName: "actions",
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key="removeFriend"
						icon={<AddCircleOutlineTwoTone />}
						//disabled={user?.id !== row.creator}
						label="Delete"
						color="inherit"
						onClick={async () => {
							cardApi
								.addInvite(row.id)
								.then((newUser) => {
									enqueueSnackbar(`Friend ${row.displayName} toegevoegd`, { variant: "success" })
									setUser(newUser)
								})
								.catch((e) => {
									enqueueSnackbar(JSON.stringify(e), { variant: "error" })
									// biome-ignore lint/suspicious/noConsole: <explanation>
									console.error(e)
								})
						}}
					/>,
				]
			},
		}
	}

	return (
		<>
			<Box display="flex" justifyContent="center">
				<Stack direction="row" spacing={2} margin={2}>
					<Button
						variant="outlined"
						onClick={() => {
							refetchIncomingInvitesAndFriends()
							refetchOutGoingInvites()
						}}
					>
						Reload
					</Button>

					<InviteUser />
				</Stack>
			</Box>
			<Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 6, md: 12 }}>
				<Grid size={{ xs: 2, sm: 3, md: 4 }}>
					<Typography>friends</Typography>
					<MyDataGrid rows={friends} columns={[...columns, removeFriendActions()]} />
				</Grid>
				<Grid size={{ xs: 2, sm: 3, md: 4 }}>
					<Typography>inComingInvites</Typography>
					<MyDataGrid rows={inComingInvites} columns={[...columns, addFriendActions()]} />
				</Grid>
				<Grid size={{ xs: 2, sm: 3, md: 4 }}>
					<Typography>outGoingInvites</Typography>
					<MyDataGrid rows={outGoingInvites} columns={[...columns, removeFriendActions()]} />
				</Grid>
			</Grid>
		</>
	)
}

export default FriendsPage
