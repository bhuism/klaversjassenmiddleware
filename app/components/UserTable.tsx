import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import type { User } from ".generated-sources/openapi"

interface Props {
	users: Array<User>
	caption?: string
	buttons?: Array<{ callback(u: User): void; button: React.ReactNode }>
}

const UserTable: React.FC<React.PropsWithChildren<Props>> = ({ users, caption, buttons }) => {
	return (
		<>
			{users.length === 0 ? (
				<></>
			) : (
				<TableContainer>
					<Table>
						{caption ? (
							<TableHead>
								<TableRow>
									<TableCell colSpan={2}>{caption}</TableCell>
								</TableRow>
							</TableHead>
						) : (
							<></>
						)}
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell size="small">{user.name}</TableCell>
									{buttons ? (
										buttons.map(({ callback, button }, index) => (
											<TableCell
												size="small"
												key={`but${
													// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													index
												}`}
											>
												<Button onClick={() => callback(user)}>{button}</Button>
											</TableCell>
										))
									) : (
										<></>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}

export default UserTable
