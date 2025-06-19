import { Avatar, Container, Typography } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import type React from "react"
import useIncomingInvitesAndFriends from "~/hooks/useFriends"
import type { User } from ".generated-sources/openapi"

const FriendsPage: React.FC = () => {
	const { allInvites, friends, inComingInvites } = useIncomingInvitesAndFriends()

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

	const MyDataGrid: React.FC<{ rows: User[] | undefined; columns: GridColDef<User>[] }> = ({ rows, columns }) => {
		return (
			<DataGrid
				rows={rows}
				columns={columns}
				hideFooter
				disableColumnFilter
				disableColumnMenu
				disableColumnResize
				disableColumnSelector
				disableColumnSorting
				disableDensitySelector
				disableEval
				disableVirtualization
				disableMultipleRowSelection
			/>
		)
	}

	return (
		<>
			<Container style={{ display: "flex", flexDirection: "column" }} maxWidth={"xs"}>
				<Typography>allInvited</Typography>
				<MyDataGrid rows={allInvites} columns={columns} />
			</Container>
			<Container style={{ display: "flex", flexDirection: "column" }} maxWidth={"xs"}>
				<Typography>friends</Typography>
				<MyDataGrid rows={friends} columns={columns} />
			</Container>
			<Container style={{ display: "flex", flexDirection: "column" }} maxWidth={"xs"}>
				<Typography>inComingInvites</Typography>
				<MyDataGrid rows={inComingInvites} columns={columns} />
			</Container>
		</>
	)
}

export default FriendsPage
