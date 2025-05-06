import AccountCircle from "@mui/icons-material/AccountCircle"
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone"
import FavoriteTwoToneBorderIcon from "@mui/icons-material/FavoriteBorderTwoTone"
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone"
import MenuIcon from "@mui/icons-material/Menu"
import SettingsBrightnessTwoToneIcon from "@mui/icons-material/SettingsBrightnessTwoTone"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useAuth } from "react-oidc-context"

import { useColorScheme } from "@mui/material/styles"
import { Link as RouterLink, useNavigate } from "react-router"
import AboutDialog from "./AboutDialog"
import UserStatusDialog from "./UserStatusDialog"

const MenuBar: React.FC = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	const { user } = auth

	const { mode, setMode } = useColorScheme()

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	const [aboutDialogVisible, setAboutDialogVisible] = useState<boolean>(false)
	const [userStatusDialogVisible, setUserStatusDialogVisible] = useState<boolean>(false)
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
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

	interface Menu {
		id: string
		title: string
		onClick: () => void
	}

	const menu: Menu[] = [
		{ id: "games", title: "Games", onClick: () => navigate("/games") },
		{
			id: "messageboard",
			title: "Message Board",
			onClick: () => navigate("/messageboard"),
		},
	]

	const userMenu: Menu[] = [
		{
			id: "settings",
			title: "Settings",
			onClick: () => navigate("/settings"),
		},
		{
			id: "userstatus",
			title: "User Status",
			onClick: () => setUserStatusDialogVisible(true),
		},
		{
			id: "about",
			title: "About",
			onClick: () => setAboutDialogVisible(true),
		},
		{
			id: "logout",
			title: "Logout",
			onClick: () => {
				auth.removeUser()
				auth.clearStaleState()
				window.location.href = "/"
			},
		},
	]

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<IconButton component={RouterLink} to="/" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
							<FavoriteTwoToneBorderIcon />
						</IconButton>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
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
							<FavoriteTwoToneBorderIcon />
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
										<DarkModeTwoToneIcon />
									) : mode === "light" ? (
										<LightModeTwoToneIcon />
									) : (
										<SettingsBrightnessTwoToneIcon />
									)}
								</IconButton>
							</Tooltip>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ mr: 1 }}>
									{user?.profile.picture ? (
										<Avatar alt={user?.profile.name} src={user?.profile.picture} />
									) : (
										<AccountCircle />
									)}
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{userMenu.map((item) => (
									<MenuItem
										key={item.id}
										onClick={() => {
											handleCloseUserMenu()
											item.onClick()
										}}
									>
										<Typography sx={{ textAlign: "center" }}>{item.title}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<UserStatusDialog visible={userStatusDialogVisible} onClose={() => setUserStatusDialogVisible(false)} />
			<AboutDialog visible={aboutDialogVisible} onClose={() => setAboutDialogVisible(false)} />
		</>
	)
}

export default MenuBar
