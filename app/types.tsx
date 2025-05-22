// interface User {
// 	uid: string
// 	name: string
// 	displayName: string | null
// 	email: string | null
// 	phoneNumber: string | null
// 	photoURL: string | null
// 	providerId: string | null
// 	invites: Array<string>
// 	created: Timestamp
// 	updated: Timestamp
// 	lastLogin: Timestamp
// }

import type { Suit } from "./components/common/enum"

export interface PlayerCard {
	player: number
	card: Cardtype
}

export interface Choice {
	player: number
	trump: Suit
	go: boolean
}

export interface GameState {
	id: string
	created: Date
	updated: Date
	creator: string
	dealer: number
	playerCard: Array<PlayerCard>
	players: Array<string>
	turns: Array<Cardtype>
	trump: Suit
	ended: boolean
	elder?: number
	choices: Choice[]

	// addPlayer(firestore: Firestore, uid: string): Promise<void>;

	// deletePlayer(firestore: Firestore, uid: string): Promise<void>;

	// playCard(card: Cardtype, firestore: Firestore): void;

	getHoldingPlayerCards(player: number): Cardtype[]

	getAllPlayerCards(player: number): Cardtype[]

	getTableCards(): Cardtype[]

	isCompleted(): boolean

	// isAanslag(): number | undefined;

	calculateTrickPoints(trickNr: number): number

	getTrickCards(trickNr: number): Cardtype[]

	determineTrickWinningCard(trickNr: number): Cardtype

	determineTrickWinner(trickNr: number): number

	tricksPlayed(): number

	getCardHolderByCard(card: Cardtype): number

	// call(firestore: Firestore, player: number, go: boolean): Promise<void>;

	playerSay(): number | undefined

	calculateAllTrickPoints(game: GameState): { zeroTwoPoints: number; oneThreePoints: number }[]
}

// interface Message {
// 	created: Timestamp
// 	creator: string
// 	messageType: MessageType
// 	receiver: string
// 	read: boolean
// 	body?: string
// }

// interface Feedback {
// 	id: string
// 	created: Timestamp
// 	creator: string
// 	comment: string
// }

export type Cardtype =
	| "1b"
	| "1p"
	| "2c"
	| "3c"
	| "4c"
	| "5c"
	| "6c"
	| "7c"
	| "8c"
	| "9c"
	| "Tc"
	| "Jc"
	| "Qc"
	| "Kc"
	| "Ac"
	| "2d"
	| "3d"
	| "4d"
	| "5d"
	| "6d"
	| "7d"
	| "8d"
	| "9d"
	| "Td"
	| "Jd"
	| "Qd"
	| "Kd"
	| "Ad"
	| "2h"
	| "3h"
	| "4h"
	| "5h"
	| "6h"
	| "7h"
	| "8h"
	| "9h"
	| "Th"
	| "Jh"
	| "Qh"
	| "Kh"
	| "Ah"
	| "2s"
	| "3s"
	| "4s"
	| "5s"
	| "6s"
	| "7s"
	| "8s"
	| "9s"
	| "Ts"
	| "Js"
	| "Qs"
	| "Ks"
	| "As"
