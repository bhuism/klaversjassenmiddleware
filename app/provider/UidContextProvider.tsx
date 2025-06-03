import { CircularProgress, Typography } from "@mui/material"
import React from "react"
import { useAuth } from "react-oidc-context"
import useCardApi from "~/hooks/useGameApi"
import useLoadOnce from "~/hooks/useLoadOnce"
import Star from "~/layout/Star"
import CenterComponents from "~/utils/CenterComponents"
import type { MessageType } from "./SocketGuard"
import type { User } from ".generated-sources/openapi"

interface UidContextProps {
	user?: User
	deleteUser: (deleterUid: string) => Promise<void>
	addFeedBack: (comment: string) => Promise<void>
	addFriend: (adder: string) => Promise<void>
	delFriend: (remover: string) => Promise<void>
	sendMessage: (messageType: MessageType, receivers: string[], body?: string) => Promise<void>
}

const UidContext = React.createContext<UidContextProps>({
	deleteUser: () => Promise.resolve(),
	addFeedBack: () => Promise.resolve(),
	addFriend: () => Promise.resolve(),
	delFriend: () => Promise.resolve(),
	sendMessage: () => Promise.resolve(),
})

// export const sendMessageRaw = (
// 	uid: string,
// 	messageType: MessageType,
// 	receivers: string[],
// 	body?: string
// ): Promise<void> => {
// 	const batch = writeBatch(firestore)

// 	receivers.forEach((receiver) => {
// 		const message: Message = {
// 			created: Timestamp.now(),
// 			creator: uid,
// 			messageType: messageType,
// 			receiver: receiver,
// 			read: false,
// 			body: body,
// 		}

// 		batch.set(doc(collection(firestore, "messages")).withConverter(messageConverter), message)
// 	})

// 	return batch.commit().catch((err: Error) => toast.error(err.name + " : " + err.message)) as Promise<void>
// }

export const UidContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, user: authUser } = useAuth()
	const cardApi = useCardApi()

	if (!isAuthenticated || !authUser) {
		return <>no user</>
	}

	// useEffect(() => {
	// 	setLoading(true)
	// 	setUser(undefined)
	// 	cardApi
	// 		.whoami()
	// 		.then(setUser)
	// 		.catch(() => setUser(undefined))
	// 		.finally(() => setLoading(false))
	// }, [cardApi])

	const { data: user, isLoading, error } = useLoadOnce<User>(() => cardApi.whoami())

	if (error !== undefined) {
		return <Typography>{`Error: ${error}`}</Typography>
	}

	if (isLoading) {
		return (
			<CenterComponents>
				<Star />
				<CircularProgress />
				<p>Loading current User...</p>
			</CenterComponents>
		)
	}

	// const deleteUser = (deleterUid: string): Promise<void> => {
	// 	return deleteDoc(doc(firestore, "users", deleterUid))
	// }

	// const addFeedBack = (comment: string): Promise<void> => {
	// 	return addDoc(collection(firestore, "feedback"), {
	// 		creator: uid,
	// 		created: serverTimestamp(),
	// 		comment: comment,
	// 	}).catch((err) => {
	// 		toast.error(err.message)
	// 	}) as Promise<void>
	// }

	// const addFriend = (adder: string): Promise<void> => {
	// 	return updateDoc(doc(firestore, "users", uid), {
	// 		updated: serverTimestamp(),
	// 		invites: arrayUnion(adder),
	// 	})
	// 		.then(() => {
	// 			logEvent(analytics, "join_group")
	// 			sendMessage(MessageType.invitation, [adder])
	// 		})
	// 		.catch((err: Error) => toast.error(err.name + " : " + err.message)) as Promise<void>
	// }

	// const delFriend = (remover: string): Promise<void> => {
	// 	return updateDoc(doc(firestore, "users", uid), {
	// 		updated: serverTimestamp(),
	// 		invites: arrayRemove(remover),
	// 	}).catch((err: Error) => toast.error(err.name + " : " + err.message)) as Promise<void>
	// }

	// const sendMessage = (messageType: MessageType, receivers: string[], body?: string): Promise<void> => {
	// 	return sendMessageRaw(firestore, uid, messageType, receivers, body)
	// }

	return (
		<UidContext.Provider
			value={{
				user,
				deleteUser: () => Promise.resolve(),
				addFeedBack: () => Promise.resolve(),
				addFriend: () => Promise.resolve(),
				delFriend: () => Promise.resolve(),
				sendMessage: () => Promise.resolve(),
			}}
		>
			{children}
		</UidContext.Provider>
	)
}

export default UidContext
