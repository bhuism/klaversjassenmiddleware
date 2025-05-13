import Google from "@auth/core/providers/google"
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js"
import { createHonoServer } from "react-router-hono-server/cloudflare"
import { i18next } from "remix-hono/i18next"
import i18nextOpts from "~/localization/i18n.server"
import { getLoadContext } from "./context"

export default await createHonoServer({
	configure(app) {
		app.use("*", i18next(i18nextOpts))
		app.use(
			"*",
			initAuthConfig((c) => ({
				secret: c.env.AUTH_SECRET,
				providers: [
					Google({
						clientId: c.env.GOOGLE_ID,
						clientSecret: c.env.GOOGLE_SECRET,
					}),
				],
			}))
		)

		app.use("/api/auth/*", authHandler())

		app.use("/api/*", verifyAuth())

		app.get("/api/protected", (c) => {
			const auth = c.get("authUser")
			return c.json(auth)
		})
	},
	defaultLogger: false,
	getLoadContext,
})
