import {
	Box,
	CircularProgress,
	Container,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material"
import dayjs from "dayjs"
import { useNavigate } from "react-router"
import useCardApi from "~/hooks/useGameApi"
import useLoadOnce from "~/hooks/useLoadOnce"
import PlayerName from "./game/PlayerName"
import type { Game } from ".generated-sources/openapi"

const GameRow: React.FC<{ gameId: string }> = ({ gameId }) => {
	const cardApi = useCardApi()
	const navigate = useNavigate()

	const { data, error, isLoading } = useLoadOnce<Game>(() => cardApi.getGame(gameId))

	return (
		<TableRow key={gameId} onClick={() => navigate(`/game/${gameId}`)}>
			<TableCell>{gameId}</TableCell>
			{isLoading || !data || error ? (
				<TableCell>
					<CircularProgress />
				</TableCell>
			) : (
				<>
					<TableCell>
						<PlayerName playerUid={data?.creator} />
					</TableCell>
					<TableCell>{`${dayjs(new Date()).to(data.created)}`}</TableCell>
					<TableCell>{`${dayjs(new Date()).to(data.updated)}`}</TableCell>
				</>
			)}
		</TableRow>
	)
}

const Games: React.FC<{ games: Set<string> }> = ({ games }) => {
	return (
		<>
			<Container>
				<Box alignItems="center">
					<Stack
						// divider={<Divider orientation="horizontal" flexItem />}
						alignItems={"center"}
					>
						<TableContainer component={Paper}>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>Gemaakt door</TableCell>
										<TableCell>Gemaakt op</TableCell>
										<TableCell>Bijgewerkt</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{[...games].map((gameId) => (
										<GameRow key={gameId} gameId={gameId} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Stack>
				</Box>
			</Container>
		</>
	)
}

export default Games
