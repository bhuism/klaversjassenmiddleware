import {
	DarkModeTwoTone,
	FavoriteBorderTwoTone,
	LightModeTwoTone,
	SettingsBrightnessTwoTone,
} from "@mui/icons-material"
import { AppBar, Box, Container, IconButton, Toolbar, Tooltip, Typography, useColorScheme } from "@mui/material"
import type React from "react"

import { Link as RouterLink } from "react-router"
import MainMenu from "./MainMenu"
import UserMenu from "./UserMenu"

export interface MyMenu {
	id: string
	title: string
	onClick: () => void
}

const MenuBar: React.FC = () => {
	const { mode, setMode } = useColorScheme()

	const handleModeClick = () => {
		switch (mode) {
			case "system":
				setMode("dark")
				break
			case "dark":
				setMode("light")
				break
			case "light":
				setMode("system")
				break
		}
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<IconButton
						component={RouterLink}
						to="/"
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						aria-label="Home"
					>
						<FavoriteBorderTwoTone />
					</IconButton>

					<MainMenu />

					<IconButton
						component={RouterLink}
						to="/"
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
						aria-label="Home"
					>
						<FavoriteBorderTwoTone />
					</IconButton>

					<Typography
						variant="h5"
						noWrap
						component={RouterLink}
						to={"/"}
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						KV
					</Typography>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Theme">
							<IconButton sx={{ mr: 1 }} onClick={handleModeClick} aria-label="Switch theme">
								{mode === "dark" ? (
									<DarkModeTwoTone />
								) : mode === "light" ? (
									<LightModeTwoTone />
								) : (
									<SettingsBrightnessTwoTone />
								)}
							</IconButton>
						</Tooltip>

						<UserMenu />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default MenuBar
