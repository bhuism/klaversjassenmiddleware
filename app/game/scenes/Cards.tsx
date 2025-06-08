export class Cards extends Phaser.Scene {
	cards: Phaser.GameObjects.Plane[] = []

	constructor() {
		super("Cards")
	}

	preload() {
		//		this.load.setBaseURL("https://cdn.phaserfiles.com/v385")
		this.load.image("bg", "/assets/gradient13.png")

		this.load.atlas("cards", "/assets/cards.png", "/assets/cards.json")
	}

	create() {
		this.add.image(400, 300, "bg")

		const frames = this.textures.get("cards").getFrameNames()

		//  Create random cards, with random rotations

		this.cards = []

		for (let i = 0; i < 64; i++) {
			const x = Phaser.Math.Between(0, 800)
			const y = Phaser.Math.Between(0, 600)

			const card = this.add.plane(x, y, "cards", Phaser.Utils.Array.GetRandom(frames))

			card.setRotation(100)

			// card.rotateX = Phaser.Math.Between(0, 360)
			// card.rotateZ = Phaser.Math.Between(0, 360)
			// card.rotateY = Phaser.Math.Between(0, 360)

			card.modelRotation.x = Phaser.Math.Between(0, 360)
			card.modelRotation.y = Phaser.Math.Between(0, 360)
			card.modelRotation.z = Phaser.Math.Between(0, 360)

			//			card.setInteractive()

			// card.on("pointerdown", () => {
			// 	card.setTint(0x00ff00)
			// })

			this.cards.unshift(card)
		}

		//this.scale.on("resize", () => console.log("resize"))
	}

	update() {
		for (const card of this.cards) {
			card.modelRotation.x += 0.0011
			card.modelRotation.y += 0.0014
			card.modelRotation.z += 0.0017
			//			card.rotateX(0.3)
			// card.rotateX = () => card.rotateX() + 0.2
			// card.rotateY = () => card.rotateY() + 0.3
		}
	}
}
