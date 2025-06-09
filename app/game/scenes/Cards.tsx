import { type CardsType, cards } from "~/components/common/PlayingCard"
import type { GameState } from "~/types"

export class Cards extends Phaser.Scene {
	localCards: Phaser.GameObjects.Image[] = []
	gameState: GameState | undefined
	//const cards: Phaser.GameObjects.Image[] = []

	constructor() {
		super("Cards")
	}

	init() {
		this.gameState = this.registry.get("gameState")
	}

	preload() {
		this.load.atlas("cards", "/assets/cards.png", "/assets/cards.json")
		//		this.load.image("2b", cards["2b"])

		Object.keys(cards)
			.map((k) => k as string)
			.forEach((key) => {
				this.load.image(key, cards[key as keyof CardsType])
				//			this.load.image("2b", cards["2b"])
			})
	}

	create() {
		if (!this.gameState) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error("No game")
			return false
		}
		//	console.log("create()")

		const gameWidth = this.game.config.width as number
		const gameHeight = this.game.config.height as number

		const center = new Phaser.Math.Vector2(
			(this.game.config.width as number) / 2,
			(this.game.config.height as number) / 2
		)

		for (let index = 0; index < 32; index++) {
			// tune this, trust me
			const xspaver = 12
			// tune this, truste me
			const yspaver = 13

			const spreadX = gameWidth / xspaver
			const spreadY = gameHeight / yspaver

			const currentCard = this.gameState.playerCard.filter((pc) => pc.player === Math.floor(index / 8))[index % 8].card

			const card = this.add.image(center.x, center.y, currentCard)

			card.setScale(gameWidth / 2100)
			card.setDepth(-index)

			if ((index >= 8 && index < 16) || (index >= 24 && index < 32)) {
				this.tweens.add({
					delay: index * 100,
					targets: card,
					angle: "+=90",
					duration: Math.random() * 500 + 500,
				})
			} else {
				this.tweens.add({
					delay: index * 100,
					targets: card,
					angle: "+=180",
					duration: Math.random() * 500 + 500,
				})
			}

			const target = new Phaser.Math.Vector2()

			if (index < 8) {
				target.set(gameWidth - spreadX * (index % 8) - spreadX * ((xspaver - 7) / 2), gameHeight - spreadY * 0.5)
				card.setInteractive(new Phaser.Geom.Rectangle(0, 0, 240, 336), Phaser.Geom.Rectangle.Contains)
				// this.input.enableDebug(card, 0xff00ff)
				this.input.setDraggable(card)
			} else if (index < 16) {
				target.set(spreadX * 0, gameHeight - spreadY * (index % 8) - spreadY * ((yspaver - 7) / 2))
			} else if (index < 24) {
				target.set(spreadX * (index % 8) + spreadX * ((xspaver - 7) / 2), spreadY * 0.5)
			} else if (index < 32) {
				target.set(gameWidth - spreadX * 0, spreadY * (index % 8) + spreadY * ((yspaver - 7) / 2))
			} else {
				throw Error()
			}

			this.tweens.add({
				delay: index * 100,
				targets: card,
				x: target.x,
				y: target.y,
				ease: "Bounce.easeOut",
				duration: 1000 + Math.random() * 1000,
			})

			this.localCards.push(card)
		}

		this.input.on("drag", (_pointer: unknown, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
			gameObject.x = dragX
			gameObject.y = dragY
		})
	}

	update(_time: number, _delta: number) {}

	// debugTweenData(text, tweenData) {
	// 	var output = []

	// 	var TDStates = [
	// 		"CREATED",
	// 		"INIT",
	// 		"DELAY",
	// 		"OFFSET_DELAY",
	// 		"PENDING_RENDER",
	// 		"PLAYING_FORWARD",
	// 		"PLAYING_BACKWARD",
	// 		"HOLD_DELAY",
	// 		"REPEAT_DELAY",
	// 		"COMPLETE",
	// 	]

	// 	output.push(tweenData.key)
	// 	output.push("--------")
	// 	output.push("State: " + TDStates[tweenData.state])
	// 	output.push("Start: " + tweenData.start)
	// 	output.push("Current: " + tweenData.current)
	// 	output.push("End: " + tweenData.end)
	// 	output.push("Progress: " + tweenData.progress)
	// 	output.push("Elapsed: " + tweenData.elapsed)
	// 	output.push("Duration: " + tweenData.duration)
	// 	output.push("Total Duration: " + tweenData.totalDuration)
	// 	output.push("Delay: " + tweenData.delay)
	// 	output.push("Yoyo: " + tweenData.yoyo)
	// 	output.push("Hold: " + tweenData.hold)
	// 	output.push("Repeat: " + tweenData.repeat)
	// 	output.push("Repeat Counter: " + tweenData.repeatCounter)
	// 	output.push("Repeat Delay: " + tweenData.repeatDelay)

	// 	text.setText(output)
	// }
}
