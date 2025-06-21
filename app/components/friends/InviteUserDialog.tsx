import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { useState } from "react"

const InviteUserDialog: React.FC = () => {
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<React.Fragment>
				<Dialog
					open={open}
					onClose={handleClose}
					slotProps={{
						paper: {
							component: "form",
							onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
								event.preventDefault()
								const formData = new FormData(event.currentTarget)
								const formJson = Object.fromEntries(formData.entries())
								// biome-ignore lint/suspicious/noConsole: <explanation>
								console.log({ formJson: formJson })
								handleClose()
							},
						},
					}}
				>
					<DialogTitle>Maak een nieuwe vriend</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Vul hier het email adres in van het account dat je wilt toevoegen als vriend
						</DialogContentText>
						<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							name="email"
							label="Email Address"
							type="email"
							fullWidth
							variant="standard"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Subscribe</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
			<Button variant="outlined" onClick={handleClickOpen}>
				Vriend uitnodigen
			</Button>
		</>
	)
}

export default InviteUserDialog
