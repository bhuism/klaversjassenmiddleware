import type { Config } from "@react-router/dev/config"

declare module "react-router" {
	interface Future {
		unstable_middleware: true // 👈 Enable middleware types
	}
}
export default {
	ssr: true,
	future: {
		unstable_viteEnvironmentApi: true,
		unstable_splitRouteModules: true,
		unstable_optimizeDeps: true,
		unstable_middleware: true,
	},
} satisfies Config
