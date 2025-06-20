import type { CSSProperties } from "react"
import fcbf1b from "./cards/1B.svg"
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
export const cards: Record<Card, string> = {
	// "1b": fcbf1b,
	// "1p": fcbf1p,
	// "2b": fcbf2b,
	// "2c": fcbf2c,
	// "3c": fcbf3c,
	// "4c": fcbf4c,
	// "5c": fcbf5c,
	// "6c": fcbf6c,
	Sc: fcbf7c,
	Ec: fcbf8c,
	Nc: fcbf9c,
	Tc: fcbfTc,
	Jc: fcbfJc,
	Qc: fcbfQc,
	Kc: fcbfKc,
	Ac: fcbfAc,

	// "2d": fcbf2d,
	// "3d": fcbf3d,
	// "4d": fcbf4d,
	// "5d": fcbf5d,
	// "6d": fcbf6d,
	Sd: fcbf7d,
	Ed: fcbf8d,
	Nd: fcbf9d,
	Td: fcbfTd,
	Jd: fcbfJd,
	Qd: fcbfQd,
	Kd: fcbfKd,
	Ad: fcbfAd,

	// "2h": fcbf2h,
	// "3h": fcbf3h,
	// "4h": fcbf4h,
	// "5h": fcbf5h,
	// "6h": fcbf6h,
	Sh: fcbf7h,
	Eh: fcbf8h,
	Nh: fcbf9h,
	Th: fcbfTh,
	Jh: fcbfJh,
	Qh: fcbfQh,
	Kh: fcbfKh,
	Ah: fcbfAh,

	// "2s": fcbf2s,
	// "3s": fcbf3s,
	// "4s": fcbf4s,
	// "5s": fcbf5s,
	// "6s": fcbf6s,
	Ss: fcbf7s,
	Es: fcbf8s,
	Ns: fcbf9s,
	Ts: fcbfTs,
	Js: fcbfJs,
	Qs: fcbfQs,
	Ks: fcbfKs,
	As: fcbfAs,
}

const halfcards: Record<Card, string> = {
	// "1b": fcbfh1b,
	// "1p": fcbfh1p,

	// "2c": fcbfh2c,
	// "3c": fcbfh3c,
	// "4c": fcbfh4c,
	// "5c": fcbfh5c,
	// "6c": fcbfh6c,
	Sc: fcbfh7c,
	Ec: fcbfh8c,
	Nc: fcbfh9c,
	Tc: fcbfhTc,
	Jc: fcbfhJc,
	Qc: fcbfhQc,
	Kc: fcbfhKc,
	Ac: fcbfhAc,

	// "2d": fcbfh2d,
	// "3d": fcbfh3d,
	// "4d": fcbfh4d,
	// "5d": fcbfh5d,
	// "6d": fcbfh6d,
	Sd: fcbfh7d,
	Ed: fcbfh8d,
	Nd: fcbfh9d,
	Td: fcbfhTd,
	Jd: fcbfhJd,
	Qd: fcbfhQd,
	Kd: fcbfhKd,
	Ad: fcbfhAd,

	// "2h": fcbfh2h,
	// "3h": fcbfh3h,
	// "4h": fcbfh4h,
	// "5h": fcbfh5h,
	// "6h": fcbfh6h,
	Sh: fcbfh7h,
	Eh: fcbfh8h,
	Nh: fcbfh9h,
	Th: fcbfhTh,
	Jh: fcbfhJh,
	Qh: fcbfhQh,
	Kh: fcbfhKh,
	Ah: fcbfhAh,

	// "2s": fcbfh2s,
	// "3s": fcbfh3s,
	// "4s": fcbfh4s,
	// "5s": fcbfh5s,
	// "6s": fcbfh6s,
	Ss: fcbfh7s,
	Es: fcbfh8s,
	Ns: fcbfh9s,
	Ts: fcbfhTs,
	Js: fcbfhJs,
	Qs: fcbfhQs,
	Ks: fcbfhKs,
	As: fcbfhAs,
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
	front = true,
	className = "",
	style,
	onClick,
	showHalf = false,
}) => {
	if (onClick) {
		style = { ...style, ...{ cursor: "pointer" } }
	}

	return (
		<>
			<img
				className={className}
				style={style}
				alt={`${cardType}`}
				src={front ? (showHalf ? halfcards[cardType] : cards[cardType]) : showHalf ? fcbfh1b : fcbf1b}
				onClick={() => (onClick ? onClick() : null)}
				onKeyDown={() => (onClick ? onClick() : null)}
				draggable="false"
			/>
			{/* <Typography>{`${cardType.color} ${cardType.card}`}</Typography> */}
		</>
	)
}

export default PlayingCard
