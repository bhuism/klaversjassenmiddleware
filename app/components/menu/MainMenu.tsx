import { Menu as MenuIcon } from "@mui/icons-material"
import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"
import type { MyMenu } from "./MenuBar"

const MainMenu = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const navigate = useNavigate()

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const menu: MyMenu[] = [
		{ id: "newgame", title: "New Game", onClick: () => navigate("/game") },
		{ id: "games", title: "Games", onClick: () => navigate("/games") },
		// {
		// 	id: "messageboard",
		// 	title: "Message Board",
		// 	onClick: () => navigate("/messageboard"),
		// },
	]

	return (
		<>
			<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
				<>
					<IconButton
						size="large"
						aria-label={"Menu"}
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
				</>
			</Box>

			<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
				{menu.map((item) => (
					<Button
						key={item.id}
						sx={{ my: 2, color: "white", display: "block" }}
						onClick={() => {
							handleCloseNavMenu()
							item.onClick()
						}}
					>
						{item.title}
					</Button>
				))}
			</Box>
		</>
	)
}

export default MainMenu
