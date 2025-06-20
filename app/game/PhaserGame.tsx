import { Box, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { AUTO } from "phaser"
import type React from "react"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import type { PlayCardEvent } from "~/components/common/utils"
import useCardApi from "~/hooks/useGameApi"
import { EventListenerContext } from "~/provider/EventSourceProvider"
import UserContext from "~/provider/UserContext"
import { Cards } from "./scenes/Cards"
import type { Game } from ".generated-sources/openapi"

export const PhaserGame: React.FC<{ gameState: Game }> = ({ gameState }) => {
	const GAMECONTAINERID = "game-container"

	const cardApi = useCardApi()
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const { enqueueSnackbar } = useSnackbar()
	const { eventSource } = useContext(EventListenerContext)

	if (!user) {
		return <Typography>no user</Typography>
	}

	useEffect(() => {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.log("new phasergame")

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

		const cardsScene = new Cards(
			cardApi,
			gameState,
			() => navigate("/"),
			user,
			enqueueSnackbar,
			() => navigate(`/game/${gameState.id}`)
		)

		const listener = (e: { data: string }) => {
			const playerCardEvent: PlayCardEvent = JSON.parse(e.data) as PlayCardEvent

			if (playerCardEvent.gameId === gameState.id) {
				cardsScene.playCard(playerCardEvent)
			} else {
				// biome-ignore lint/suspicious/noConsole: <explanation>
				console.error(`Got playCard event for wrong game: ${playerCardEvent.gameId}`)
			}
		}

		eventSource?.addEventListener("playCard", listener)

		game.scene.add("cards", cardsScene, true)

		return () => {
			eventSource?.removeEventListener("playCard", listener)
			game.destroy(true)
		}
	}, [cardApi, navigate, user, enqueueSnackbar, eventSource, gameState])

	return <Box id={GAMECONTAINERID} sx={{ display: "flex", flexDirection: "column" }} />
}
