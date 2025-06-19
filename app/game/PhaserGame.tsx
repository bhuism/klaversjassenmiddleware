import { Box } from "@mui/material"
import { useSnackbar } from "notistack"
import { AUTO } from "phaser"
import type React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import useCardApi from "~/hooks/useGameApi"
import useUser from "~/hooks/useUser"
import { Cards } from "./scenes/Cards"
import type { Game } from ".generated-sources/openapi"

export const PhaserGame: React.FC<{ gameState: Game }> = ({ gameState }) => {
	const GAMECONTAINERID = "game-container"

	const cardApi = useCardApi()
	const navigate = useNavigate()
	const { user } = useUser()
	const { enqueueSnackbar } = useSnackbar()

	useEffect(() => {
		const cardsScene = new Cards(
			cardApi,
			gameState,
			() => navigate("/"),
			user,
			enqueueSnackbar,
			() => navigate(`/game/${gameState.id}`)
		)

		const config: Phaser.Types.Core.GameConfig = {
			type: AUTO,
			audio: {
				noAudio: true,
			},
			parent: GAMECONTAINERID,
			scale: {
				parent: GAMECONTAINERID,
				mode: Phaser.Scale.FIT,
				width: window.innerWidth,
				height: window.innerHeight,
			},
			backgroundColor: "#101010",
		}

		const game = new Phaser.Game(config)

		game.scene.add("cards", cardsScene, true)
	}, [cardApi, navigate, user, gameState, enqueueSnackbar])

	return <Box id={GAMECONTAINERID} sx={{ display: "flex", flexDirection: "column" }} />
}
