import { type GameObjects, Scene } from "phaser"

export class MainMenu extends Scene {
	background: GameObjects.Image | undefined
	logo: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined
	title: GameObjects.Text | undefined
	logoTween: Phaser.Tweens.Tween | null = null

	constructor() {
		super("MainMenu")
	}

	preload() {
		this.load.image("red", "/assets/red.png")
	}

	create() {
		this.background = this.add.image(512, 384, "background")

		//    this.logo = this.add.image(512, 300, "logo").setDepth(100);

		//    const test = this.physics.add.image(512, 300, "logo").setDepth(100);

		this.logo = this.physics.add.image(512, 300, "logo").setDepth(100)

		this.physics.world.setFPS(50)

		this.logo.setVelocity(100, 200)
		this.logo.setBounce(1, 1)
		this.logo.setCollideWorldBounds(true)

		// const particles = this.add.particles(0, 0, "red", {
		//   speed: 100,
		//   scale: { start: 1, end: 0 },
		//   blendMode: "ADD",
		// });

		// particles.startFollow(this.logo);

		this.title = this.add
			.text(512, 460, "Main Menu", {
				fontFamily: "Arial Black",
				fontSize: 38,
				color: "#ffffff",
				stroke: "#000000",
				strokeThickness: 8,
				align: "center",
			})
			.setOrigin(0.5)
			.setDepth(100)
	}

	moveLogo(callback: ({ x, y }: { x: number; y: number }) => void) {
		if (this.logoTween) {
			if (this.logoTween.isPlaying()) {
				this.logoTween.pause()
			} else {
				this.logoTween.play()
			}
		} else {
			this.logoTween = this.tweens.add({
				targets: this.logo,
				x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
				y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
				yoyo: true,
				repeat: -1,
				onUpdate: () => {
					if (callback && this.logo) {
						callback({
							x: Math.floor(this.logo.x),
							y: Math.floor(this.logo.y),
						})
					}
				},
			})
		}
	}
}
