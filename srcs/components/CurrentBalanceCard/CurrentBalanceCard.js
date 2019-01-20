import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, CardItem, Text } from 'native-base'

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		textAlign: 'center'
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
	},
	positiveStyle: {
		color: 'green'
	},
	negativeStyle: {
		color: 'red'
	}
})

class CurrentBalanceCard extends React.PureComponent {
	render() {
		const { isPositive, balance } = this.props
		const textStyle = isPositive ? styles.positiveStyle : styles.negativeStyle
		return (
			<Card>
				<CardItem style={styles.textContainer}>
					<Text style={{...styles.text, ...textStyle}}>{balance}</Text>
					<Text>Current balance</Text>
				</CardItem>
			</Card>
		)
	}
}

export default CurrentBalanceCard