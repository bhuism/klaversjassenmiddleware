import { reactRouter } from "@react-router/dev/vite"
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare"
import tailwindcss from "@tailwindcss/vite"
import { minimal2023Preset as preset, defineConfig as pwaDefineConfig } from "@vite-pwa/assets-generator/config"
import { reactRouterDevTools } from "react-router-devtools"
import { reactRouterHonoServer } from "react-router-hono-server/dev"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet"
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa"
import tsconfigPaths from "vite-tsconfig-paths"

const pwaAssets = pwaDefineConfig({
	preset,
	images: ["public/*"],
})

const pwaOptions: Partial<VitePWAOptions> = {
	base: "/",
	outDir: "build/client/",
	registerType: "autoUpdate",
	includeAssets: ["favicon.svg"],
	injectRegister: "inline",
	manifest: {
		name: "Klavers Jassen",
		short_name: "Klavers Jassen",
		description: "Klavers Jassen",
		theme_color: "#000000",
		background_color: "#000000",
		start_url: ".",
	},
	pwaAssets: pwaAssets,
	workbox: {
		globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
		cleanupOutdatedCaches: true,
		clientsClaim: true,
	},
	devOptions: {
		enabled: false,
		navigateFallback: "index.html",
		suppressWarnings: false,
		type: "module",
	},
}

export default defineConfig({
	build: {
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		sourcemap: process.env.SOURCE_MAP === "true",
	},
	plugins: [
		VitePWA(pwaOptions),
		cloudflareDevProxy(),
		//cloudflare(),
		//		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		// Run the react-compiler on .tsx files only when bundling
		{
			...babel({
				filter: /\.tsx?$/,
				babelConfig: {
					presets: ["@babel/preset-typescript"],
					plugins: ["babel-plugin-react-compiler"],
				},
			}),
			apply: "build",
		},
		reactRouterDevTools(),
		reactRouter(),
		reactRouterHonoServer({
			serverEntryPoint: "./app/server/index.ts",
			runtime: "cloudflare",
			// flag: { force_react_19: true },
			dev: {
				exclude: [/^\/(resources)\/.+/],
			},
		}),
		tsconfigPaths(),
		iconsSpritesheet({
			inputDir: "./resources/icons",
			outputDir: "./app/library/icon/icons",
			fileName: "icon.svg",
			withTypes: true,
			formatter: "biome",
		}),
	],
	server: {
		open: true,
		// biome-ignore lint/nursery/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
})
