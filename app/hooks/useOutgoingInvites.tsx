import { useQuery } from "@tanstack/react-query"
import useCardApi from "./useGameApi"
import useIncomingInvitesAndFriends from "./useIncomingInvitesAndFriends"
import useUser from "./useUser"

const useOutGoingInvites = () => {
	const { user } = useUser()
	const { friends } = useIncomingInvitesAndFriends()
	const cardApi = useCardApi()

	const ins = user?.invites.filter((u) => !friends?.map((f) => f.id).includes(u))

	if (!ins || ins.length === 0) {
		return { outGoingInvites: [], isLoading: false, error: undefined, refetch: () => {} }
	}

	const {
		data: outGoingInvites,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryFn: ({ queryKey }) => cardApi.getUsers(queryKey[1] as string[]),
		// .then((inUsers) =>
		// 	inUsers.filter((u) => !u.invites.includes(user.id)).sort((a, b) => a.name.localeCompare(b.name))
		// ),
		queryKey: ["ins", ins],
	})

	return { outGoingInvites, isLoading, error, refetch }
}

export default useOutGoingInvites
