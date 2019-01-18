import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Card, CardItem, Text } from 'native-base'

const styles = StyleSheet.create({
	card: {
		flex: 1,
	},
	cardContent: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	description: {
		fontSize: 14,
		color: 'grey'
	},
	expenses: {
		color: 'red'
	},
	income: {
		color: 'green'
	},
	bigFont: {
		fontSize: 20,
	}
})

class TransactionItem extends React.PureComponent {
	render() {
		const { date, category, sum, description, type, onPressItem } = this.props
		const moneySign = type === 'income' ? '+' : '-'
		const moneyStyle = type === 'income' ? styles.income : styles.expenses
		return (
			<ListItem>
				<Card style={styles.card} >
					<CardItem button onPress={onPressItem} style={styles.cardContent} header bordered>
						<Text style={styles.bigFont}>{date}</Text>
						<Text style={{...moneyStyle, ...styles.bigFont}}>{`${moneySign} ${sum}`}</Text>
					</CardItem>
					<CardItem button onPress={onPressItem} style={styles.cardContent}>
						<Text>{category}</Text>
						<Text style={styles.description}>{description}</Text>
					</CardItem> 
				</Card>
			</ListItem>
		)
	}
}

export default TransactionItem