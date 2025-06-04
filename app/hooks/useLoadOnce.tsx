import { useEffect, useState } from "react"

const useLoadOnce = <T,>(queryFn: () => Promise<T>, initialData: T | undefined = undefined) => {
	const [data, setData] = useState<T | undefined>(initialData)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error>()
	const [trigger, setTrigger] = useState<number>(Math.random())

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let didCancel = false

		setIsLoading(true)

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
	}, [trigger])

	const reload = () => {
		setTrigger(Math.random())
	}

	return { data, isLoading, error, reload }
}

export default useLoadOnce
