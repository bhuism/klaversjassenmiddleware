import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
	
	layout("layout/RootLayout.tsx", [
		layout("layout/PrivateLayout.tsx", [
			index("routes/HomePage.tsx"),
			route("*?", "routes/HonePage.tsx"),
			route("/games", "routes/GamesPage.tsx"),
			route("/game/:gameId", "routes/GamePage.tsx"),
			route("/messageboard", "routes/MessageBoardPage.tsx"),
			route("/settings", "routes/SettingsPage.tsx"),
		]),
	]),
] satisfies RouteConfig
