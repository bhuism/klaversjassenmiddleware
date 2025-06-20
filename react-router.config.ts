import type { Config } from "@react-router/dev/config"

declare module "react-router" {
	interface Future {
		// unstable_middleware: true
		unstable_viteEnvironmentApi: true
		unstable_splitRouteModules: true
		unstable_optimizeDeps: true
	}
}

export default {
	ssr: false,
	future: {
		// unstable_middleware: true,
		unstable_viteEnvironmentApi: true,
		unstable_splitRouteModules: true,
		unstable_optimizeDeps: true,
	},
	prerender: [],
} satisfies Config
