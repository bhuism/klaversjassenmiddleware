import { createSvgIcon } from "@mui/material"
import type React from "react"
import type { Suit } from ".generated-sources/openapi"
//import { Suit } from "../common/enum"

const ClubIcon = createSvgIcon(
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		className="bi bi-suit-club-fill"
		viewBox="0 0 16 16"
	>
		<path d="M11.5 12.5a3.5 3.5 0 0 1-2.684-1.254 20 20 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a20 20 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5" />
	</svg>,
	"Club"
)

const SuitImage: React.FC<React.PropsWithChildren<{ suit: Suit }>> = ({ suit }) => {
	switch (suit) {
		case "Clubs":
			return <ClubIcon />
		case "Diamonds":
			return <ClubIcon />
		case "Hearts":
			return <ClubIcon />
		case "Spades":
			return <ClubIcon />
	}
}

export default SuitImage
