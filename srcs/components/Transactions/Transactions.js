import React from 'react'
import { connect } from 'react-redux'
import { List, Text  } from 'native-base'
import { ADD_MONEY_PATH } from '@navigation'
import { TransactionItem, CurrentBalanceCard } from '@components'
import { withRouter } from 'react-router-native'
import { ScrollView, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	view: {
		padding: 15,
	},
	text: {
		textAlign: 'center',
		color: 'grey'
	}
})

class Transactions extends React.PureComponent{

	onPressItem = (id) => {
		this.props.history.push(
			{ 
				pathname: ADD_MONEY_PATH,
				state: { id }
			})
	}

	render() {
		const { transactions, currentBalance, categories } = this.props
		
		if (!transactions.length)
			return <View style={styles.view}><Text style={styles.text}>There are no transactions yet.</Text></View>

		return (
			<ScrollView>
				<CurrentBalanceCard isPositive={Number(currentBalance) >= 0} balance={currentBalance}/>
				<List>
					{transactions.map((trans, i) => (
						<TransactionItem
							key={i}
							{...trans}
							category={categories[trans.categoryId]}
							onPressItem={() => this.onPressItem(i)}
							date={trans.date.toString().substr(4, 12)}
						/>))}
				</List>
			</ScrollView>
		)
	}
}

const mapStateToProps = state => ({
	categories: state.categoriesReducer.categories,
	transactions: state.transactionReducer.transactions,
	currentBalance: state.balanceReducer.balance
})

export default withRouter(connect(mapStateToProps)(Transactions))