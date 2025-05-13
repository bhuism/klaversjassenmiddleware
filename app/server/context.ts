import type { Context } from "hono"
import { createGetLoadContext } from "react-router-hono-server/cloudflare"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, getServerEnv } from "~/env.server"
// import { getClientEnv, getServerEnv } from "~/env.server"

// const createGetLoadContext = async (c: Context) => {
// 	// biome-ignore lint/suspicious/noConsole: <explanation>
// 	// biome-ignore lint/style/useTemplate: <explanation>
// 	console.log("c: " + JSON.stringify(c))
// 	// get the locale from the context
// 	const locale = i18next.getLocale(c)
// 	// get t function for the default namespace
// 	const t = await i18next.getFixedT(c)
// 	// get the server environment
// 	const env = getServerEnv(c)

// 	return {
// 		lang: locale,
// 		t,
// 		isProductionDeployment: env.APP_ENV === "production",
// 		env,
// 		clientEnv: getClientEnv(),
// 		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
// 		body: c.body,
// 	}
// }

export const getLoadContext = createGetLoadContext(async (c, { mode, build }) => {
	const locale = i18next.getLocale(c as Context)
	const t = await i18next.getFixedT(c as Context)
	const env = getServerEnv(c.env)

	const isProductionDeployment = mode === "production"

	return {
		lang: locale,
		t,
		isProductionDeployment,
		env,
		clientEnv: getClientEnv(),
		body: c.body,
		appVersion: isProductionDeployment ? build.assets.version : "dev",
	}
})

//import type { Context } from "hono"

// export const getLoadContext = async (c: Context) => {
// 	// get the locale from the context
// 	const locale = i18next.getLocale(c)
// 	// get t function for the default namespace
// 	const t = await i18next.getFixedT(c)
// 	// get the server environment
// 	const env = getServerEnv(c.env)

// 	return {
// 		lang: locale,
// 		t,
// 		isProductionDeployment: env.APP_ENV === "production",
// 		env,
// 		clientEnv: getClientEnv(),
// 		//		appVersion: env.APP_ENV === "production" ? build.assets.version : "dev",
// 		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
// 		body: c.body,
// 	}
// }

// interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}

// /**
//  * Declare our loaders and actions context type
//  */
// declare module "react-router" {
// 	interface AppLoadContext extends Omit<LoadContext, "body"> {}
// }
//interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}

// /**
//  * Declare our loaders and actions context type
//  */
// declare module "react-router" {
// 	interface AppLoadContext extends Omit<LoadContext, "body"> {}
// }

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
	interface AppLoadContext {
		readonly lang: string
		readonly appVersion: string
	}
}

//interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}
