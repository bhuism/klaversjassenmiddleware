import { createContext } from "react"
import type { GameState } from "~/types"

const GameContext = createContext<GameState | undefined>(undefined)

export default GameContext
