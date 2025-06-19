import { type RouteConfig, layout, route } from "@react-router/dev/routes"

export default [
	layout("layout/RootLayout.tsx", [
		layout("layout/MenuLayout.tsx", [
			route("*?", "routes/HomePage.tsx"),
			route("/games", "routes/GamesPage.tsx"),
			route("/start", "routes/StartGamePage.tsx"),
			route("/game/:gameId", "routes/GamePage.tsx"),
			route("/messageboard", "routes/MessageBoardPage.tsx"),
			route("/friends", "routes/FriendsPage.tsx"),
			route("/settings", "routes/SettingsPage.tsx"),
		]),
		route("/play/:gameId", "routes/PlayPage.tsx"),
	]),
] satisfies RouteConfig
