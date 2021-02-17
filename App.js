/** @format */

import { StatusBar } from "expo-status-bar"
import React, { Component } from "react"
import { View, Dimensions } from "react-native"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Game from "./src/Game"
import Home from "./src/Home"

const height = Dimensions.get("window").height
const stack = createStackNavigator()

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
