import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, ListItem } from 'native-base'

const styles = StyleSheet.create({
	listItem: {
		flex: 1, 
		justifyContent: 'space-between'
	},
	redText: {
		color: 'red'
	},
	greenText: {
		color: 'green'
	}
})

class OverviewListItem extends React.PureComponent {
	render() {
		const {name, sum} = this.props
		return (
			<ListItem style={styles.listItem}>
				<Text>{name}</Text>
				<Text style={sum >= 0 ? styles.greenText : styles.redText}>{sum}</Text>
			</ListItem>
		)
	}
}

export default OverviewListItem