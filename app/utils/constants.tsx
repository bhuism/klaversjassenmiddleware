const constants = {
	gitHash: import.meta.env.VITE_GIT_SHA as string,
	gitDate: import.meta.env.VITE_GIT_DATE as Date,

	clientId: import.meta.env.VITE_OAUTH_CLIENT_ID as string,
	domain: import.meta.env.VITE_OAUTH_DOMAIN as string,
	callbackUrl: import.meta.env.VITE_OAUTH_CALLBACK_URL as string,
	clientSecret: import.meta.env.VITE_OAUTH_CLIENT_SECRET as string,
	metadataUrl: import.meta.env.VITE_OAUTH_METADATA_URL as string,
	audience: import.meta.env.VITE_OAUTH_AUDIENCE as string,
	scopes: import.meta.env.VITE_OAUTH_SCOPES as string,

	apiUrl: import.meta.env.VITE_API_URL as string,
}

export default constants
