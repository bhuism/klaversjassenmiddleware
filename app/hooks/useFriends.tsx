import { useContext, useEffect, useState } from "react"
import UidContext from "~/provider/UidContextProvider"
import useCardApi from "./useGameApi"
import type { User } from ".generated-sources/openapi"

// export function useInvites(): Array<string> | undefined {
// 	const { user } = useContext(UidContext)

// 	const [invites, setInvites] = useState<Array<string>>()

// 	useEffect(() => {
// 		const userRef = doc(firestore, "users", uid).withConverter(userConverter)

// 		return onSnapshot(
// 			userRef,
// 			(snapshot) => {
// 				const data = snapshot.data()

// 				if (data) {
// 					setInvites(data.invites)
// 				}
// 			},
// 			() => setInvites(undefined)
// 		)
// 	}, [firestore, uid])

// 	return invites
// }

export function useIncomingInvitesAndFriends(): {
	inComingInvites: Array<User>
	friends: Array<User>
	isLoading: boolean
} {
	const { user } = useContext(UidContext)
	const cardApi = useCardApi()
	const [inComingInvites, setInComingInvites] = useState<Array<User>>([])
	const [friends, setFriends] = useState<Array<User>>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		setIsLoading(true)
		cardApi
			.getIncomingFriends()
			.then((allInvites) => {
				if (user?.invites) {
					const invites = user?.invites
					setInComingInvites([...allInvites].filter((u) => ![...invites].includes(u.id)))
					setFriends([...allInvites].filter((u) => [...invites].includes(u.id)))
				}
			})
			.catch(() => {
				setInComingInvites([])
				setFriends([])
			})
			.finally(() => setIsLoading(false))
	}, [user?.invites, cardApi])

	return { inComingInvites, friends, isLoading }
}

// export function useOutGoingInvites(): Array<User> | undefined {
// 	const firestore = useFirestore()
// 	const { uid } = useContext(UidContext)

// 	const invites = useInvites()
// 	const { friends } = useIncomingInvitesAndFriends()

// 	const [outGoingInvites, setOutGoingInvites] = useState<Array<User>>()

// 	useEffect(() => {
// 		if (invites && friends) {
// 			const ins: string[] = invites.filter((u) => !friends.map((f) => f.uid).includes(u)).slice(0, 10)

// 			if (ins.length > 0) {
// 				return onSnapshot(
// 					query(collection(firestore, "users"), where(documentId(), "in", ins)),
// 					(querySnapshot) => {
// 						setOutGoingInvites(
// 							querySnapshot.docs
// 								.map((userData) => userData.data() as User)
// 								.filter((u) => !u.invites.includes(uid))
// 								.sort((a, b) => a.name.localeCompare(b.name))
// 						)
// 					},
// 					(err) => {
// 						toast.error(err.name + " : " + err.message)
// 						setOutGoingInvites([])
// 					}
// 				)
// 			} else {
// 				setOutGoingInvites([])
// 			}
// 		}
// 	}, [firestore, invites, friends, uid])

// 	return outGoingInvites
// }
