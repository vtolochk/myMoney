import React from 'react'
import { alert } from '@config'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isNumber } from '@validators'
import { CATEGORIES_PATH } from '@navigation'
import { View, StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'
import { Card, CardItem, Text, Input, Button } from 'native-base'
import { changeBalanceAction } from '@redux'


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
	}
})

class Wallet extends React.Component {

    onChangeInputText = (balance) => {
    	if (isNumber(balance)) {
    		this.props.changeBalance(balance)
    	}
    }
	
	openCategoriesScreen = () => {
		this.props.history.push(CATEGORIES_PATH)
	}

	comingSoonAlert = () => {
		alert('Coming soon!', 'Not supported yet.')
	}
	
	render() {
    	const { categories, balance } = this.props
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
    						value={balance}
    						onChangeText={this.onChangeInputText}
    					/>
    					<Text onPress={this.comingSoonAlert} style={styles.inputCurrency}>UAH</Text>
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
	categories: state.categoriesReducer.categories,
})

const mapDispatchToProps = dispatch => ({
	changeBalance: (balance) => dispatch(changeBalanceAction(balance))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet))