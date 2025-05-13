//import { globalAppContext } from "./server/context"
import { createInstance } from "i18next"
import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"
import { I18nextProvider, initReactI18next } from "react-i18next"
import { type AppLoadContext, type EntryContext, ServerRouter } from "react-router"
import i18n from "./localization/i18n"
import i18nextOpts from "./localization/i18n.server"
import { resources } from "./localization/resource"

// Reject all pending promises from handler functions after 10 seconds
export const streamTimeout = 5000

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	context: EntryContext,
	appContext: AppLoadContext
) {
	let shellRendered = false
	//	console.log("request: " + Object.toString(request))

	request.headers.forEach((name, value) => {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.log("got header: %s=%s", name, value)
	})

	const userAgent = request.headers.get("user-agent")

	const cookie = request.headers.get("cookie")

	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log("cookie: %s", cookie)

	//const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady"

	const ctx = appContext
	//	const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady"
	const instance = createInstance()
	const lng = ctx.lang
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const ns = i18nextOpts.getRouteNamespaces(context as any)

	await instance
		.use(initReactI18next) // Tell our instance to use react-i18next
		.init({
			...i18n, // spread the configuration
			lng, // The locale we detected above
			ns, // The namespaces the routes about to render wants to use
			resources,
		})

	const body = await renderToReadableStream(
		<I18nextProvider i18n={instance}>
			<ServerRouter context={context} url={request.url} />
		</I18nextProvider>,
		{
			onError(error: unknown) {
				// biome-ignore lint/style/noParameterAssign: cloudflare api
				responseStatusCode = 500
				// Log streaming rendering errors from inside the shell.  Don't log
				// errors encountered during initial shell rendering since they'll
				// reject and get logged in handleDocumentRequest.
				if (shellRendered) {
					// biome-ignore lint/suspicious/noConsole: <explanation>
					console.error(error)
				}
			},
		}
	)
	shellRendered = true

	// Ensure requests from bots and SPA Mode renders wait for all content to load before responding
	// https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
	if ((userAgent && isbot(userAgent)) || context.isSpaMode) {
		await body.allReady
	}

	responseHeaders.set("Content-Type", "text/html")
	return new Response(body, {
		headers: responseHeaders,
		status: responseStatusCode,
	})
}
