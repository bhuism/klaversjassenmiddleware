import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { minimal2023Preset as preset } from "@vite-pwa/assets-generator/config"
import { reactRouterDevTools } from "react-router-devtools"
import { defineConfig } from "vite"
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa"
import tsconfigPaths from "vite-tsconfig-paths"

const pwaOptions: Partial<VitePWAOptions> = {
	base: "/",
	registerType: "autoUpdate",
	includeAssets: ["favicon.png"],
	strategies: "generateSW",
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
	pwaAssets: {
		preset,
		htmlPreset: "2023",
		integration: {
			outDir: "build/client",
		},
	},
	workbox: {
		globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
		cleanupOutdatedCaches: true,
		clientsClaim: true,
	},

	devOptions: {
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		enabled: process.env.SW_DEV === "true",
		/* when using generateSW the PWA plugin will switch to classic */
		type: "module",
		navigateFallback: "index.html",
	},
}

export default defineConfig({
	build: {
		// rollupOptions: {
		// 	external: ["workbox-window"],
		// },
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
