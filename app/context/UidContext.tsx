import React from "react"
import type { User } from ".generated-sources/openapi"

interface UidContextProps {
	user?: User
}

const UidContext = React.createContext<UidContextProps>({})

export default UidContext
