/** @format */

import { StatusBar } from "expo-status-bar"
import React, { Component } from "react"
import { View, Dimensions } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Game from "./src/Game"
import Home from "./src/Home"

const height = Dimensions.get("window").height
const stack = createNativeStackNavigator()

class App extends Component {
	constructor(props) {
		super()

		this.state = {
			isLoading: false,
		}
	}

	render() {
		return (
			<NavigationContainer>
				<stack.Navigator initialRouteName="Home">
					<stack.Screen
						name="Home"
						component={Home}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="Game"
						component={Game}
						options={{ headerShown: false }}
					/>
				</stack.Navigator>
			</NavigationContainer>
		)
	}
}

export default App
