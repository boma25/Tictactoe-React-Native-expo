/**
 * /* eslint-disable prettier/prettier
 *
 * @format
 */

/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Dimensions,
	Alert,
} from "react-native"

const height = Dimensions.get("window").height

class Game extends Component {
	constructor(props) {
		super()
		this.state = {
			currentGameState: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			currentPlayer: 1,
			twoPlayers: false,
			won: false,
		}
	}
	componentDidMount() {
		this.setState({
			twoPlayers: this.props.route.params.twoPlayers,
		})
	}
	componentDidUpdate() {
		if (!this.state.twoPlayers) {
			if (this.state.currentPlayer === -1) {
				this.computerPlay()
			}
		}
	}

	computerPlay() {
		let computerHasPlayed = false
		let row, col
		if (!this.state.won) {
			while (!computerHasPlayed) {
				row = Math.floor(Math.random() * (3 - 0)) + 0
				col = Math.floor(Math.random() * (3 - 0)) + 0
				if (this.state.currentGameState[row][col] === 0) {
					this.onTilePress(row, col)
					computerHasPlayed = true
				}
			}
		}
	}

	checkForDraw() {
		let currentGameState = this.state.currentGameState
		let i, value, solve
		const arr = []
		for (i = 0; i < 3; i++) {
			value =
				currentGameState[i][0] * currentGameState[i][1] * currentGameState[i][2]
			arr[i] = value
		}
		solve = arr[0] * arr[1] * arr[2]
		if (solve !== 0 || solve !== -0) {
			this.setState({
				won: true,
			})
			Alert.alert("TicTacToe", "its a draw", [
				{
					text: "play again",
					onPress: () => this.newGame(),
				},
				{
					text: "exit",
					onPress: () => this.props.navigation.pop(),
				},
			])
		}
	}

	newGame() {
		this.setState({
			currentGameState: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			currentPlayer: 1,
			won: false,
		})
	}
	setBoard(row, col) {
		let value = this.state.currentGameState[row][col]
		if (value === 1) {
			return <Text style={{ ...styles.piece, color: "blue" }}>x</Text>
		} else if (value === -1) {
			return <Text style={{ ...styles.piece, color: "#00FF00" }}>o</Text>
		} else {
			return <Text style={{ ...styles.piece }}></Text>
		}
	}

	onTilePress(row, col) {
		let saveArr = this.state.currentGameState
		if (saveArr[row][col] !== 0) {
			alert("tile already selected")
			return
		}
		saveArr[row][col] = this.state.currentPlayer
		this.setState((prevState) => ({
			currentGameState: saveArr,
			currentPlayer: prevState.currentPlayer === 1 ? -1 : 1,
		}))

		this.getWinner()
	}

	getWinner() {
		let sum, i
		let currentGameState = this.state.currentGameState
		for (i = 0; i < 3; i++) {
			sum =
				currentGameState[i][0] + currentGameState[i][1] + currentGameState[i][2]
			if (sum === 3) {
				this.setState({
					won: true,
				})
				Alert.alert("TicTacToe", "player 1 is the winner", [
					{
						text: "play again",
						onPress: () => this.newGame(),
					},
					{
						text: "exit",
						onPress: () => this.props.navigation.pop(),
					},
				])
			} else if (sum === -3) {
				this.setState({
					won: true,
				})
				Alert.alert(
					"TicTacToe",
					`${this.state.twoPlayer ? "player 2" : "computer"} is the winner`,
					[
						{
							text: "play again",
							onPress: () => this.newGame(),
						},
						{
							text: "exit",
							onPress: () => this.props.navigation.pop(),
						},
					]
				)
			}
		}
		for (i = 0; i < 3; i++) {
			sum =
				currentGameState[0][i] + currentGameState[1][i] + currentGameState[2][i]
			if (sum === 3) {
				this.setState({
					won: true,
				})
				Alert.alert("TicTacToe", "player 1 is the winner", [
					{
						text: "play again",
						onPress: () => this.newGame(),
					},
					{
						text: "exit",
						onPress: () => this.props.navigation.pop(),
					},
				])
			} else if (sum === -3) {
				this.setState({
					won: true,
				})
				Alert.alert(
					"TicTacToe",
					`${this.state.twoPlayer ? "player 2" : "computer"} is the winner`,
					[
						{
							text: "play again",
							onPress: () => this.newGame(),
						},
						{
							text: "exit",
							onPress: () => this.props.navigation.pop(),
						},
					]
				)
			}
		}

		sum =
			currentGameState[0][0] + currentGameState[1][1] + currentGameState[2][2]
		if (sum === 3) {
			this.setState({
				won: true,
			})
			Alert.alert("TicTacToe", "player 1 is the winner", [
				{
					text: "play again",
					onPress: () => this.newGame(),
				},
				{
					text: "exit",
					onPress: () => this.props.navigation.pop(),
				},
			])
		} else if (sum === -3) {
			this.setState({
				won: true,
			})
			Alert.alert(
				"TicTacToe",
				`${this.state.twoPlayer ? "player 2" : "computer"} is the winner`,
				[
					{
						text: "play again",
						onPress: () => this.newGame(),
					},
					{
						text: "exit",
						onPress: () => this.props.navigation.pop(),
					},
				]
			)
		}
		sum =
			currentGameState[0][2] + currentGameState[1][1] + currentGameState[2][0]
		if (sum === 3) {
			this.setState({
				won: true,
			})
			Alert.alert("TicTacToe", "player 1 is the winner", [
				{
					text: "play again",
					onPress: () => this.newGame(),
				},
				{
					text: "exit",
					onPress: () => this.props.navigation.pop(),
				},
			])
		} else if (sum === -3) {
			this.setState({
				won: true,
			})
			Alert.alert(
				"TicTacToe",
				`${this.state.twoPlayer ? "player 2" : "computer"} is the winner`,
				[
					{
						text: "play again",
						onPress: () => this.newGame(),
					},
					{
						text: "exit",
						onPress: () => this.props.navigation.pop(),
					},
				]
			)
		}
		this.checkForDraw()
	}
	render() {
		return (
			<View
				style={{
					alignItems: "center",
					justifyContent: "space-evenly",
					backgroundColor: "#4F6D7A",
					height: height,
				}}
			>
				<View>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							onPress={() => this.onTilePress(0, 0)}
							style={{
								...styles.box,
								borderLeftWidth: 0,
								borderTopWidth: 0,
							}}
						>
							{this.setBoard(0, 0)}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.onTilePress(0, 1)}
							style={{ ...styles.box, borderTopWidth: 0 }}
						>
							{this.setBoard(0, 1)}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.onTilePress(0, 2)}
							style={{ ...styles.box, borderRightWidth: 0, borderTopWidth: 0 }}
						>
							{this.setBoard(0, 2)}
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							onPress={() => this.onTilePress(1, 0)}
							style={{ ...styles.box, borderLeftWidth: 0 }}
						>
							{this.setBoard(1, 0)}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.onTilePress(1, 1)}
							style={{ ...styles.box }}
						>
							{this.setBoard(1, 1)}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.onTilePress(1, 2)}
							style={{ ...styles.box, borderRightWidth: 0 }}
						>
							{this.setBoard(1, 2)}
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							onPress={() => this.onTilePress(2, 0)}
							style={{
								...styles.box,
								borderLeftWidth: 0,
								borderBottomWidth: 0,
							}}
						>
							{this.setBoard(2, 0)}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.onTilePress(2, 1)}
							style={{ ...styles.box, borderBottomWidth: 0 }}
						>
							{this.setBoard(2, 1)}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.onTilePress(2, 2)}
							style={{
								...styles.box,
								borderRightWidth: 0,
								borderBottomWidth: 0,
							}}
						>
							{this.setBoard(2, 2)}
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => this.props.navigation.pop()}
					style={{
						backgroundColor: "#00FF00",
						width: 70,
						height: 40,
						borderRadius: 20,
						alignItems: "center",
						justifyContent: "center",
						marginBottom: -height / 5,
					}}
				>
					<Text style={{ fontSize: 17, color: "#fff" }}>Home</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		width: 70,
		height: 70,
		borderWidth: 3,
		alignItems: "center",
		justifyContent: "center",
	},
	piece: {
		fontSize: 60,
	},
})
export default Game
