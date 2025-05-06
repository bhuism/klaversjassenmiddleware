import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import { useAuth } from "react-oidc-context"

const UserStatusDialog: React.FC<{
	visible: boolean
	onClose: () => void
}> = ({ visible, onClose }) => {
	const { user } = useAuth()

	return (
		<Dialog open={visible} onClose={onClose} title="Status" fullWidth maxWidth="sm">
			<DialogTitle>
				<Typography>Status</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<dl>
					<dt>Subject</dt>
					<dd>{user?.profile.sub}</dd>
					<dt>Volledige naam</dt>
					<dd>{user?.profile.name}</dd>
					<dt>Email</dt>
					<dd>{user?.profile.email}</dd>
					<dt>Scopes</dt>
					<dd>
						{user?.scopes.sort().map((s) => (
							<div key={s}>{s}</div>
						))}
					</dd>
					<dt>Experation</dt>
					<dd>
						{user?.profile.exp
							? `${dayjs.unix(user?.profile.exp).format("LLLL")}·(${dayjs().to(dayjs.unix(user?.profile.exp))})`
							: ""}
					</dd>
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
