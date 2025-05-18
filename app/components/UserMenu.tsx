import { useSession } from "@hono/auth-js/react"
import { signOut } from "@hono/auth-js/react"
import { AccountCircle } from "@mui/icons-material"
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import AboutDialog from "./AboutDialog"
import type { MyMenu } from "./MenuBar"
import UserStatusDialog from "./UserStatusDialog"

const UserMenu: React.FC = () => {
	const { data: session } = useSession()
	const [userStatusDialogVisible, setUserStatusDialogVisible] = useState<boolean>(false)
	const [aboutDialogVisible, setAboutDialogVisible] = useState<boolean>(false)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const navigate = useNavigate()
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const userMenu: MyMenu[] = [
		{
			id: "settings",
			title: "Settings",
			onClick: () => navigate("/settings"),
		},
		{
			id: "userstatus",
			title: "Status",
			onClick: () => setUserStatusDialogVisible(true),
		},
		// {
		// 	id: "session",
		// 	title: "Session",
		// 	onClick: () => window.location.replace("/authUser"),
		// },
		{
			id: "about",
			title: "About",
			onClick: () => setAboutDialogVisible(true),
		},
		{
			id: "logout",
			title: "Logout",
			onClick: () => {
				signOut()
			},
		},
	]

	return session?.user ? (
		<>
			<Tooltip title={session.user.name}>
				<IconButton onClick={handleOpenUserMenu} sx={{ mr: 1 }}>
					{session?.user?.name && session?.user?.image ? (
						<Avatar alt={session.user.name} src={session.user.image} />
					) : (
						<AccountCircle />
					)}
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "bottom",
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
			<UserStatusDialog visible={userStatusDialogVisible} onClose={() => setUserStatusDialogVisible(false)} />
			<AboutDialog visible={aboutDialogVisible} onClose={() => setAboutDialogVisible(false)} />
		</>
	) : (
		<></>
	)
}

export default UserMenu
