import {
	Avatar,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material"
import dayjs from "dayjs"
import { useAuth } from "react-oidc-context"

const UserStatusDialog: React.FC<{
	visible: boolean
	onClose: () => void
}> = ({ visible, onClose }) => {
	const { user, isAuthenticated, error, isLoading } = useAuth()

	if (isLoading) {
		return <CircularProgress />
	}

	if (!user || !isAuthenticated || error) {
		return <></>
	}

	return (
		<Dialog open={visible} onClose={onClose} title="Status" fullWidth maxWidth="sm">
			<DialogTitle>
				<Typography>Status</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<dl>
					<dt>Volledige naam</dt>
					<dd>{user.profile.name}</dd>
					<dt>Email</dt>
					<dd>{user.profile.email}</dd>
					<dt>Avatar</dt>
					<dd>
						{user.profile.name && user.profile.picture ? (
							<Avatar alt={user.profile.name} src={user.profile.picture} />
						) : (
							<></>
						)}
					</dd>
					<dt>Experation</dt>
					<dd>{user.profile.exp ? `${user.profile.exp}·(${dayjs(new Date()).to(user.profile.exp)})` : ""}</dd>
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
