import { useSnackbar } from "notistack"
import { forwardRef, useLayoutEffect, useRef } from "react"
import useDidUpdateEffect from "~/hooks/useDidUpdateEffect"
import startGame from "./main"

export interface IRefPhaserGame {
	game: Phaser.Game | null
	scene: Phaser.Scene | null
}

interface IProps {
	currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref) {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log(`currentScene: ${currentActiveScene}`)

	const { enqueueSnackbar } = useSnackbar()

	const GAMEID = "game-container"

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const game = useRef<Phaser.Game | null>(null!)

	useDidUpdateEffect(() => {
		enqueueSnackbar(`current scene: ${currentActiveScene}`, { variant: "success" })
	}, [currentActiveScene])

	useLayoutEffect(() => {
		if (game.current === null) {
			game.current = startGame(GAMEID)

			if (typeof ref === "function") {
				ref({ game: game.current, scene: null })
			} else if (ref) {
				ref.current = { game: game.current, scene: null }
			}
		}

		return () => {
			if (game.current) {
				game.current.destroy(true)
				if (game.current !== null) {
					game.current = null
				}
			}
		}
	}, [ref])

	return <div id={GAMEID} />
})
