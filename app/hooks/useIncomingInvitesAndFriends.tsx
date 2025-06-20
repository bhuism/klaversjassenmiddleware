import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import UserContext from "~/provider/UserContext"
import useCardApi from "./useGameApi"

const useIncomingInvitesAndFriends = () => {
	const { user } = useContext(UserContext)
	const cardApi = useCardApi()

	const { data, isLoading, refetch, error } = useQuery({
		queryFn: () =>
			cardApi.getIncomingInvites().then((allIncomingInvites) => {
				const invites = user?.invites

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
				}
			}),
		queryKey: ["incomingFriends", user],
	})

	const inComingInvites = data?.inComingInvites
	const friends = data?.friends

	return { inComingInvites, friends, isLoading, refetch, error }
}

export default useIncomingInvitesAndFriends
