import Google from "@auth/core/providers/google"
import type { User } from "@auth/core/types"
import { authHandler, getAuthUser, initAuthConfig } from "@hono/auth-js"
import type { MiddlewareHandler } from "hono"
import { poweredBy } from "hono/powered-by"
import { createHonoServer } from "react-router-hono-server/cloudflare"
import { i18next } from "remix-hono/i18next"
import i18nextOpts from "~/localization/i18n.server"
import { getLoadContext } from "./context"

// declare module "@auth/core/types" {
// 	interface User {
// 		id: string
// 	}
// }

// declare module "@auth/core/jwt" {
// 	interface JWT {
// 		providerAccountId: string
// 		provider: string
// 	}
// }

declare module "react-router" {
	interface AppLoadContext {
		readonly lang: string
		readonly user: User
		readonly apiSecret: string
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
						async signIn() {
							return true
						},
						// jwt({ token, account, profile, user, session }) {
						// 	// console.log("jwt called: token:" + JSON.stringify(token))
						// 	// console.log("jwt called: account: " + JSON.stringify(account))
						// 	// console.log("jwt called: profile:" + JSON.stringify(profile))
						// 	// console.log("jwt called: user:" + JSON.stringify(user))
						// 	// console.log("jwt called: session:" + JSON.stringify(session))

						// 	if (account) {
						// 		token.providerAccountId = account.providerAccountId
						// 		token.provider = account.provider
						// 	}
						// 	return token
						// },
						async session({ session }) {
							// console.log("**************** session session: " + JSON.stringify(session))
							// console.log("session token: " + JSON.stringify(token))
							// console.log("session newSession: " + JSON.stringify(newSession))
							// console.log("session user: " + JSON.stringify(user))

							// const loginApi = new LoginApi(
							// 	new Configuration({
							// 		basePath: constants.apiUrl,
							// 	})
							// )

							// const response = await loginApi
							// 	.login({
							// 		email: token.email as string,
							// 		providerId: token.providerAccountId as string,
							// 		displayName: token.name as string,
							// 		name: token.name as string,
							// 		photoURL: token.picture as string,
							// 	})
							// 	.then((result) => {
							// 		console.log("result: " + JSON.stringify(result))

							// 		return result
							// 	})

							// console.log("user: " + JSON.stringify(session?.user))

							// if (token?.email) {
							// 	session.user.id = token?.email
							// }

							c.set("user", session.user)
							return session
						},
					},
					secret: c.env.AUTH_SECRET,
					providers: [
						Google({
							clientId: c.env.GOOGLE_ID,
							clientSecret: c.env.GOOGLE_SECRET,
						}),
					],
					session: {
						maxAge: 365 * 24 * 60 * 60 * 5, // 5 years, should be fine
					},
				}
			})
		)

		app.use("/api/auth/*", authHandler())

		app.use("*", myVerifyAuth())

		// app.get("/authUser", (c) => {
		// 	const auth = c.get("authUser")
		// 	return c.json(auth)
		// })
	},
	defaultLogger: false,
	getLoadContext,
})
