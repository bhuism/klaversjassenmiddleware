import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { minimal2023Preset as preset, defineConfig as pwaDefineConfig } from "@vite-pwa/assets-generator/config"
import { reactRouterDevTools } from "react-router-devtools"
import { defineConfig } from "vite"
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa"
import tsconfigPaths from "vite-tsconfig-paths"

const pwaAssets = pwaDefineConfig({
	preset,
	images: ["public/*"],
})

const pwaOptions: Partial<VitePWAOptions> = {
	base: "/",
	registerType: "autoUpdate",
	includeAssets: ["favicon.png"],
	injectRegister: "inline",
	outDir: "build/client",
	manifest: {
		name: "Klavers Jassen",
		short_name: "Klavers Jassen",
		description: "Klavers Jassen",
		theme_color: "#000000",
		background_color: "#000000",
		start_url: ".",
	},
	pwaAssets,
	workbox: {
		globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
		cleanupOutdatedCaches: true,
		clientsClaim: true,
	},

	devOptions: {
		enabled: false,
		navigateFallback: "index.html",
		suppressWarnings: true,
		type: "module",
	},
}

export default defineConfig({
	build: {
		ssr: false,
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		sourcemap: process.env.SOURCE_MAP === "true",
		//		rollupOptions: {
		//			external: ["service-worker/**", "workbox-core", "workbox-precaching", "workbox-routing"],
		//		},
	},
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
	},
	plugins: [tailwindcss(), reactRouterDevTools(), reactRouter(), tsconfigPaths(), VitePWA(pwaOptions)],
	server: {
		open: true,
		// biome-ignore lint/nursery/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
})
