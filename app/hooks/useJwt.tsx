const LOCAL_STORAGE_JWT = "CardSeverJwt"

export const setJwt = (jwt: string) => {
	localStorage.setItem(LOCAL_STORAGE_JWT, jwt)
}

const useJwt = () => {
	const jwt = localStorage.getItem(LOCAL_STORAGE_JWT)

	return jwt
}

export default useJwt
