import { useEffect, useState } from "react"

const useLoadOnce = <T,>(queryFn: () => Promise<T>, initialData: T | undefined = undefined) => {
	const [data, setData] = useState<T | undefined>(initialData)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error>()

	useEffect(() => {
		let didCancel = false

		queryFn()
			.then((d) => {
				if (!didCancel) setData(d)
			})
			.catch((e) => {
				if (!didCancel) setError(e)
			})
			.finally(() => setIsLoading(false))

		return () => {
			didCancel = true
		}
	}, [queryFn])

	return { data, isLoading, error }
}

export default useLoadOnce
