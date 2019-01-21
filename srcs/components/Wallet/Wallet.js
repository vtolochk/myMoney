import React from 'react'
import {
	changeBalanceAction, 
	setInitialBalanceAction, 
	restoreAllCategoriesAction,
	deleteAllTransactionsAction
} from '@redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isNumber } from '@validators'
import { comingSoonAlert, alert } from '@config'
import { CATEGORIES_PATH } from '@navigation'
import { View, StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'
import { Card, CardItem, Text, Input, Button } from 'native-base'


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	saveButton: {
		width: '98%',
		marginTop: 15,
		alignSelf: 'center'
	},
	input: {
		borderBottomColor: 'grey', 
		borderBottomWidth: 0.3, 
		fontSize: 28
	},
	inputCurrency: {
		fontSize: 28, 
		alignSelf: 'flex-start', 
		padding: 5, 
		paddingRight: 15
	},
})

class Wallet extends React.Component {

	state = {
		inputBalance: this.props.initialBalance
	}

    onChangeInputText = (inputBalance) => {
    	if (isNumber(inputBalance)) {
    		this.setState({ inputBalance })
    	}
    }
	
	openCategoriesScreen = () => {
		this.props.history.push(CATEGORIES_PATH)
	}

	changeInitialBalance = () => {

		const onOkay = () => {
			this.props.deleteAllTransactions()
			this.props.restoreAllCategories()
			this.props.setInitialBalance(this.state.inputBalance)
		}

		alert('Are you sure?', 'It will delete all the transactions and restore all the categories.', onOkay)
	}
	
	render() {
		const { categories, initialBalance } = this.props
    	return (
    		<View style={styles.container}>
    			<Card>
    				<CardItem header bordered>
    					<Text>Initial balance</Text>
    				</CardItem>
    				<CardItem bordered>
    					<Input 
    						selectTextOnFocus={false}
    						keyboardType={'numeric'} 
    						maxLength={13}
    						style={styles.input}
    						value={this.state.inputBalance}
    						onChangeText={this.onChangeInputText}
    					/>
    					<Text onPress={comingSoonAlert} style={styles.inputCurrency}>UAH</Text>
    				</CardItem>
    			</Card>
    			<Card >
    				<CardItem button onPress={this.openCategoriesScreen} header bordered>
    					<Text>Categories settings</Text>
    				</CardItem>
    				<CardItem button onPress={this.openCategoriesScreen} bordered>
    					<Text>{categories.length} categories in total</Text>
    				</CardItem>
				</Card>
				{initialBalance !== this.state.inputBalance && <Button onPress={this.changeInitialBalance} block style={{...styles.saveButton, }}><Text>Set new balance</Text></Button>}
    		</View>
    	)
	}
}

Wallet.propTypes = {
	categories: PropTypes.array.isRequired,
	balance: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
	balance: state.balanceReducer.balance,
	initialBalance: state.balanceReducer.initialBalance,
	categories: state.categoriesReducer.categories,
})

const mapDispatchToProps = dispatch => ({
	deleteAllTransactions: () => dispatch(deleteAllTransactionsAction()),
	restoreAllCategories: () => dispatch(restoreAllCategoriesAction()),
	setInitialBalance: balance => dispatch(setInitialBalanceAction(balance)),
	changeBalance: balance => dispatch(changeBalanceAction(balance))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet))