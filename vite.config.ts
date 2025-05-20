import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { reactRouterDevTools } from "react-router-devtools"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

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
	plugins: [tailwindcss(), reactRouterDevTools(), reactRouter(), tsconfigPaths()],
	server: {
		open: true,
		// biome-ignore lint/nursery/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
})
