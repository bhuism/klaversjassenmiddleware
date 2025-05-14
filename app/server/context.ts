import type { User } from "@auth/core"
import type { Context } from "hono"
import { createGetLoadContext } from "react-router-hono-server/cloudflare"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, getServerEnv } from "~/env.server"

export const getLoadContext = createGetLoadContext(async (c, { mode, build }) => {
	const con = c as Context

	const user: User = con.get("user")

	const locale = i18next.getLocale(c as Context)
	const t = await i18next.getFixedT(c as Context)
	const env = getServerEnv(c.env)

	const isProductionDeployment = mode === "production"

	return {
		user,
		lang: locale,
		t,
		isProductionDeployment,
		env,
		clientEnv: getClientEnv(),
		body: c.body,
		appVersion: isProductionDeployment ? build.assets.version : "dev",
	}
})
