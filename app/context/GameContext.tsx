import { createContext } from "react"
import type { Game } from ".generated-sources/openapi"

const GameContext = createContext<Game | undefined>(undefined)

export default GameContext
