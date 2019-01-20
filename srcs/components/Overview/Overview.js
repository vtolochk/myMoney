import React from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, List } from 'native-base'
import { StyleSheet, ScrollView } from 'react-native'
import { OverviewChart, OverviewListItem } from '@components'

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

class Overview extends React.PureComponent {

	getSumOfCategory = (categoryId) => {
		const transByCategory = this.props.transactions.filter(trans => trans.categoryId === categoryId)
		const sum = transByCategory.reduce((reduce, trans) => {
			if (trans.type === 'income') {
				reduce = +reduce + +trans.sum
			} else {
				reduce -= trans.sum
			}
			return reduce
		}, 0)
		return sum
	}

	getCategoriesWithSums = () => {
		return this.props.categories.map((cat, i) => ({
			sum: this.getSumOfCategory(i), 
			name: cat,
		}))
	}

	tab = (heading, categories) => {
		return (<Tab heading={heading}>
			<List>
				{categories.map((cat, i) => <OverviewListItem key={i} {...cat} />)}
			</List>
		</Tab>)
	}

	render() {
		const allCategories = this.getCategoriesWithSums()
		const incomeCategories = allCategories.filter(cat => cat.sum > 0)
		const expensesCategories = allCategories.filter(cat => cat.sum < 0)

		return (
			<ScrollView style={styles.container}>
				<OverviewChart categories={allCategories}/>
				<Tabs>
					{this.tab('All', allCategories)}
					{this.tab('Income', incomeCategories)}
					{this.tab('Expenses', expensesCategories)}
				</Tabs>
			</ScrollView>
			
		)
	}
}

const mapStateToProps = state => ({
	balance: state.balanceReducer.balance,
	categories: state.categoriesReducer.categories,
	transactions: state.transactionReducer.transactions
})

export default connect(mapStateToProps)(Overview)