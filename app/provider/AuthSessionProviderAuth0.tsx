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
		//    userStore: new WebStorageStateStore({ store: window.localStorage }),
		onSigninCallback: (): void => {
			window.history.replaceState({}, document.title, window.location.pathname)
		},
		post_logout_redirect_uri: constants.callbackUrl,
		extraQueryParams: {
			audience: constants.audience,
		},
	}

	return <AuthProvider {...oidcConfig}>{children}</AuthProvider>
}

export default AuthSessionProviderAuth0
