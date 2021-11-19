/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"
import {
	View,
	Dimensions,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native"

//import Game from './Game'

const { width, height } = Dimensions.get("window")
class Home extends Component {
	constructor(props) {
		super()
		this.state = {
			twoPlayers: false,
		}
	}
	render() {
		return (
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#4F6D7A",
					height: "100%",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: width / 2,
						marginBottom: 50,
					}}
				>
					<View style={{ alignItems: "center" }}>
						<TouchableOpacity
							onPress={() => this.setState({ twoPlayers: true })}
							style={{ ...styles.radio }}
						>
							<View
								style={{
									...styles.innerRadio,
									backgroundColor: this.state.twoPlayers
										? "black"
										: "transparent",
								}}
							></View>
						</TouchableOpacity>
						<Text style={{ color: "#F5FCFF", marginTop: 40 }}>Two Players</Text>
					</View>
					<View style={{ alignItems: "center" }}>
						<TouchableOpacity
							onPress={() => this.setState({ twoPlayers: false })}
							style={{ ...styles.radio }}
						>
							<View
								style={{
									...styles.innerRadio,
									backgroundColor: !this.state.twoPlayers
										? "black"
										: "transparent",
								}}
							></View>
						</TouchableOpacity>
						<Text style={{ color: "#F5FCFF", marginTop: 40 }}>Computer</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate("Game", {
							twoPlayers: this.state.twoPlayers,
						})
					}
				>
					<Text style={{ color: "#14F597", fontSize: 20 }}>Start</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	radio: {
		height: 20,
		width: 20,
		borderWidth: 1,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	innerRadio: {
		height: 15,
		width: 15,
		borderRadius: 7,
	},
})

export default Home
