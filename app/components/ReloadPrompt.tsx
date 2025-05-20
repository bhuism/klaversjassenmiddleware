import "./ReloadPrompt.css"

import { useRegisterSW } from "virtual:pwa-register/react"

function ReloadPrompt() {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(r: unknown) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			// biome-ignore lint/style/useTemplate: <explanation>
			console.log("SW Registered: " + r)
		},
		onRegisterError(error: unknown) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.log("SW registration error", error)
		},
	})

	const close = () => {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	return (
		<div className="ReloadPrompt-container">
			{(offlineReady || needRefresh) && (
				<div className="ReloadPrompt-toast">
					<div className="ReloadPrompt-message">
						{offlineReady ? (
							<span>App ready to work offline</span>
						) : (
							<span>New content available, click on reload button to update.</span>
						)}
					</div>
					{needRefresh && (
						<button type="button" className="ReloadPrompt-toast-button" onClick={() => updateServiceWorker(true)}>
							Reload
						</button>
					)}
					<button type="button" className="ReloadPrompt-toast-button" onClick={() => close()}>
						Close
					</button>
				</div>
			)}
		</div>
	)
}

export default ReloadPrompt
