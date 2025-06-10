import { Box } from "@mui/material"
import { AUTO, Game } from "phaser"
import type React from "react"
import { useEffect } from "react"
import useCardApi from "~/hooks/useGameApi"
import type { GameState } from "~/types"
import { Cards } from "./scenes/Cards"

export const PhaserGame: React.FC<{ gameState: GameState }> = ({ gameState }) => {
	const GAMECONTAINERID = "game-container"

	const cardApi = useCardApi()

	const createGame = (parent: string, gameState: GameState) => {
		const config: Phaser.Types.Core.GameConfig = {
			type: AUTO,
			audio: {
				noAudio: true,
			},
			parent,
			scale: {
				parent: GAMECONTAINERID,
				mode: Phaser.Scale.FIT,
				width: window.innerWidth,
				height: window.innerHeight,
			},
			backgroundColor: "#101010",
			physics: {
				default: "arcade",
				arcade: { debug: false, fps: 30 },
			},
		}

		const game = new Game(config)

		const cardsScene = new Cards(cardApi, gameState)

		game.scene.add("cards", cardsScene, true)

		return game
	}

	useEffect(() => {
		createGame(GAMECONTAINERID, gameState)
	})

	return <Box id={GAMECONTAINERID} sx={{ display: "flex", flexDirection: "column" }} />
}
