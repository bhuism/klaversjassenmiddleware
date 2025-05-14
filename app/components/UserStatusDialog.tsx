import { useSession } from "@hono/auth-js/react"
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

const UserStatusDialog: React.FC<{
	visible: boolean
	onClose: () => void
}> = ({ visible, onClose }) => {
	const { data: session } = useSession()

	if (!session || !session.user) {
		return <Typography>no session</Typography>
	}

	return (
		<Dialog open={visible} onClose={onClose} title="Status" fullWidth maxWidth="sm">
			<DialogTitle>
				<Typography>Status</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<dl>
					<dt>Id</dt>
					<dd>{session.user.id}</dd>
					<dt>Volledige naam</dt>
					<dd>{session.user.name}</dd>
					<dt>Email</dt>
					<dd>{session.user.email}</dd>
					<dt>Avatar</dt>
					<dd>
						{session.user.name && session.user.image ? (
							<Avatar alt={session.user.name} src={session.user.image} />
						) : (
							<></>
						)}
					</dd>
					<dt>Experation</dt>
					<dd>{session.expires ? `${session.expires}·(${session.expires})` : ""}</dd>
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
