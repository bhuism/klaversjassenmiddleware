import { Box } from "@mui/material"
import { AUTO } from "phaser"
import type React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import useCardApi from "~/hooks/useGameApi"
import { Cards } from "./scenes/Cards"
import type { Game } from ".generated-sources/openapi"

export const PhaserGame: React.FC<{ gameState: Game }> = ({ gameState }) => {
	const GAMECONTAINERID = "game-container"

	const cardApi = useCardApi()
	const navigate = useNavigate()

	const createGame = (parent: string, gameState: Game) => {
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
		}

		const game = new Phaser.Game(config)

		const cardsScene = new Cards(cardApi, gameState, () => navigate("/"))

		game.scene.add("cards", cardsScene, true)

		return game
	}

	useEffect(() => {
		createGame(GAMECONTAINERID, gameState)
	})

	return <Box id={GAMECONTAINERID} sx={{ display: "flex", flexDirection: "column" }} />
}
