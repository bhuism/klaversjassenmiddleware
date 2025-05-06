import { createTheme } from "@mui/material/styles"

const theme = createTheme({
	colorSchemes: { dark: true },
	//colorSchemes: { light: true, dark: true },
	// prevent FOUC
	cssVariables: {
		colorSchemeSelector: "class",
	},
	// transitions: {
	//   create: () => "none",
	// },
	// components: {
	//   MuiButtonBase: {
	//     defaultProps: {
	//       disableRipple: true,
	//     },
	//   },
	// },
})

export default theme
