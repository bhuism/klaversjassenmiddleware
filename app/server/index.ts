import { type User, skipCSRFCheck } from "@auth/core"
import Google from "@auth/core/providers/google"
import { authHandler, getAuthUser, initAuthConfig } from "@hono/auth-js"
import type { MiddlewareHandler } from "hono"
import { poweredBy } from "hono/powered-by"
import { createHonoServer } from "react-router-hono-server/cloudflare"
import { i18next } from "remix-hono/i18next"
import i18nextOpts from "~/localization/i18n.server"
import { getLoadContext } from "./context"

// Extend the default Session type to include custom properties
declare module "@auth/core" {
	interface User {
		id: string // Add a custom `id` property to the session user object
	}
}

declare module "react-router" {
	interface AppLoadContext {
		readonly lang: string
		readonly user: User
	}
}

export function myVerifyAuth(): MiddlewareHandler {
	return async (c, next) => {
		const authUser = await getAuthUser(c)
		const isAuth = !!authUser?.token || !!authUser?.user
		if (isAuth) {
			c.set("authUser", authUser)
		}

		await next()
	}
}

export default await createHonoServer({
	configure(app) {
		app.use(poweredBy({ serverName: "Klavers Jassen" }))
		//		app.use(logger())
		app.use("*", i18next(i18nextOpts))
		app.use(
			"*",
			initAuthConfig((c) => {
				return {
					callbacks: {
						signIn() {
							return true
						},
						jwt({ token, account }) {
							if (account) {
								token.providerAccountId = account.providerAccountId
							}
							return token
						},
						session({ session, token }) {
							if (typeof token.providerAccountId === "string") {
								session.user.id = token.providerAccountId
							}
							c.set("user", session.user)
							return session
						},
					},
					secret: c.env.AUTH_SECRET,
					skipCSRFCheck,
					providers: [
						Google({
							clientId: c.env.GOOGLE_ID,
							clientSecret: c.env.GOOGLE_SECRET,
						}),
					],
				}
			})
		)

		app.use("/api/auth/*", authHandler())

		app.use("*", myVerifyAuth())

		app.get("/authUser", (c) => {
			const auth = c.get("authUser")
			return c.json(auth)
		})
	},
	defaultLogger: false,
	getLoadContext,
})
