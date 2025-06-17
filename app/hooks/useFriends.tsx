import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import useCardApi from "./useGameApi"
import useUser from "./useUser"
import type { User } from ".generated-sources/openapi"

export function useIncomingInvitesAndFriends(): {
	allInvites: Array<User> | undefined
	inComingInvites: Array<User> | undefined
	friends: Array<User> | undefined
	isLoading: boolean
} {
	const { user } = useUser()
	const cardApi = useCardApi()
	const [inComingInvites, setInComingInvites] = useState<Array<User>>()
	const [friends, setFriends] = useState<Array<User>>()

	const { data: allInvites, isLoading } = useQuery({
		queryFn: () =>
			cardApi
				.getIncomingFriends()
				.then((allInvites) => {
					const invites = user?.invites
					setInComingInvites([...allInvites].filter((u) => ![...invites].includes(u.id)))
					setFriends([...allInvites].filter((u) => [...invites].includes(u.id)))
					return allInvites
				})
				.catch(() => {
					setInComingInvites(undefined)
					setFriends(undefined)
					return undefined
				}),
		queryKey: ["incomingFriends"],
	})

	return { allInvites, inComingInvites, friends, isLoading }
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
