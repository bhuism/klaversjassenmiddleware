import type React from "react"
import UidContext from "~/context/UidContext"
import AuthSessionProvider from "./AuthSessionProvider"
import HandleLogin from "./HandleLogin"
import type { User } from ".generated-sources/openapi"

export const LOCAL_STORAGE_USERID_KEY = "CardSeverAuthUserId"

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

	// all good

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
				//				sendMessage: () => Promise.resolve(),
			}}
		>
			{children}
		</UidContext.Provider>
	)
}

export default UidContextProvider
