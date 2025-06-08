import { Box } from "@mui/material"
import { forwardRef, useLayoutEffect, useRef } from "react"
import { GAMECONTAINERID } from "~/utils/constants"
import startGame from "./main"

export interface IRefPhaserGame {
	game: Phaser.Game | null
	scene: Phaser.Scene | null
}

interface IProps {
	currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/correctness/noUnusedFunctionParameters: <explanation>
export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref) {
	//console.log(`currentScene: ${currentActiveScene}`)

	//const { enqueueSnackbar } = useSnackbar()

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const game = useRef<Phaser.Game | null>(null!)

	// useDidUpdateEffect(() => {
	// 	enqueueSnackbar(`current scene: ${currentActiveScene}`, { variant: "success" })
	// }, [currentActiveScene])

	useLayoutEffect(() => {
		if (game.current === null) {
			game.current = startGame(GAMECONTAINERID)

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

	return <Box id={GAMECONTAINERID} sx={{ display: "flex", flexDirection: "column" }} />
})
