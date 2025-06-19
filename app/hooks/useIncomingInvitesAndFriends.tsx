import { useQuery } from "@tanstack/react-query"
import useCardApi from "./useGameApi"
import useUser from "./useUser"

const useIncomingInvitesAndFriends = () => {
	const { user } = useUser()
	const cardApi = useCardApi()
	// const [inComingInvites, setInComingInvites] = useState<Array<User>>()
	// const [friends, setFriends] = useState<Array<User>>()

	const { data, isLoading, refetch, error } = useQuery({
		queryFn: () =>
			cardApi.getIncomingInvites().then((allIncomingInvites) => {
				const invites = user?.invites
				// setInComingInvites(
				// 	[...allInvites].filter((u) => ![...invites].includes(u.id)).sort((a, b) => a.name.localeCompare(b.name))
				// )
				// setFriends(
				// 	[...allInvites].filter((u) => [...invites].includes(u.id)).sort((a, b) => a.name.localeCompare(b.name))
				// )
				// return allInvites.sort((a, b) => a.name.localeCompare(b.name))

				if (!invites) {
					return {
						inComingInvites: [],
						friends: [],
					}
				}

				return {
					inComingInvites: [...allIncomingInvites]
						.filter((u) => ![...invites].includes(u.id))
						.sort((a, b) => a.name.localeCompare(b.name)),
					friends: [...allIncomingInvites]
						.filter((u) => [...invites].includes(u.id))
						.sort((a, b) => a.name.localeCompare(b.name)),
					//outGoingInvites: [...invites].filter((u) => ![...allIncomingInvites].includes(u.id)).sort((a, b) => a.name.localeCompare(b.name)),
					//allInvites: ai.sort((a, b) => a.name.localeCompare(b.name)),
				}
			}),
		queryKey: ["incomingFriends"],
	})

	//const allInvites = data?.allInvites
	const inComingInvites = data?.inComingInvites
	const friends = data?.friends

	return { inComingInvites, friends, isLoading, refetch, error }
}

export default useIncomingInvitesAndFriends
