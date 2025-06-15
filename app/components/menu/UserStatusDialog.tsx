import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import useUser from "~/hooks/useUser"

const UserStatusDialog: React.FC<{
	visible: boolean
	onClose: () => void
}> = ({ visible, onClose }) => {
	const { user } = useUser()

	if (!user) {
		return <></>
	}

	return (
		<Dialog open={visible} onClose={onClose} title="Status" fullWidth maxWidth="sm">
			<DialogTitle>
				<Typography>Status</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<dl>
					<dt>Id</dt>
					<dd>{user.id}</dd>
					<dt>Volledige naam</dt>
					<dd>{user.displayName}</dd>
					<dt>Email</dt>
					<dd>{user.email}</dd>
					<dt>Avatar</dt>
					<dd>{user.photoURL ? <Avatar alt={user.displayName} src={user.photoURL} /> : <></>}</dd>
				</dl>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onClose} variant="outlined">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UserStatusDialog
