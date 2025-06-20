import React, { useState, type PropsWithChildren } from "react"
import { getUserFromStorage, setUserInStorage } from "~/hooks/useUser"
import type { User } from ".generated-sources/openapi"

type UserContextType = {
	user: User | undefined
	setUser: (user: User) => void
	logout: () => void
}

const UserContext = React.createContext<UserContextType>({ user: undefined, setUser: () => {}, logout: () => {} })

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, _setUser] = useState<User | undefined>(getUserFromStorage)

	const setUser = (u: User) => {
		setUserInStorage(u)
		_setUser(u)
	}

	const logout = () => {
		localStorage.clear()
		sessionStorage.clear()
		_setUser(undefined)
	}

	return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>
}

export default UserContext
