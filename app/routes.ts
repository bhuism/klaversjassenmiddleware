import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
	route("/robots.txt", "routes/robots.tsx"),
	route("/sitemap-index.xml", "routes/sitemap-index.tsx"),
	route("/sitemap.:lang[.]xml", "routes/sitemap-lang.tsx"),
	route("/resource/locales", "routes/resource.locales.ts"),
	route("/testlocale", "routes/testlocale.tsx"),
	route("*?", "catchall.tsx"),
	layout("layout/RootLayout.tsx", [
		layout("layout/PrivateLayout.tsx", [
			index("routes/HomePage.tsx"),
			route("/games", "routes/GamesPage.tsx"),
			route("/game/:gameId", "routes/GamePage.client.tsx"),
			route("/messageboard", "routes/MessageBoardPage.tsx"),
			route("/settings", "routes/SettingsPage.tsx"),
		]),
	]),
] satisfies RouteConfig
