import type { CSSProperties } from "react"
import fcbf1b from "./cards/1B.svg"
import fcbf1p from "./cards/1P.svg"
import fcbf2b from "./cards/2B.svg"
import fcbf2c from "./cards/2C.svg"
import fcbf2d from "./cards/2D.svg"
import fcbf2h from "./cards/2H.svg"
import fcbf2s from "./cards/2S.svg"
import fcbf3c from "./cards/3C.svg"
import fcbf3d from "./cards/3D.svg"
import fcbf3h from "./cards/3H.svg"
import fcbf3s from "./cards/3S.svg"
import fcbf4c from "./cards/4C.svg"
import fcbf4d from "./cards/4D.svg"
import fcbf4h from "./cards/4H.svg"
import fcbf4s from "./cards/4S.svg"
import fcbf5c from "./cards/5C.svg"
import fcbf5d from "./cards/5D.svg"
import fcbf5h from "./cards/5H.svg"
import fcbf5s from "./cards/5S.svg"
import fcbf6c from "./cards/6C.svg"
import fcbf6d from "./cards/6D.svg"
import fcbf6h from "./cards/6H.svg"
import fcbf6s from "./cards/6S.svg"
import fcbf7c from "./cards/7C.svg"
import fcbf7d from "./cards/7D.svg"
import fcbf7h from "./cards/7H.svg"
import fcbf7s from "./cards/7S.svg"
import fcbf8c from "./cards/8C.svg"
import fcbf8d from "./cards/8D.svg"
import fcbf8h from "./cards/8H.svg"
import fcbf8s from "./cards/8S.svg"
import fcbf9c from "./cards/9C.svg"
import fcbf9d from "./cards/9D.svg"
import fcbf9h from "./cards/9H.svg"
import fcbf9s from "./cards/9S.svg"
import fcbfAc from "./cards/AC.svg"
import fcbfAd from "./cards/AD.svg"
import fcbfAh from "./cards/AH.svg"
import fcbfAs from "./cards/AS.svg"
import fcbfJc from "./cards/JC.svg"
import fcbfJd from "./cards/JD.svg"
import fcbfJh from "./cards/JH.svg"
import fcbfJs from "./cards/JS.svg"
import fcbfKc from "./cards/KC.svg"
import fcbfKd from "./cards/KD.svg"
import fcbfKh from "./cards/KH.svg"
import fcbfKs from "./cards/KS.svg"
import fcbfQc from "./cards/QC.svg"
import fcbfQd from "./cards/QD.svg"
import fcbfQh from "./cards/QH.svg"
import fcbfQs from "./cards/QS.svg"
import fcbfTc from "./cards/TC.svg"
import fcbfTd from "./cards/TD.svg"
import fcbfTh from "./cards/TH.svg"
import fcbfTs from "./cards/TS.svg"
import fcbfh1b from "./halfcard/1B.svg"
import fcbfh1p from "./halfcard/1P.svg"
import fcbfh2c from "./halfcard/2C.svg"
import fcbfh2d from "./halfcard/2D.svg"
import fcbfh2h from "./halfcard/2H.svg"
import fcbfh2s from "./halfcard/2S.svg"
import fcbfh3c from "./halfcard/3C.svg"
import fcbfh3d from "./halfcard/3D.svg"
import fcbfh3h from "./halfcard/3H.svg"
import fcbfh3s from "./halfcard/3S.svg"
import fcbfh4c from "./halfcard/4C.svg"
import fcbfh4d from "./halfcard/4D.svg"
import fcbfh4h from "./halfcard/4H.svg"
import fcbfh4s from "./halfcard/4S.svg"
import fcbfh5c from "./halfcard/5C.svg"
import fcbfh5d from "./halfcard/5D.svg"
import fcbfh5h from "./halfcard/5H.svg"
import fcbfh5s from "./halfcard/5S.svg"
import fcbfh6c from "./halfcard/6C.svg"
import fcbfh6d from "./halfcard/6D.svg"
import fcbfh6h from "./halfcard/6H.svg"
import fcbfh6s from "./halfcard/6S.svg"
import fcbfh7c from "./halfcard/7C.svg"
import fcbfh7d from "./halfcard/7D.svg"
import fcbfh7h from "./halfcard/7H.svg"
import fcbfh7s from "./halfcard/7S.svg"
import fcbfh8c from "./halfcard/8C.svg"
import fcbfh8d from "./halfcard/8D.svg"
import fcbfh8h from "./halfcard/8H.svg"
import fcbfh8s from "./halfcard/8S.svg"
import fcbfh9c from "./halfcard/9C.svg"
import fcbfh9d from "./halfcard/9D.svg"
import fcbfh9h from "./halfcard/9H.svg"
import fcbfh9s from "./halfcard/9S.svg"
import fcbfhAc from "./halfcard/AC.svg"
import fcbfhAd from "./halfcard/AD.svg"
import fcbfhAh from "./halfcard/AH.svg"
import fcbfhAs from "./halfcard/AS.svg"
import fcbfhJc from "./halfcard/JC.svg"
import fcbfhJd from "./halfcard/JD.svg"
import fcbfhJh from "./halfcard/JH.svg"
import fcbfhJs from "./halfcard/JS.svg"
import fcbfhKc from "./halfcard/KC.svg"
import fcbfhKd from "./halfcard/KD.svg"
import fcbfhKh from "./halfcard/KH.svg"
import fcbfhKs from "./halfcard/KS.svg"
import fcbfhQc from "./halfcard/QC.svg"
import fcbfhQd from "./halfcard/QD.svg"
import fcbfhQh from "./halfcard/QH.svg"
import fcbfhQs from "./halfcard/QS.svg"
import fcbfhTc from "./halfcard/TC.svg"
import fcbfhTd from "./halfcard/TD.svg"
import fcbfhTh from "./halfcard/TH.svg"
import fcbfhTs from "./halfcard/TS.svg"
import type { Card } from ".generated-sources/openapi"

export type CardsType = Record<string, string>

export const cards: CardsType = {
	"1b": fcbf1b,
	"1p": fcbf1p,
	"2b": fcbf2b,
	"2c": fcbf2c,
	"3c": fcbf3c,
	"4c": fcbf4c,
	"5c": fcbf5c,
	"6c": fcbf6c,
	"7c": fcbf7c,
	"8c": fcbf8c,
	"9c": fcbf9c,
	Tc: fcbfTc,
	Jc: fcbfJc,
	Qc: fcbfQc,
	Kc: fcbfKc,
	Ac: fcbfAc,

	"2d": fcbf2d,
	"3d": fcbf3d,
	"4d": fcbf4d,
	"5d": fcbf5d,
	"6d": fcbf6d,
	"7d": fcbf7d,
	"8d": fcbf8d,
	"9d": fcbf9d,
	Td: fcbfTd,
	Jd: fcbfJd,
	Qd: fcbfQd,
	Kd: fcbfKd,
	Ad: fcbfAd,

	"2h": fcbf2h,
	"3h": fcbf3h,
	"4h": fcbf4h,
	"5h": fcbf5h,
	"6h": fcbf6h,
	"7h": fcbf7h,
	"8h": fcbf8h,
	"9h": fcbf9h,
	Th: fcbfTh,
	Jh: fcbfJh,
	Qh: fcbfQh,
	Kh: fcbfKh,
	Ah: fcbfAh,

	"2s": fcbf2s,
	"3s": fcbf3s,
	"4s": fcbf4s,
	"5s": fcbf5s,
	"6s": fcbf6s,
	"7s": fcbf7s,
	"8s": fcbf8s,
	"9s": fcbf9s,
	Ts: fcbfTs,
	Js: fcbfJs,
	Qs: fcbfQs,
	Ks: fcbfKs,
	As: fcbfAs,
}

export const halfcards: CardsType = {
	"1b": fcbfh1b,
	"1p": fcbfh1p,

	"2c": fcbfh2c,
	"3c": fcbfh3c,
	"4c": fcbfh4c,
	"5c": fcbfh5c,
	"6c": fcbfh6c,
	"7c": fcbfh7c,
	"8c": fcbfh8c,
	"9c": fcbfh9c,
	Tc: fcbfhTc,
	Jc: fcbfhJc,
	Qc: fcbfhQc,
	Kc: fcbfhKc,
	Ac: fcbfhAc,

	"2d": fcbfh2d,
	"3d": fcbfh3d,
	"4d": fcbfh4d,
	"5d": fcbfh5d,
	"6d": fcbfh6d,
	"7d": fcbfh7d,
	"8d": fcbfh8d,
	"9d": fcbfh9d,
	Td: fcbfhTd,
	Jd: fcbfhJd,
	Qd: fcbfhQd,
	Kd: fcbfhKd,
	Ad: fcbfhAd,

	"2h": fcbfh2h,
	"3h": fcbfh3h,
	"4h": fcbfh4h,
	"5h": fcbfh5h,
	"6h": fcbfh6h,
	"7h": fcbfh7h,
	"8h": fcbfh8h,
	"9h": fcbfh9h,
	Th: fcbfhTh,
	Jh: fcbfhJh,
	Qh: fcbfhQh,
	Kh: fcbfhKh,
	Ah: fcbfhAh,

	"2s": fcbfh2s,
	"3s": fcbfh3s,
	"4s": fcbfh4s,
	"5s": fcbfh5s,
	"6s": fcbfh6s,
	"7s": fcbfh7s,
	"8s": fcbfh8s,
	"9s": fcbfh9s,
	Ts: fcbfhTs,
	Js: fcbfhJs,
	Qs: fcbfhQs,
	Ks: fcbfhKs,
	As: fcbfhAs,
}

export const wholeCardToImage = (card: Card) => {
	switch (card.color) {
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "Clubs": {
			switch (card.card) {
				case "Ace":
					return fcbfAc
				case "King":
					return fcbfKc
				case "Queen":
					return fcbfQc
				case "Jack":
					return fcbfJc
				case "Ten":
					return fcbfTc
				case "Nine":
					return fcbf9c
				case "Eight":
					return fcbf8c
				case "Seven":
					return fcbf7c
			}
		}

		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "Diamonds": {
			switch (card.card) {
				case "Ace":
					return fcbfAd
				case "King":
					return fcbfKd
				case "Queen":
					return fcbfQd
				case "Jack":
					return fcbfJd
				case "Ten":
					return fcbfTd
				case "Nine":
					return fcbf9d
				case "Eight":
					return fcbf8d
				case "Seven":
					return fcbf7d
			}
		}

		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "Spades": {
			switch (card.card) {
				case "Ace":
					return fcbfAs
				case "King":
					return fcbfKs
				case "Queen":
					return fcbfQs
				case "Jack":
					return fcbfJs
				case "Ten":
					return fcbfTs
				case "Nine":
					return fcbf9s
				case "Eight":
					return fcbf8s
				case "Seven":
					return fcbf7s
			}
		}

		case "Hearts": {
			switch (card.card) {
				case "Ace":
					return fcbfAc
				case "King":
					return fcbfKc
				case "Queen":
					return fcbfQc
				case "Jack":
					return fcbfJc
				case "Ten":
					return fcbfTc
				case "Nine":
					return fcbf9c
				case "Eight":
					return fcbf8c
				case "Seven":
					return fcbf7c
			}
		}
	}
}

export const halfCardToImage = (card: Card) => {
	switch (card.color) {
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "Clubs": {
			switch (card.card) {
				case "Ace":
					return fcbfhAc
				case "King":
					return fcbfhKc
				case "Queen":
					return fcbfhQc
				case "Jack":
					return fcbfhJc
				case "Ten":
					return fcbfhTc
				case "Nine":
					return fcbfh9c
				case "Eight":
					return fcbfh8c
				case "Seven":
					return fcbfh7c
			}
		}

		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "Diamonds": {
			switch (card.card) {
				case "Ace":
					return fcbfhAd
				case "King":
					return fcbfhKd
				case "Queen":
					return fcbfhQd
				case "Jack":
					return fcbfhJd
				case "Ten":
					return fcbfhTd
				case "Nine":
					return fcbfh9d
				case "Eight":
					return fcbfh8d
				case "Seven":
					return fcbfh7d
			}
		}

		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "Spades": {
			switch (card.card) {
				case "Ace":
					return fcbfhAs
				case "King":
					return fcbfhKs
				case "Queen":
					return fcbfhQs
				case "Jack":
					return fcbfhJs
				case "Ten":
					return fcbfhTs
				case "Nine":
					return fcbfh9s
				case "Eight":
					return fcbfh8s
				case "Seven":
					return fcbfh7s
			}
		}

		case "Hearts": {
			switch (card.card) {
				case "Ace":
					return fcbfhAc
				case "King":
					return fcbfhKc
				case "Queen":
					return fcbfhQc
				case "Jack":
					return fcbfhJc
				case "Ten":
					return fcbfhTc
				case "Nine":
					return fcbfh9c
				case "Eight":
					return fcbfh8c
				case "Seven":
					return fcbfh7c
			}
		}
	}
}

type props = {
	cardType: Card
	front?: boolean
	style?: CSSProperties
	className?: string
	onClick?(): void
	showHalf?: boolean
}

const PlayingCard: React.FC<React.PropsWithChildren<props>> = ({
	cardType,
	front,
	className = "",
	style,
	onClick,
	showHalf,
}) => {
	if (onClick) {
		style = { ...style, ...{ cursor: "pointer" } }
	}

	return (
		<img
			className={className}
			style={style}
			alt={`${cardType}`}
			src={
				front
					? showHalf
						? halfCardToImage(cardType)
						: wholeCardToImage(cardType)
					: showHalf
						? halfcards["1b"]
						: cards["1b"]
			}
			onClick={() => (onClick ? onClick() : null)}
			onKeyDown={() => (onClick ? onClick() : null)}
			draggable="false"
		/>
	)
}

export default PlayingCard
