import type React from "react"
import UidContext from "~/context/UidContext"
import AuthSessionProvider from "./AuthSessionProvider"
import HandleLogin from "./HandleLogin"
import type { User } from ".generated-sources/openapi"

export const LOCAL_STORAGE_USERID_KEY = "CardSeverAuthUserId"

const UidContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	let user: User | undefined = undefined

	const raw = localStorage.getItem(LOCAL_STORAGE_USERID_KEY)

	if (raw) {
		try {
			user = JSON.parse(raw)
		} catch (e) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.log("", e)
		}
	}

	if (!user || !user.id || user.id.length !== 28) {
		return (
			<AuthSessionProvider>
				<HandleLogin />
			</AuthSessionProvider>
		)
	}

	return (
		<UidContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</UidContext.Provider>
	)
}

export default UidContextProvider
