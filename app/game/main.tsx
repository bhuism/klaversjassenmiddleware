import { AUTO, Game } from "phaser"
import { GAMECONTAINERID } from "~/utils/constants"
import { Cards } from "./scenes/Cards"

const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	scale: {
		parent: GAMECONTAINERID,
		mode: Phaser.Scale.FIT,
		//autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
		min: {
			width: 320,
			height: 200,
		},
		max: {
			width: 1400,
			height: 1200,
		},
	},
	// scale: {
	//   mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
	//   //    autoCenter: Phaser.Scale.CENTER_BOTH,
	//   parent: "game-container",
	//   width: 800,
	//   height: 600,
	// },
	backgroundColor: "#028af8",
	// physics: {
	// 	default: "arcade",
	// 	arcade: {
	// 		gravity: { x: 0, y: 200 },
	// 	},
	// },
	scene: [Cards],
}

const startGame = (parent: string) => {
	return new Game({ ...config, parent })
}

export default startGame
