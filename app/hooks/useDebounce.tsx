import { type SetStateAction, useEffect, useState } from "react"

export function useDebounce<T>(
	value: T,
	delay?: number
): { debouncedValue: T; setDebouncedValue: React.Dispatch<SetStateAction<T>> } {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	// biome-ignore lint/correctness/useExhaustiveDependencies: we dont need it
	useEffect(() => {
		if (value !== debouncedValue) {
			const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
			return () => clearTimeout(timer)
		}
	}, [value, delay])

	return { debouncedValue, setDebouncedValue }
}

export default useDebounce
