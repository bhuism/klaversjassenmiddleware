import { Stack, TextField } from "@mui/material"
import useCardApi from "~/hooks/useGameApi"
import CenterComponents from "~/utils/CenterComponents"

const MessagePage: React.FC = () => {
	const cardApi = useCardApi()

	return (
		<CenterComponents>
			<Stack>
				<TextField
					id="outlined-basic"
					label="Outlined"
					variant="outlined"
					onChange={(e) => cardApi.sendAMesage({ message: e.target.value })}
				/>
			</Stack>
		</CenterComponents>
	)
}

export default MessagePage
