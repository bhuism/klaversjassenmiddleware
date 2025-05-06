import { CircularProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

// const fetcher: Fetcher<string, string> = (slug: string) => {
//   return fetch("https://time.impl.nl" + "?" + slug).then((res) =>
//     res.ok ? res.text() : "error: " + res.status
//   );
// };

function TimeComponent({ slug }: { slug: string }) {
	const { status, data, error } = useQuery({
		queryFn: () => {
			return fetch(`https://time.impl.nl?${slug}`).then((res) => (res.ok ? res.text() : `error: ${res.status}`))
		},
		queryKey: ["slug", slug],
	})

	if (error) return <span style={{ color: "red" }}>{error.message}</span>

	if (status === "pending") return <CircularProgress />

	return <span>{data}</span>
}

export default TimeComponent
