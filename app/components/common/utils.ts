import type { CardNr } from ".generated-sources/openapi"

// export function shuffle<U>(array: Array<U>): Array<U> {
// 	let m = array.length
// 	let t: U
// 	let i: number

// 	// While there remain elements to shuffle…
// 	while (m) {
// 		// Pick a remaining element…
// 		i = Math.floor(Math.random() * m--)

// 		// And swap it with the current element.
// 		t = array[m]
// 		array[m] = array[i]
// 		array[i] = t
// 	}

// 	return array
// }

// export function getRandomArbitrary(min: number, max: number): number {
// 	return Math.round(Math.random() * (max - min + min))
// }

export function trickSummer(
	sum: { zeroTwoPoints: number; oneThreePoints: number },
	current: { zeroTwoPoints: number; oneThreePoints: number }
): { zeroTwoPoints: number; oneThreePoints: number } {
	return {
		zeroTwoPoints: sum.zeroTwoPoints + current.zeroTwoPoints,
		oneThreePoints: sum.oneThreePoints + current.oneThreePoints,
	}
}

// export const allCardtype: Cardtype[] = [
// 	"7c",
// 	"8c",
// 	"9c",
// 	"Tc",
// 	"Jc",
// 	"Qc",
// 	"Kc",
// 	"Ac",
// 	"7d",
// 	"8d",
// 	"9d",
// 	"Td",
// 	"Jd",
// 	"Qd",
// 	"Kd",
// 	"Ad",
// 	"7h",
// 	"8h",
// 	"9h",
// 	"Th",
// 	"Jh",
// 	"Qh",
// 	"Kh",
// 	"Ah",
// 	"7s",
// 	"8s",
// 	"9s",
// 	"Ts",
// 	"Js",
// 	"Qs",
// 	"Ks",
// 	"As",
// ]

// export function suitOf(cardType: Cardtype): Suit {
// 	switch (cardType.charAt(1)) {
// 		case "c":
// 			return Suit.Clubs
// 		case "s":
// 			return Suit.Spades
// 		case "h":
// 			return Suit.Hearts
// 		case "d":
// 			return Suit.Diamonds
// 		default:
// 			throw new Error("No such card")
// 	}
// }

export function rankRegular(cardType: CardNr): number {
	switch (cardType) {
		case "Seven":
			return 1
		case "Eight":
			return 2
		case "Nine":
			return 3
		case "Jack":
			return 4
		case "Queen":
			return 5
		case "King":
			return 6
		case "Ten":
			return 7
		case "Ace":
			return 8
		default:
			throw new Error("No such card")
	}
}

export function rankTrump(cardType: CardNr): number {
	switch (cardType) {
		case "Seven":
			return 1
		case "Eight":
			return 2
		case "Queen":
			return 3
		case "King":
			return 4
		case "Ten":
			return 5
		case "Ace":
			return 6
		case "Nine":
			return 7
		case "Jack":
			return 8
		default:
			throw new Error("No such card")
	}
}

export function pointsRegular(cardType: CardNr): number {
	switch (cardType.charAt(0)) {
		case "Seven":
			return 0
		case "Eight":
			return 0
		case "Nine":
			return 0
		case "Jack":
			return 2
		case "Queen":
			return 3
		case "Killer":
			return 4
		case "Ten":
			return 10
		case "Ace":
			return 11
		default:
			throw new Error("No such card")
	}
}

export function pointsTrump(cardType: CardNr): number {
	switch (cardType.charAt(0)) {
		case "7":
			return 0
		case "8":
			return 0
		case "Q":
			return 3
		case "K":
			return 4
		case "T":
			return 10
		case "A":
			return 11
		case "9":
			return 14
		case "J":
			return 20
		default:
			throw new Error("No such card")
	}
}
