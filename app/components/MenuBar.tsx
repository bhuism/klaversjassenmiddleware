import {
	DarkModeTwoTone,
	FavoriteBorderTwoTone,
	LightModeTwoTone,
	Menu as MenuIcon,
	SettingsBrightnessTwoTone,
} from "@mui/icons-material"
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
	useColorScheme,
} from "@mui/material"
import type React from "react"
import { useState } from "react"

import { Link as RouterLink, useNavigate } from "react-router"
import UserMenu from "./UserMenu"

export interface MyMenu {
	id: string
	title: string
	onClick: () => void
}

const MenuBar: React.FC = () => {
	const navigate = useNavigate()

	const { mode, setMode } = useColorScheme()

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

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

	const menu: MyMenu[] = [
		{ id: "games", title: "Games", onClick: () => navigate("/games") },
		{
			id: "messageboard",
			title: "Message Board",
			onClick: () => navigate("/messageboard"),
		},
	]

	// if (!session?.user) {
	// 	return <Typography>no user</Typography>
	// }

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<IconButton component={RouterLink} to="/" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
							<FavoriteBorderTwoTone />
						</IconButton>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar-main"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar-main"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{ display: { xs: "block", md: "none" } }}
							>
								{menu.map((item) => (
									<MenuItem
										key={item.id}
										onClick={() => {
											handleCloseNavMenu()
											item.onClick()
										}}
									>
										<Typography sx={{ textAlign: "center" }}>{item.title}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>

						<IconButton component={RouterLink} to="/" sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
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

						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{menu.map((page) => (
								<Button
									key={page.id}
									sx={{ my: 2, color: "white", display: "block" }}
									onClick={handleCloseNavMenu}
									component={RouterLink}
									to={page.id}
								>
									{page.title}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Theme">
								<IconButton sx={{ mr: 1 }} onClick={handleModeClick}>
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
		</>
	)
}

export default MenuBar
