import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import type { User } from ".generated-sources/openapi"

const MyDataGrid: React.FC<{ rows: User[] | undefined; columns: GridColDef<User>[] }> = ({ rows, columns }) => {
	return (
		<DataGrid
			rows={rows}
			getRowId={(row) => row.id}
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

export default MyDataGrid
