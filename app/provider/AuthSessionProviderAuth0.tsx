import type { PropsWithChildren } from "react"
import { AuthProvider, type AuthProviderProps } from "react-oidc-context"
import constants from "~/utils/constants"

const AuthSessionProviderAuth0 = ({ children }: PropsWithChildren) => {
	const oidcConfig: AuthProviderProps = {
		authority: constants.domain,
		client_id: constants.clientId,
		loadUserInfo: true,
		scope: constants.scopes,
		client_secret: constants.clientSecret,
		metadataUrl: constants.metadataUrl,
		redirect_uri: constants.callbackUrl,
		onSigninCallback: (user): void => {
			window.history.replaceState({}, document.title, window.location.pathname)
			document.cookie = `token=${user?.id_token}; path=/; expires=${new Date().getTime() + 1 * 60 * 60 * 1000}; path=/; SameSite=Strict; Secure`
		},
		onRemoveUser: () => {
			document.cookie = `token=; expires=${new Date(0).toUTCString()}; path=/; SameSite=Strict; Secure`
		},
		onSignoutCallback: () => {
			document.cookie = `token=; expires=${new Date(0).toUTCString()}; path=/; SameSite=Strict; Secure`
		},
		post_logout_redirect_uri: constants.callbackUrl,
		extraQueryParams: {
			audience: constants.audience,
		},
	}

	return <AuthProvider {...oidcConfig}>{children}</AuthProvider>
}

export default AuthSessionProviderAuth0
