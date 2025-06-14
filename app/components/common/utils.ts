import type { Card } from ".generated-sources/openapi"

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

export function rankRegular(cardType: Card): number {
	switch (cardType.charAt(0)) {
		case "S":
			return 1
		case "E":
			return 2
		case "N":
			return 3
		case "J":
			return 4
		case "Q":
			return 5
		case "K":
			return 6
		case "T":
			return 7
		case "A":
			return 8
		default:
			throw new Error("No such card")
	}
}

export function rankTrump(cardType: Card): number {
	switch (cardType.charAt(0)) {
		case "S":
			return 1
		case "E":
			return 2
		case "Q":
			return 3
		case "K":
			return 4
		case "T":
			return 5
		case "A":
			return 6
		case "N":
			return 7
		case "J":
			return 8
		default:
			throw new Error("No such card")
	}
}

export function pointsRegular(cardType: Card): number {
	switch (cardType.charAt(0)) {
		case "S":
			return 0
		case "E":
			return 0
		case "N":
			return 0
		case "J":
			return 2
		case "Q":
			return 3
		case "K":
			return 4
		case "T":
			return 10
		case "A":
			return 11
		default:
			throw new Error("No such card")
	}
}

export function pointsTrump(cardType: Card): number {
	switch (cardType.charAt(0)) {
		case "S":
			return 0
		case "E":
			return 0
		case "Q":
			return 3
		case "K":
			return 4
		case "T":
			return 10
		case "A":
			return 11
		case "N":
			return 14
		case "J":
			return 20
		default:
			throw new Error("No such card")
	}
}
