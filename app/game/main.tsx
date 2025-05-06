import { AUTO, Game } from "phaser"
import { Boot } from "./scenes/Boot"
import { MainMenu } from "./scenes/MainMenu"
import { Preloader } from "./scenes/Preloader"

const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	scale: {
		parent: "phaser-example",
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	// scale: {
	//   mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
	//   //    autoCenter: Phaser.Scale.CENTER_BOTH,
	//   parent: "game-container",
	//   width: 800,
	//   height: 600,
	// },
	backgroundColor: "#028af8",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 200 },
		},
	},
	scene: [Boot, Preloader, MainMenu],
}

const startGame = (parent: string) => {
	return new Game({ ...config, parent })
}

export default startGame
