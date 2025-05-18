import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import constants from "~/utils/constants"

const AboutDialog: React.FC<{
	visible: boolean
	onClose: () => void
}> = ({ visible, onClose }) => {
	const {
		i18n: { language },
	} = useTranslation()

	return (
		<Dialog open={visible} onClose={onClose} title="Status" fullWidth maxWidth="sm">
			<DialogTitle>
				<Typography>Status</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<dl>
					<dt>Git timestamp</dt>
					<dd>
						{dayjs(constants.gitDate).locale(language).format("LLLL")} (
						{dayjs().locale(language).to(dayjs(constants.gitDate))})
					</dd>
					<dt>Git Hash</dt>
					<dd>
						<a href={`https://github.com/bhuism/phasertest/commit/${constants.gitHash}`}>
							{constants.gitHash ? constants.gitHash.substring(0, 8) : "no githash"}
						</a>
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
