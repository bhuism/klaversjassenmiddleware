import type { Cardtype, Choice, GameState, PlayerCard } from "~/types.tsx"
import type { Suit } from "./enum"
import { pointsRegular, pointsTrump, rankRegular, rankTrump, suitOf } from "./utils"

class GameStateImpl implements GameState {
	readonly id: string
	readonly created: Date
	readonly updated: Date
	readonly creator: string
	readonly dealer: number
	readonly playerCard: Array<PlayerCard>
	readonly players: Array<string>
	readonly turns: Array<Cardtype>
	trump: Suit
	readonly ended: boolean
	elder: number | undefined
	choices: Choice[]

	constructor(
		id: string,
		created: Date,
		updated: Date,
		creator: string,
		dealer: number,
		playerCard: Array<PlayerCard>,
		players: Array<string>,
		turns: Array<Cardtype>,
		trump: Suit,
		ended: boolean,
		elder: number | undefined,
		choices: Choice[]
	) {
		this.id = id
		this.created = created
		this.updated = updated
		this.creator = creator
		this.dealer = dealer
		this.playerCard = playerCard
		this.players = players
		this.turns = turns
		this.trump = trump
		this.ended = ended
		this.elder = elder
		this.choices = choices
	}

	// addPlayer(firestore: Firestore, adder: string): Promise<void> {
	// 	if (this.players.length < 4) {
	// 		return updateDoc(doc(firestore, "games", this.id), {
	// 			updated: serverTimestamp(),
	// 			players: arrayUnion(adder),
	// 		}).then(() => {
	// 			this.players.push(adder)
	// 		})
	// 	} else {
	// 		return Promise.resolve()
	// 	}
	// }

	// deletePlayer(firestore: Firestore, uid: string): Promise<void> {
	// 	if (this.players.length < 4) {
	// 		return updateDoc(doc(firestore, "games", this.id), {
	// 			updated: serverTimestamp(),
	// 			players: arrayRemove(uid),
	// 		})
	// 	} else {
	// 		return Promise.resolve()
	// 	}
	// }

	whoHasCard(cardType: Cardtype): number {
		return this.playerCard
			.filter((pc) => pc.card === cardType)
			.map((pc) => pc.player)
			.pop() as number
	}

	tricksPlayed(): number {
		return (this.turns.length - (this.turns.length % 4)) / 4
	}

	// isAanslag(): number | undefined {
	// 	if (this.isCompleted()) {
	// 		return undefined
	// 	} else if (this.elder === undefined) {
	// 		return undefined
	// 	} else if (this.players.length !== 4) {
	// 		return undefined
	// 	} else {
	// 		return this.tricksPlayed() === 0
	// 			? (this.turns.length + this.dealer) % 4
	// 			: (this.determineTrickWinner(this.tricksPlayed() - 1) + this.turns.length) % 4
	// 	}
	// }

	calculateTrickPoints(trickNr: number): number {
		return (
			this.getTrickCards(trickNr)
				.map((c) => (suitOf(c) === this.trump ? pointsTrump(c) : pointsRegular(c)))
				.reduce((sum, current) => sum + current, 0) + (trickNr === 7 ? 10 : 0)
		)
	}

	getTrickCards(trickNr: number): Cardtype[] {
		return this.turns.slice(trickNr * 4, trickNr * 4 + 4)
	}

	determineTrickWinningCard(trickNr: number): Cardtype {
		if (trickNr >= this.tricksPlayed()) {
			// biome-ignore lint/style/useTemplate: <explanation>
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error("no such trick, trickNr=" + trickNr + ", trickedPlayed=" + this.tricksPlayed())
			return "1b"
		}

		let trick: Cardtype[] = this.getTrickCards(trickNr)

		if (trick.length !== 4) {
			// biome-ignore lint/style/useTemplate: <explanation>
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error("determineTrickWinningCard: " + trick)
			return "1b"
		}

		const troefAanwezig: boolean = trick.map((c) => suitOf(c)).some((s) => s === this.trump)

		const requestedSuit: Suit = suitOf(trick[0])

		if (troefAanwezig) {
			trick = trick.filter((c) => suitOf(c) === this.trump).sort((a, b) => rankTrump(a) - rankTrump(b))
		} else {
			trick = trick.filter((c) => suitOf(c) === requestedSuit).sort((a, b) => rankRegular(a) - rankRegular(b))
		}

		return trick.pop() as Cardtype
	}

	determineTrickWinner(trickNr: number): number {
		const winningCard: Cardtype = this.determineTrickWinningCard(trickNr)

		return this.whoHasCard(winningCard)
	}

	// playCard(cardType: Cardtype, firestore: Firestore): Promise<void> {
	// 	const gameRef = doc(firestore, "games", this.id)

	// 	this.turns.push(cardType)

	// 	return updateDoc(gameRef, {
	// 		updated: serverTimestamp(),
	// 		turns: arrayUnion(cardType),
	// 		ended: this.turns.length === 32,
	// 	})
	// }

	cardSort(left: Cardtype, right: Cardtype, trump: Suit): number {
		return (
			suitOf(left) - suitOf(right) ||
			(suitOf(left) === trump ? rankTrump(right) - rankTrump(left) : rankRegular(right) - rankRegular(left))
		)
	}

	getHoldingPlayerCards(player: number): Cardtype[] {
		return this.playerCard
			.filter((c) => c.player === player && !this.turns.includes(c.card))
			.map((pc) => pc.card)
			.sort((a, b) => this.cardSort(a, b, this.trump))
	}

	getAllPlayerCards(player: number): Cardtype[] {
		return this.playerCard
			.filter((c) => c.player === player)
			.map((pc) => pc.card)
			.sort((a, b) => this.cardSort(a, b, this.trump))
	}

	getCardHolderByCard(card: Cardtype): number {
		if (this.playerCard.filter((pc) => pc.player === 0 && pc.card === card).pop()) {
			return 0
		}

		if (this.playerCard.filter((pc) => pc.player === 1 && pc.card === card).pop()) {
			return 1
		}

		if (this.playerCard.filter((pc) => pc.player === 2 && pc.card === card).pop()) {
			return 2
		}

		if (this.playerCard.filter((pc) => pc.player === 3 && pc.card === card).pop()) {
			return 3
		}

		// biome-ignore lint/suspicious/noConsole: <explanation>
		// biome-ignore lint/style/useTemplate: <explanation>
		console.error("card " + card + " not found by any player")

		return -1
	}

	getTableCards(): Cardtype[] {
		return this.turns.slice(this.tricksPlayed() * 4, this.tricksPlayed() * 4 + (this.turns.length % 4))
	}

	isCompleted(): boolean {
		return this.tricksPlayed() === 8
	}

	// call(firestore: Firestore, player: number, go: boolean): Promise<void> {
	// 	const gameRef = doc(firestore, "games", this.id)

	// 	const choice: Choice = { player: player, go: go, trump: this.trump }

	// 	if (!go && this.choices && this.choices.length === 3) {
	// 		return updateDoc(gameRef, {
	// 			updated: serverTimestamp(),
	// 			trump: getRandomArbitrary(0, 3),
	// 			choices: [],
	// 		})
	// 	}

	// 	if (go) {
	// 		return updateDoc(gameRef, {
	// 			updated: serverTimestamp(),
	// 			elder: player,
	// 			choices: [],
	// 		})
	// 	}

	// 	return updateDoc(gameRef, {
	// 		updated: serverTimestamp(),
	// 		choices: arrayUnion(choice),
	// 	})
	// }

	playerSay(): number | undefined {
		if (this.players.length !== 4) {
			return undefined
		}
		if (this.elder !== undefined) {
			return undefined
		}

		return (this.dealer + 1 + this.choices.length) % 4
	}

	calculateAllTrickPoints(game: GameState): { zeroTwoPoints: number; oneThreePoints: number }[] {
		return [...Array(this.tricksPlayed())].map((_x, trickNr) => {
			const points = game.calculateTrickPoints(trickNr)

			if (this.determineTrickWinner(trickNr) % 2 === 0) {
				return { zeroTwoPoints: points, oneThreePoints: 0 }
			}
			return { zeroTwoPoints: 0, oneThreePoints: points }
		})
	}
}

export default GameStateImpl
