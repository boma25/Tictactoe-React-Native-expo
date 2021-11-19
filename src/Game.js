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
	Alert,
	Dimensions,
} from "react-native"

const { height } = Dimensions.get("window")

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
		let row,
			col,
			i = 0,
			j = 0
		if (!this.state.won) {
			while (!computerHasPlayed) {
				let currentGameState = this.state.currentGameState
				const sum = (x, y) => {
					const ans = x + y
					if (ans === 2) {
						return true
					} else {
						return false
					}
				}

				if (i === 0) {
					if (
						sum(currentGameState[i][j], currentGameState[i][j + 1]) &&
						currentGameState[i][j + 2] === 0
					) {
						this.onTilePress(i, j + 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j], currentGameState[i + 1][j]) &&
						currentGameState[i + 2][j] === 0
					) {
						this.onTilePress(i + 2, j)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j], currentGameState[i + 1][j + 1]) &&
						currentGameState[i + 2][j + 2] === 0
					) {
						this.onTilePress(i + 2, j + 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i + 1][j], currentGameState[i + 1][j + 1]) &&
						currentGameState[i + 1][j + 2] === 0
					) {
						this.onTilePress(i + 1, j + 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i + 2][j], currentGameState[i + 1][j]) &&
						currentGameState[i][j] === 0
					) {
						this.onTilePress(i, j)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i + 2][j], currentGameState[i + 2][j + 1]) &&
						currentGameState[i + 2][j + 2] === 0
					) {
						this.onTilePress(i + 2, j + 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i + 2][j], currentGameState[i + 1][j + 1]) &&
						currentGameState[i][j + 2] === 0
					) {
						this.onTilePress(i, j + 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j], currentGameState[i + 2][j]) &&
						currentGameState[i + 1][j] === 0
					) {
						this.onTilePress(i + 1, j)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j], currentGameState[i + 2][j + 2]) &&
						currentGameState[i + 1][j + 1] === 0
					) {
						this.onTilePress(i + 1, j + 1)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j + 2], currentGameState[i + 2][j]) &&
						currentGameState[i + 1][j + 1] === 0
					) {
						this.onTilePress(i + 1, j + 1)
						computerHasPlayed = true
					} else {
						i = 2
						j = 2
					}
				} else if (i === 2) {
					if (
						sum(currentGameState[i][j], currentGameState[i][j - 1]) &&
						currentGameState[i][j - 2] === 0
					) {
						this.onTilePress(i, j - 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j], currentGameState[i - 1][j]) &&
						currentGameState[i - 2][j] === 0
					) {
						this.onTilePress(i - 2, j)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j], currentGameState[i - 1][j - 1]) &&
						currentGameState[i - 2][j - 2] === 0
					) {
						this.onTilePress(i - 2, j - 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i - 1][j], currentGameState[i - 1][j - 1]) &&
						currentGameState[i - 1][j - 2] === 0
					) {
						this.onTilePress(i - 1, j - 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i - 2][j], currentGameState[i - 1][j]) &&
						currentGameState[i][j] === 0
					) {
						this.onTilePress(i, j)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i - 2][j], currentGameState[i - 2][j - 1]) &&
						currentGameState[i - 2][j - 2] === 0
					) {
						this.onTilePress(i - 2, j - 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i - 2][j], currentGameState[i - 1][j - 1]) &&
						currentGameState[i][j - 2] === 0
					) {
						this.onTilePress(i, j - 2)
						computerHasPlayed = true
					} else if (
						sum(currentGameState[i][j], currentGameState[i - 2][j]) &&
						currentGameState[i - 1][j] === 0
					) {
						this.onTilePress(i - 1, j)
						computerHasPlayed = true
					} else {
						i = 1
					}
				} else {
					row = Math.floor(Math.random() * (3 - 0)) + 0
					col = Math.floor(Math.random() * (3 - 0)) + 0
					if (this.state.currentGameState[row][col] === 0) {
						this.onTilePress(row, col)
						computerHasPlayed = true
					}
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
			setTimeout(() => {
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
			}, 500)
		} else {
			this.getWinner()
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
			return <Text style={{ ...styles.piece, color: "#0812FC" }}>x</Text>
		} else if (value === -1) {
			return <Text style={{ ...styles.piece, color: "#14F597" }}>o</Text>
		} else {
			return <Text style={{ ...styles.piece }}></Text>
		}
	}

	onTilePress(row, col) {
		let saveArr = this.state.currentGameState
		if (saveArr[row][col] !== 0) {
			alert("tile already selected")
			console.log([row, col])
			return
		}
		saveArr[row][col] = this.state.currentPlayer
		this.setState((prevState) => ({
			currentGameState: saveArr,
			currentPlayer: prevState.currentPlayer === 1 ? -1 : 1,
		}))
		this.checkForDraw()
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
				setTimeout(() => {
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
				}, 500)
			} else if (sum === -3) {
				this.setState({
					won: true,
				})
				setTimeout(() => {
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
				}, 500)
			}
		}
		for (i = 0; i < 3; i++) {
			sum =
				currentGameState[0][i] + currentGameState[1][i] + currentGameState[2][i]
			if (sum === 3) {
				this.setState({
					won: true,
				})
				setTimeout(() => {
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
				}, 500)
			} else if (sum === -3) {
				this.setState({
					won: true,
				})
				setTimeout(() => {
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
				}, 500)
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
	}
	render() {
		return (
			<View
				style={{
					alignItems: "center",
					justifyContent: "space-evenly",
					backgroundColor: "#4F6D7A",
					height: "100%",
				}}
			>
				<View style={{ justifyContent: "flex-end", height: height / 2 }}>
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
						backgroundColor: "#fff",
						width: 80,
						height: 40,
						borderRadius: 15,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text style={{ fontSize: 17, fontWeight: "700", color: "#14F597" }}>
						Home
					</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		width: 70,
		height: 70,
		borderWidth: 1.8,
		alignItems: "center",
		justifyContent: "center",
	},
	piece: {
		fontSize: 60,
		fontWeight: "700",
	},
})
export default Game
