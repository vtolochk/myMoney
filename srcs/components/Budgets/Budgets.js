import React from 'react'
import { Text } from 'native-base'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
	view: {
		padding: 15,
	},
	text: {
		textAlign: 'center',
		color: 'grey'
	}
})

const Budgets =() => <View style={styles.view}><Text style={styles.text}>Coming soon!</Text></View>

export default Budgets