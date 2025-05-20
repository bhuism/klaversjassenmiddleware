import { useRegisterSW } from "virtual:pwa-register/react"
import { CircularProgress, Typography } from "@mui/material"
import type { PropsWithChildren } from "react"
import type { LinksFunction } from "react-router"
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "react-router"
import Star from "./layout/Star"
import tailwindcss from "./tailwind.css?url"
import CenterComponents from "./utils/CenterComponents"

export const links: LinksFunction = () => [{ rel: "stylesheet", href: tailwindcss }]

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<html className="dark" lang={"en"} dir={"ltr"}>
			<head>
				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="manifest" href="/manifest.webmanifest" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Klavers Jassen</title>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function Root() {
	const intervalMS = 60 * 60 * 1000

	useRegisterSW({
		immediate: true,
		onRegistered(r) {
			r &&
				setInterval(() => {
					r.update()
				}, intervalMS)
		},
	})

	return <Outlet />
}

export const ErrorBoundary = () => {
	const error = useRouteError()

	const errorStatusCode = isRouteErrorResponse(error) ? error.status : "500"

	return (
		<div className="placeholder-index relative h-full min-h-screen w-screen flex items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-blue-950 dark:to-blue-900 justify-center dark:bg-white sm:pb-16 sm:pt-8">
			<div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
				<div className="relative  min-h-72 flex flex-col justify-center sm:overflow-hidden sm:rounded-2xl p-1 md:p-4 lg:p-6">
					<h1 className="text-center w-full text-red-600 text-2xl pb-2">{`${errorStatusCode}`}</h1>
					<p className="text-lg dark:text-white text-center w-full">{`${error}`}</p>
				</div>
			</div>
		</div>
	)
}

export const HydrateFallback = () => {
	return (
		<CenterComponents>
			<Star />
			<CircularProgress />
			<Typography>Klavers Jassen is loading...</Typography>
		</CenterComponents>
	)
}
