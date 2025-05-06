import { type DependencyList, useEffect, useRef } from "react"

const useDidUpdateEffect = (fn: () => void, inputs: DependencyList | undefined) => {
	const didMountRef = useRef(false)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (didMountRef.current) {
			return fn()
		}
		didMountRef.current = true
	}, inputs)
}

export default useDidUpdateEffect
