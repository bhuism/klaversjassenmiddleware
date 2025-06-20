import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import UserContext from "~/provider/UserContext"
import useCardApi from "./useGameApi"
import useIncomingInvitesAndFriends from "./useIncomingInvitesAndFriends"

const useOutGoingInvites = () => {
	const { user } = useContext(UserContext)
	const { friends } = useIncomingInvitesAndFriends()
	const cardApi = useCardApi()

	const ins = user?.invites.filter((u) => !friends?.map((f) => f.id).includes(u))

	const {
		data: outGoingInvites,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryFn: ({ queryKey }) => cardApi.getUsers(queryKey[1] as string[]),
		queryKey: ["ins", ins],
	})

	return { outGoingInvites, isLoading, error, refetch }
}

export default useOutGoingInvites
