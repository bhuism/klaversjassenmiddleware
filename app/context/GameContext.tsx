import { createContext } from "react"
import type { Game } from ".generated-sources/openapi"

export const GameContext = createContext<Game | undefined>(undefined)
