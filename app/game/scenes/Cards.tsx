import type { EnqueueSnackbar } from "notistack"
import { cards } from "~/components/common/PlayingCard"
import type { Card, DefaultApi, Game, User } from ".generated-sources/openapi"

export class Cards extends Phaser.Scene {
	cardApi: DefaultApi
	gameState: Game
	targets: Phaser.Math.Vector2[] = []
	saveCardDragVector: Phaser.Math.Vector2 | undefined
	goHome: () => void
	user: User
	enqueueSnackbar: EnqueueSnackbar
	gameCompleted: () => void

	gameWidth = 0
	gameHeight = 0

	constructor(
		cardApi: DefaultApi,
		gameState: Game,
		goHome: () => void,
		user: User,
		enqueueSnackbar: EnqueueSnackbar,
		gameCompleted: () => void
	) {
		super("Cards")
		this.cardApi = cardApi
		this.gameState = gameState
		this.goHome = goHome
		this.user = user
		this.enqueueSnackbar = enqueueSnackbar
		this.gameCompleted = gameCompleted

		if (this.gameState.trump.length === 32) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error("No game / completed")
			throw new Error("No game / completed")
		}
	}

	playCard() {}

	init() {
		// this.gameState = this.registry.get("gameState")
		// this.cardApi = this.registry.get("cardApi")
	}

	showBar() {
		const progressBar = this.add.graphics()
		const progressBox = this.add.graphics()

		const width = this.game.config.width as number
		const height = this.game.config.height as number

		progressBox.fillStyle(0x222222, 0.8)
		progressBox.fillRect(width / 2 - 320 / 2, height / 2 - 25, 320, 50)

		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: "Loading...",
			style: {
				font: "20px monospace",
				color: "#ffffff",
			},
		})
		loadingText.setOrigin(0.5, 0.5)

		const percentText = this.make.text({
			x: width / 2,
			y: height / 2,
			text: "0%",
			style: {
				font: "18px monospace",
				color: "#ffffff",
			},
		})
		percentText.setOrigin(0.5, 0.5)

		const assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 70,
			text: "",
			style: {
				font: "18px monospace",
				color: "#ffffff",
			},
		})
		assetText.setOrigin(0.5, 0.5)

		this.load.on("progress", (value: string) => {
			const intValue = Number.parseFloat(value)
			percentText.setText(`${Math.round(intValue * 100)}%`)
			progressBar.clear()
			progressBar.fillStyle(0xffffff, 1)
			progressBar.fillRect(width / 2 - 320 / 2 + 10, height / 2 - 15, 300 * intValue, 30)
		})

		this.load.on("fileprogress", (file: { key: string }) => {
			assetText.setText(`Loading asset: ${file.key}`)
		})

		this.load.on("complete", () => {
			progressBar.destroy()
			progressBox.destroy()
			loadingText.destroy()
			percentText.destroy()
			assetText.destroy()
		})
	}

	preload() {
		this.gameWidth = this.game.config.width as number
		this.gameHeight = this.game.config.height as number

		this.showBar()

		// // load all cards
		Object.keys(cards).forEach((key) => {
			this.load.svg(key, `/assets/cards/${key.toUpperCase()}.svg`, {
				scale: Math.min(this.gameWidth, this.gameHeight) / 15,
			})
		})

		this.load.svg("home", "/assets/home.svg", { scale: this.gameHeight / 400 })
	}

	create() {
		this.gameWidth = this.game.config.width as number
		this.gameHeight = this.game.config.height as number
		this.showPlayerCards()
		this.showHomeButton()
		this.showNames()
	}

	showHomeButton() {
		const xy = Math.min(this.gameWidth, this.gameHeight) / 14
		const sprite = this.add.image(xy, xy, "home").setInteractive()

		sprite.setAlpha(0)

		const test = this.goHome

		sprite.on("pointerdown", () => {
			test()
		})

		this.tweens.add({
			targets: sprite,
			alpha: 1,
			duration: 2000,
			delay: 2000,
		})

		sprite.on("pointerover", () => {
			this.tweens.add({
				targets: sprite,
				scale: 1.4,
				duration: 500,
				ease: "Bounce.easeOut",
			})
		})

		sprite.on("pointerout", () => {
			sprite.setScale(1)
			this.tweens.killTweensOf(sprite)
		})
	}

	showPlayerCards() {
		const center = new Phaser.Math.Vector2(
			(this.game.config.width as number) / 2,
			(this.game.config.height as number) / 2
		)

		const circleRadius = this.gameWidth / 12

		const zone = this.add.zone(center.x, center.y, 0, 0).setCircleDropZone(circleRadius)

		const graphics1 = this.add
			.graphics()
			//		graphics1.fillStyle(0x00008b)
			.fillStyle(0x000069)
			.fillCircle(zone.x, zone.y, zone.input?.hitArea.radius)
			.setDepth(-100)
			.setAlpha(0)
		this.tweens.add({
			targets: graphics1,
			alpha: 1,
			duration: 2000,
			delay: 2000,
		})

		const graphics2 = this.add
			.graphics()
			.lineStyle(3, 0xffff00)
			.strokeCircle(zone.x, zone.y, zone.input?.hitArea.radius)
			.setDepth(-200)
			.setAlpha(0)
		this.tweens.add({
			targets: graphics2,
			alpha: 1,
			duration: 2000,
			delay: 2000,
		})

		//		const circleGameObject = this.add.circle(zone.x, zone.y, zone.input?.hitArea.radius, 0xff0000).setDepth(-200)

		//	const test = Phaser.Geom.Circle(zone.x, zone.y, zone.input?.hitArea.radius)

		for (let index = 0; index < 32; index++) {
			// tune this, trust me
			const xspaver = 12
			// tune this, truste me
			const yspaver = 13

			const spreadX = this.gameWidth / xspaver
			const spreadY = this.gameHeight / yspaver

			const currentCard = this.gameState.playerCard.filter((pc) => pc.player === Math.floor(index / 8))[index % 8].card

			if (this.gameState.turns.indexOf(currentCard) !== -1) {
				continue
			}

			const card = this.add.image(center.x, center.y, currentCard)

			card.setInteractive()
			this.input.setDraggable(card)
			card.setDepth(-index)
			card.setTint(0xb0b0b0)
			card.setName(currentCard)
			card.setAlpha(0)

			this.tweens.add({
				targets: card,
				delay: index * 100,
				duration: 500,
				alpha: 1,
			})

			//			card.setOrigin(0)
			//			card.setScale(this.gameWidth / 2)

			if ((index >= 8 && index < 16) || (index >= 24 && index < 32)) {
				this.tweens.add({
					delay: index * 100,
					targets: card,
					// angle: "+=90",
					rotation: `+=${Math.PI * 1.5}`,
					duration: Math.random() * 500 + 500,
				})
			} else {
				this.tweens.add({
					delay: index * 100,
					targets: card,
					//					angle: "+=180",
					rotation: `+=${Math.PI * 2}`,
					duration: Math.random() * 500 + 500,
				})
			}

			const target = new Phaser.Math.Vector2()

			if (index < 8) {
				target.set(
					this.gameWidth - spreadX * (index % 8) - spreadX * ((xspaver - 7) / 2),
					this.gameHeight - spreadY * 0.5
				)
				//				card.setInteractive(new Phaser.Geom.Rectangle(0, 0, 240, 336), Phaser.Geom.Rectangle.Contains)
				this.targets[index] = target.clone()
			} else if (index < 16) {
				target.set(spreadX * 0, this.gameHeight - spreadY * (index % 8) - spreadY * ((yspaver - 7) / 2))
			} else if (index < 24) {
				target.set(spreadX * (index % 8) + spreadX * ((xspaver - 7) / 2), spreadY * 0.5)
			} else if (index < 32) {
				target.set(this.gameWidth - spreadX * 0, spreadY * (index % 8) + spreadY * ((yspaver - 7) / 2))
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
		}

		this.input.on("dragstart", (_pointer: unknown, gameObject: Phaser.GameObjects.Image) => {
			gameObject.setTint(0xd0d0d0)
		})

		this.input.on(
			"dragstart",
			(_pointer: unknown, gameObject: Phaser.GameObjects.Image) => {
				this.saveCardDragVector = new Phaser.Math.Vector2(gameObject.x, gameObject.y)
			},
			this
		)

		this.input.on(
			"dragstart",
			(_pointer: unknown, gameObject: Phaser.GameObjects.Image) => {
				this.children.bringToTop(gameObject)
			},
			this
		)

		this.input.on("drag", (_pointer: unknown, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
			gameObject.x = dragX
			gameObject.y = dragY
		})

		this.input.on("dragenter", (_pointer: unknown, gameObject: Phaser.GameObjects.Image) => {
			gameObject.clearTint()
			this.tweens.add({
				duration: 100,
				ease: "Back.sineInOut",
				targets: graphics1,
				alpha: 0.35,
			})
			this.tweens.add({
				duration: 100,
				ease: "Back.sineInOut",
				targets: graphics2,
				alpha: 0.35,
			})
		})

		this.input.on("dragleave", (_pointer: unknown, gameObject: Phaser.GameObjects.Image) => {
			gameObject.setTint(0xd0d0d0)
			graphics1.setAlpha(1)
			graphics2.setAlpha(1)
		})

		// this.input.on("dragend", () => {
		// 	graphics.clear()
		// 	graphics.lineStyle(3, 0xffff00)
		// 	graphics.strokeCircle(zone.x, zone.y, zone.input?.hitArea.radius)
		// })

		this.input.on("dragend", (_pointer: unknown, gameObject: Phaser.GameObjects.Image, dropped: boolean) => {
			if (!dropped) {
				gameObject.disableInteractive()
				gameObject.setTint(0xb0b0b0)
				this.tweens.add({
					targets: gameObject,
					ease: "Bounce.easeOut",
					x: this.saveCardDragVector?.x,
					y: this.saveCardDragVector?.y,
					duration: 1000,
					onComplete: () => gameObject.setInteractive(),
				})

				this.tweens.add({
					targets: gameObject,
					ease: "Sine.easeInOut",
					rotation: `+=${Math.PI * 2}`,
					duration: 500,
				})
			} else {
				this.cardApi.playCard(this.gameState.id, { card: gameObject.name as Card }).then((newGame) => {
					this.enqueueSnackbar(`You played ${gameObject.name}`, { variant: "success" })
					gameObject.setActive(false)
					gameObject.setVisible(false)
					gameObject.destroy()
					if (newGame.turns.length === 32) {
						this.gameCompleted()
					}
				})
			}

			this.saveCardDragVector = undefined
		})

		// this.input.on("dragenter", () => {
		// 	graphics.clear()
		// 	graphics.lineStyle(2, 0xff8040)
		// 	graphics.strokeCircle(zone.x, zone.y, zone.input?.hitArea.radius + 3)
		// })

		// this.input.on("dragleave", () => {
		// 	graphics.clear()
		// 	graphics.lineStyle(3, 0xffff00)
		// 	graphics.strokeCircle(zone.x, zone.y, zone.input?.hitArea.radius)
		// })
	}

	showNames() {
		const printName = (x: number, y: number, text: string, rotation: number): Phaser.GameObjects.Text => {
			const textObject = this.make
				.text({
					x,
					y,
					text,
					rotation,
					style: {
						font: "20px monospace",
						color: "#ffffff",
					},
				})
				.setDepth(-1000)
				.setOrigin(0.5, 0.5)
				.setAlpha(0)

			this.tweens.add({
				targets: textObject,
				alpha: 1,
				duration: 2000 + Math.random() * 1000,
				delay: 2000 + Math.random() * 1000,
			})

			return textObject
		}

		const start = this.gameState.players.map((p) => p.id).indexOf(this.user.id)
		let index = start + 1
		printName(this.gameWidth / 10, this.gameHeight / 2, this.gameState.players[index % 4].displayName, Math.PI / 2)
		index++
		printName(this.gameWidth / 2, this.gameHeight / 4, this.gameState.players[index % 4].displayName, 0)
		index++
		printName(
			this.gameWidth - this.gameWidth / 10,
			this.gameHeight / 2,
			this.gameState.players[index % 4].displayName,
			-Math.PI / 2
		)
	}

	update(_time: number, _delta: number) {}
}
