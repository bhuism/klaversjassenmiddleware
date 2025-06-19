import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import useCardApi from "./useGameApi"
import useUser from "./useUser"
import type { User } from ".generated-sources/openapi"

const useIncomingInvitesAndFriends = () => {
	const { user } = useUser()
	const cardApi = useCardApi()
	const [inComingInvites, setInComingInvites] = useState<Array<User>>()
	const [friends, setFriends] = useState<Array<User>>()

	const {
		data: allInvites,
		isLoading,
		refetch,
	} = useQuery({
		queryFn: () =>
			cardApi
				.getIncomingFriends()
				.then((allInvites) => {
					const invites = user?.invites
					setInComingInvites(
						[...allInvites].filter((u) => ![...invites].includes(u.id)).sort((a, b) => a.name.localeCompare(b.name))
					)
					setFriends(
						[...allInvites].filter((u) => [...invites].includes(u.id)).sort((a, b) => a.name.localeCompare(b.name))
					)
					return allInvites.sort((a, b) => a.name.localeCompare(b.name))
				})
				.catch(() => {
					setInComingInvites(undefined)
					setFriends(undefined)
					return undefined
				}),
		queryKey: ["incomingFriends"],
	})

	return { allInvites, inComingInvites, friends, isLoading, refetch }
}

export default useIncomingInvitesAndFriends

// export function useOutGoingInvites(): Array<User> | undefined {
// 	const { user } = useUser()

// 	const invites = user.invites

// 	const { friends } = useIncomingInvitesAndFriends()

// 	const [outGoingInvites, setOutGoingInvites] = useState<Array<User>>()

// 	useEffect(() => {
// 		if (invites && friends) {
// 			const ins: string[] = invites.filter((u) => !friends.map((f) => f.id).includes(u))

// 			if (ins.length > 0) {
// 				query(collection(firestore, "users"), where(documentId(), "in", ins)),
// 					setOutGoingInvites(
// 						querySnapshot.docs
// 							.map((userData) => userData.data() as User)
// 							.filter((u) => !u.invites.includes(user.id))
// 							.sort((a, b) => a.name.localeCompare(b.name))
// 					)
// 			} else {
// 				setOutGoingInvites([])
// 			}
// 		}
// 	}, [invites, friends, user.id])

// 	return outGoingInvites
// }
