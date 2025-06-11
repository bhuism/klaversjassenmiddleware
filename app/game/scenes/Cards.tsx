import { cards } from "~/components/common/PlayingCard"
import type { Card, CardNr, DefaultApi, Game, Suit } from ".generated-sources/openapi"

export class Cards extends Phaser.Scene {
	localCards: Phaser.GameObjects.Image[] = []
	cardApi: DefaultApi
	gameState: Game
	targets: Phaser.Math.Vector2[] = []
	saveCardDragVector: Phaser.Math.Vector2 | undefined
	//const cards: Phaser.GameObjects.Image[] = []

	gameWidth = 0
	gameHeight = 0

	constructor(cardApi: DefaultApi, gameState: Game) {
		super("Cards")
		this.cardApi = cardApi
		this.gameState = gameState

		if (this.gameState.trump.length === 32) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error("No game / completed")
			throw new Error("No game / completed")
		}
	}

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
		this.showBar()
		Object.keys(cards).forEach((key) => {
			this.load.image(key, cards[key])
		})
	}

	create() {
		this.gameWidth = this.game.config.width as number
		this.gameHeight = this.game.config.height as number
		this.showPlayerCards()
	}

	showPlayerCards() {
		const center = new Phaser.Math.Vector2(
			(this.game.config.width as number) / 2,
			(this.game.config.height as number) / 2
		)

		const zone = this.add.zone(center.x, center.y, 0, 0).setCircleDropZone(this.gameWidth / 12)

		for (let index = 0; index < 32; index++) {
			// tune this, trust me
			const xspaver = 12
			// tune this, truste me
			const yspaver = 13

			const spreadX = this.gameWidth / xspaver
			const spreadY = this.gameHeight / yspaver

			const currentCard = this.gameState.playerCard.filter((pc) => pc.player === Math.floor(index / 8))[index % 8].card

			const card = this.add.image(center.x, center.y, convertToImageName(currentCard))

			card.setScale(this.gameWidth / 2100)
			card.setDepth(-index)
			card.setTint(0x909090)

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
				target.set(
					this.gameWidth - spreadX * (index % 8) - spreadX * ((xspaver - 7) / 2),
					this.gameHeight - spreadY * 0.5
				)
				card.setInteractive(new Phaser.Geom.Rectangle(0, 0, 240, 336), Phaser.Geom.Rectangle.Contains)
				this.input.setDraggable(card)
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
				...{
					delay: index * 100,
					targets: card,
					x: target.x,
					y: target.y,
					ease: "Bounce.easeOut",
					duration: 1000 + Math.random() * 1000,
				},
				...(index === 31
					? {
							onComplete: () => {
								const graphics1 = this.add.graphics()
								graphics1.fillStyle(3, 0x40ff07)
								graphics1.fillCircle(zone.x, zone.y, zone.input?.hitArea.radius)
								const graphics2 = this.add.graphics()
								graphics2.lineStyle(2, 0xffff00)
								graphics2.strokeCircle(zone.x, zone.y, zone.input?.hitArea.radius)
								this.showNames()
							},
						}
					: []),
			})

			this.localCards.push(card)
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
		})

		this.input.on("dragleave", (_pointer: unknown, gameObject: Phaser.GameObjects.Image) => {
			gameObject.setTint(0xd0d0d0)
		})

		// this.input.on("dragend", () => {
		// 	graphics.clear()
		// 	graphics.lineStyle(3, 0xffff00)
		// 	graphics.strokeCircle(zone.x, zone.y, zone.input?.hitArea.radius)
		// })

		this.input.on("dragend", (_pointer: unknown, gameObject: Phaser.GameObjects.Image, dropped: boolean) => {
			if (!dropped) {
				gameObject.setTint(0xa0a0a0)
				this.tweens.add({
					targets: gameObject,
					ease: "Quint.easeOut",
					x: this.saveCardDragVector?.x,
					y: this.saveCardDragVector?.y,
					duration: 500,
				})
			} else {
				this.cardApi.playCard(this.gameState.id, { card: "Ace", color: "Hearts" })
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
			return this.make
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
				.setOrigin(0.5, 0.5)
		}

		printName(this.gameWidth / 8, this.gameHeight / 2, "naam1", Math.PI / 2)
		printName(this.gameWidth / 2, this.gameHeight / 4, "naam2", 0)
		printName(this.gameWidth - this.gameWidth / 8, this.gameHeight / 2, "naam3", -Math.PI / 2)
	}

	update(_time: number, _delta: number) {}
}
function convertToImageName(card: Card) {
	const cardNrMap: Record<CardNr, string> = {
		Ace: "A",
		King: "K",
		Queen: "Q",
		Jack: "J",
		Ten: "T",
		Nine: "9",
		Eight: "8",
		Seven: "7",
	}

	const suiteMap: Record<Suit, string> = {
		Clubs: "c",
		Hearts: "h",
		Diamonds: "d",
		Spades: "s",
	}

	return cardNrMap[card.card] + suiteMap[card.color]
}
