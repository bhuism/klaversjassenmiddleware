import { cards } from "~/components/common/PlayingCard"

export class Cards extends Phaser.Scene {
	localCards: Phaser.GameObjects.Image[] = []
	//const cards: Phaser.GameObjects.Image[] = []

	constructor() {
		super("Cards")
	}

	preload() {
		//		this.load.setBaseURL("https://cdn.phaserfiles.com/v385")
		this.load.image("bg", "/assets/gradient13.png")

		//		this.load.image("red", "/assets/red.png")

		this.load.atlas("cards", "/assets/cards.png", "/assets/cards.json")

		this.load.image("2b", cards["2b"])
	}

	create() {
		// const centerX = (this.game.config.width as number) / 2
		// const centerY = (this.game.config.height as number) / 2

		const gameWidth = this.game.config.width as number
		const gameHeight = this.game.config.height as number

		const center = new Phaser.Math.Vector2(
			(this.game.config.width as number) / 2,
			(this.game.config.height as number) / 2
		)

		//		text = this.add.text(10, 10, "", { font: "16px Courier", color: "#ffffff" })
		//this.add.image(400, 300, "bg")

		for (let index = 0; index < 32; index++) {
			//			const angle = Math.PI * 2 * (index / 32.0) + Math.PI / 8
			//			new Phaser.Math.Vector2(1, 1);

			//			const target

			//

			//			const spread = 12

			const spreadX = gameWidth / 9
			const spreadY = gameHeight / 9

			const target = new Phaser.Math.Vector2()

			if (index < 8) {
				target.set(gameWidth - spreadX * (index % 8) - spreadX * 1, gameHeight - spreadY * 0.5)
			} else if (index < 16) {
				target.set(spreadX * 0.5, gameHeight - spreadY * (index % 8) - spreadY * 1)
			} else if (index < 24) {
				target.set(spreadX * (index % 8) + spreadX * 1, spreadY * 0.5)
			} else if (index < 32) {
				target.set(gameWidth - spreadX * 0.5, spreadY * (index % 8) + spreadY * 1)
			} else {
				throw Error()
			}

			//			const speed = Phaser.Math.Distance.BetweenPoints(center, target)

			//			this.add.image(target.x, target.y, "red").setScale(0.1).setAlpha(2)
			this.add.text(target.x, target.y, `${index}`)

			// const card = this.physics.add
			// 	.image(center.x, center.y, "2b")
			// 	.setScale(0.5)
			// 	//				.setBounce(1, 1)
			// 	.setVelocityX(Math.cos(angle) * speed)
			// 	.setVelocityY(Math.sin(angle) * speed)
			// 	.setDrag(100)

			// card.setScale(0.4)

			const card = this.add.image(center.x, center.y, "2b").setScale(0.3)

			if ((index >= 8 && index < 16) || (index >= 24 && index < 32)) {
				this.tweens.add({
					delay: index * 100,
					targets: card,
					angle: "+=90",
					duration: Math.random() * 1000 + 500,
				})
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

		// tween = this.tweens.add({
		// 	targets: cards[0],
		// 	angle: "+=360",
		// 	duration: 3000 - index,
		// 	ease: "Sine.inOut",
		// 	yoyo: true,
		// 	repeat: -1,
		// })

		//		card.setScale(0.5)
		//const frames = this.textures.get("cards").getFrameNames()

		//  Create random cards, with random rotations

		// for (let i = 0; i < 64; i++) {
		// 	const x = Phaser.Math.Between(0, 800)
		// 	const y = Phaser.Math.Between(0, 600)

		// 	const card = this.add.plane(x, y, "cards", Phaser.Utils.Array.GetRandom(frames))

		// 	//card.setRotation(100)

		// 	// card.rotateX = Phaser.Math.Between(0, 360)
		// 	// card.rotateZ = Phaser.Math.Between(0, 360)
		// 	// card.rotateY = Phaser.Math.Between(0, 360)

		// 	card.modelRotation.x = Phaser.Math.Between(0, 360)
		// 	card.modelRotation.y = Phaser.Math.Between(0, 360)
		// 	card.modelRotation.z = Phaser.Math.Between(0, 360)

		// 	//			card.setInteractive()

		// 	// card.on("pointerdown", () => {
		// 	// 	card.setTint(0x00ff00)
		// 	// })

		// 	this.cards.unshift(card)
	}

	// 	this.tweens.add({
	// 		targets: cards,
	// 		angle: "+=255",
	// 		duration: 3000,
	// 		ease: "Sine.inOut",
	// 		yoyo: true,
	// 		repeat: -1,
	// 	})
	// }

	update() {
		this.physics.world.wrap(this.localCards)
		//		if (tween.data) this.debugTweenData(text, tween.data[0])
		// for (const card of this.cards) {
		// 	card.modelRotation.x += 0.0011
		// 	card.modelRotation.y += 0.0014
		// 	card.modelRotation.z += 0.0017
		// 	//			card.rotateX(0.3)
		// 	// card.rotateX = () => card.rotateX() + 0.2
		// 	// card.rotateY = () => card.rotateY() + 0.3
		// }
	}

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
