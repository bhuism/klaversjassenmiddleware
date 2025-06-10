import { AUTO, Game } from "phaser"
import type { GameState } from "~/types"
import { GAMECONTAINERID } from "~/utils/constants"
import { Cards } from "./scenes/Cards"

const startGame = (parent: string, gameState: GameState) => {
	const config: Phaser.Types.Core.GameConfig = {
		type: AUTO,
		audio: {
			noAudio: true,
		},
		scale: {
			parent: GAMECONTAINERID,
			mode: Phaser.Scale.FIT,
			//		autoCenter: Phaser.Scale.CENTER_BOTH,
			// width: 800,
			// height: 600,
			width: window.innerWidth,
			height: window.innerHeight,

			// 	min: {
			// 		width: 320,
			// 		height: 200,
			// 	},
			// 	max: {
			// 		width: 1400,
			// 		height: 1200,
			// 	},
			// },
			// scale: {
			//   mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
			//   //    autoCenter: Phaser.Scale.CENTER_BOTH,
			//   parent: "game-container",
			//   width: 800,
			//   height: 600,
		},
		backgroundColor: "#101010",
		physics: {
			default: "arcade",
			arcade: { debug: false, fps: 30 },
		},
		scene: [Cards],
	}

	const game = new Game({ ...config, parent })

	game.registry.set("gameState", gameState)

	return game
}

export default startGame
