import { Box, Container, Stack } from "@mui/material"
import type { PropsWithChildren } from "react"

const CenterComponents = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Container component="main" maxWidth="xs">
				<Box display="flex" justifyContent="center" alignItems="center" height="90vh">
					<Stack
						spacing={2}
						// divider={<Divider orientation="horizontal" flexItem />}
						alignItems={"center"}
					>
						{children}
					</Stack>
				</Box>
			</Container>
		</>
	)
}

export default CenterComponents
