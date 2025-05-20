import { registerSW } from "virtual:pwa-register"
import { StrictMode, startTransition } from "react"
import { hydrateRoot } from "react-dom/client"
import { HydratedRouter } from "react-router/dom"

async function hydrate() {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<HydratedRouter />
			</StrictMode>
		)
	})
}

registerSW({ immediate: true })

// if ("serviceWorker" in navigator) {
// 	window.addEventListener("load", () => {
// 		navigator.serviceWorker.register("/sw.js", { scope: "/" })
// 	})
// }

if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate)
} else {
	window.setTimeout(hydrate, 1)
}
