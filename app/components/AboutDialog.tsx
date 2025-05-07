import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import dayjs from "dayjs"
import constants from "~/utils/constants"

const AboutDialog: React.FC<{
	visible: boolean
	onClose: () => void
}> = ({ visible, onClose }) => {
	return (
		<Dialog open={visible} onClose={onClose} title="Status" fullWidth maxWidth="sm">
			<DialogTitle>
				<Typography>Status</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<dl>
					<dt>Mode</dt>
					<dd>{`${import.meta.env.MODE}`}</dd>
					<dt>Git timestamp</dt>
					<dd>
						{dayjs(constants.gitDate).format("LLLL")} ({dayjs().to(dayjs(constants.gitDate))})
					</dd>
					<dt>Git Hash</dt>
					<dd>
						<a href={`https://github.com/bhuism/phasertest/commit/${constants.gitHash}`}>
							{constants.gitHash ? constants.gitHash.substring(0, 8) : "no githash"}
						</a>
					</dd>
					<dt>Build timestamp</dt>
					<dd>
						{`${dayjs(Date.parse("__DATE__")).format("LLLL")}`}·(
						{dayjs().to(dayjs(Date.parse("__DATE__")))})
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

export default AboutDialog
