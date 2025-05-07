import type { Context } from "hono"
import { unstable_createContext } from "react-router"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, getServerEnv } from "~/env.server"

const globalAppContext = unstable_createContext<GlobalAppContext>()

const generateContext = async (c: Context) => {
	// get the locale from the context
	const locale = i18next.getLocale(c)
	// get t function for the default namespace
	const t = await i18next.getFixedT(c)
	const env = getServerEnv(c.env)
	return {
		lang: locale,
		t,
		env,
		clientEnv: getClientEnv(),
		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
		body: c.body,
	}
}

export const getLoadContext = async (c: Context) => {
	const ctx = await generateContext(c)
	return new Map([[globalAppContext, ctx]])
}

interface GlobalAppContext extends Awaited<ReturnType<typeof generateContext>> {}

export { globalAppContext }
