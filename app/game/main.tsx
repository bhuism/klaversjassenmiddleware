import { AUTO, Game } from "phaser"
import { GAMECONTAINERID } from "~/utils/constants"
import { Cards } from "./scenes/Cards"

const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	scale: {
		parent: GAMECONTAINERID,
		mode: Phaser.Scale.RESIZE,
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

const startGame = (parent: string) => {
	const game = new Game({ ...config, parent })

	// window.addEventListener(
	// 	"resize",
	// 	(_event) => {
	// 		game.scale.resize(window.innerWidth, window.innerHeight)
	// 	},
	// 	false
	// )

	return game
}

export default startGame
