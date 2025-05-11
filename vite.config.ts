import { reactRouter } from "@react-router/dev/vite"
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare"
import tailwindcss from "@tailwindcss/vite"
import { reactRouterDevTools } from "react-router-devtools"
import { reactRouterHonoServer } from "react-router-hono-server/dev"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	build: {
		ssr: true,
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		sourcemap: process.env.SOURCE_MAP === "true",
		//		rollupOptions: {
		//			external: ["service-worker/**", "workbox-core", "workbox-precaching", "workbox-routing"],
		//		},
	},
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
	},
	plugins: [
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
