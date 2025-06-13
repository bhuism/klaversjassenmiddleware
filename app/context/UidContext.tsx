import React from "react"
import type { User } from ".generated-sources/openapi"

interface UidContextProps {
	user?: User
	deleteUser: (deleterUid: string) => Promise<void>
	addFeedBack: (comment: string) => Promise<void>
	addFriend: (adder: string) => Promise<void>
	delFriend: (remover: string) => Promise<void>
	//	sendMessage: (messageType: MessageType, receivers: string[], body?: string) => Promise<void>
}

const UidContext = React.createContext<UidContextProps>({
	deleteUser: () => Promise.resolve(),
	addFeedBack: () => Promise.resolve(),
	addFriend: () => Promise.resolve(),
	delFriend: () => Promise.resolve(),
	//sendMessage: () => Promise.resolve(),
})

export default UidContext
