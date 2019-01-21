import React from 'react'
import { connect } from 'react-redux'
import { isNumber } from '@validators'
import { comingSoonAlert } from '@config'
import { TRANSACTIONS_PATH } from '@navigation'
import { withRouter } from 'react-router-native'
import { StyleSheet, View, ScrollView, Keyboard } from 'react-native'
import { ScreenHeader, DoubleSegment, DatePickerCard, AddMoneyCard } from '@components'
import { Container, Content, Text, Picker, Input, Button, Icon, CardItem } from 'native-base'
import { addTransactionAction, changeTransactionAction, removeTransactionAction, changeBalanceAction } from '@redux'

const styles = StyleSheet.create({
	topInput: {
		fontSize: 32,
		textAlign: 'right',
		backgroundColor: '#3F51B5',
		padding: 5,
		color: 'white',
	},
	bottomButton: {
		right: 20,
		position: 'absolute',
		elevation: 4, 
		height: 65, 
		width: 65,
		bottom: 20,
		borderRadius: 35, 
		justifyContent: 'center'
	},
	datePicker: {
		fontSize: 18,
	},
	dateContainer: {
		padding: 8,
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
	},
	body: {
		fontSize: 18,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	icon: {
		marginLeft: 15,
		marginRight: 15,
	},
	currencyText: {
		fontSize: 32, 
		color: 'white', 
		backgroundColor: '#3F51B5', 
		alignSelf: 'center', 
		padding: 5, 
		paddingRight: 15
	},
	addMoneyCard: {
		width: '95%', 
		height: 125
	},
	topInputWrapper: {
		height: 55, 
		flexDirection: 'row', 
		backgroundColor: '#3F51B5', 
		justifyContent: 'center',
		alignItems: 'center'
	},
	descriptionCardWrapper: {
		flex: 1, 
		flexDirection: 'row', 
		alignItems: 'center'
	},
	dropDownPicker: {
		width: 120
	}
})

// so big component ...

class AddMoneyScreen extends React.Component {
	
	constructor(props) {
		super(props)
		this.isEdit = this.props.location.state ? this.props.location.state.id : -1 // redirect from transaction or main screen
		
		// isEdit - index of transaction to edit

		this.dateTitle = this.isEdit >= 0 ? 'Edit date' : 'Choose date'
		this.categoryTitle = this.isEdit >= 0 ? 'Edit category' : 'Choose category'
		this.headerTitle = this.isEdit >= 0 ? 'Edit transaction' : 'New transaction'
		this.descriptionTitle = this.isEdit >= 0 ? 'Edit description' : 'Add description'

		let trans = {}
		if (this.props.transactions)
			trans = this.props.transactions[this.isEdit]

		this.state = {
			sum: this.isEdit >= 0 ? trans.sum : '',
			categoryId: this.isEdit >= 0 ? trans.categoryId : 0,
			description: this.isEdit >= 0 ? trans.description : '',
			chosenDate: this.isEdit >= 0 ? new Date(trans.date) : new Date(),
			segmentType: this.isEdit >= 0 ? trans.type : 'expenses',
			bottom: 20,
			keyboardHeight: 0,
		}
	}


	updateState = (key, value) => {
		if (key === 'sum') { // handling bottom button position
			value ? this.setState({ [key]: value, bottom: this.state.keyboardHeight + 20 }) : this.setState({ [key]: value, bottom: 20 }) 
		} else {
			this.setState({ [key]: value })
		}
	}

	onInputChange = (value) => {
		if (isNumber(value) || !value) {
			this.updateState('sum', value == '0' ? '' : value)
		} 
	}

	addNewTransaction = ({ sum, segmentType, chosenDate, categoryId, description }) => {
		const transaction = {
			sum,
			description,
			categoryId,
			type: segmentType,
			date: chosenDate,
		}

		if (this.isEdit >= 0) {
			this.updateTransaction(transaction)
		} else {
			let newBalance = this.props.balance - sum
			if (segmentType === 'income') {
				newBalance = +this.props.balance + +sum
			}
			this.props.changeBalance(newBalance.toString())
			this.props.addTransaction(transaction)
		}
		this.props.history.push(TRANSACTIONS_PATH)
	}

	// maybe better to move this logic to the reducer 
	updateTransaction = (transaction) => {
		const prevSum = this.props.transactions[this.isEdit].sum
		const prevType = this.props.transactions[this.isEdit].type
	
		if (prevSum != transaction.sum || prevType != transaction.segmentType) {
			let newBalance = this.props.balance

			// restoring old balance
			newBalance = this.props.balance - prevSum
			if (prevType === 'expenses') {
				newBalance = +this.props.balance + +prevSum
			}

			// update current balance
			if (transaction.type === 'income') {
				newBalance = +newBalance + +transaction.sum
			} else {
				newBalance = newBalance - transaction.sum
			}
			this.props.changeBalance(newBalance.toString())
		}
		this.props.updateTransaction(transaction, this.isEdit)
	}

	deleteTransaction = () => {
		const { type, sum } = this.props.transactions[this.isEdit]
		let newBalance = +this.props.balance + +sum

		if (type === 'income') {
			newBalance = this.props.balance - sum
		}
		this.props.changeBalance(newBalance.toString())
		this.props.removeTransaction(this.isEdit)
		this.props.history.push(TRANSACTIONS_PATH)
	}
	
	onFocus = () => {
		if (this.state.sum !== '0' && this.state.sum) {
			this.addNewTransaction(this.state)
		} else {
			this.NumberInput.wrappedInstance.focus()
		}
	}

	componentDidMount() {
		this.NumberInput.wrappedInstance.focus()
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ bottom: 20 }))
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => this.setState({ keyboardHeight: e.endCoordinates.height }))
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}

	render() {
		const keyboardSettings = {
			caretHidden: true,
			maxLength: 13,
			placeholder: '0',
			style: styles.topInput,
			keyboardType: 'numeric',
			placeholderTextColor: styles.topInput.color
		}
		return (
			<ScrollView scrollEnabled={false} keyboardShouldPersistTaps='always'>
				<Container>
					<ScreenHeader withBackButton history={this.props.history} title={this.headerTitle} withRightButton={this.isEdit >= 0} rightIcon={'md-trash'} onPressRightButton={this.deleteTransaction}/>
					<Content contentContainerStyle={styles.body}>
						<View style={styles.topInputWrapper}>
							<Input {...keyboardSettings} value={this.state.sum} ref={r => this.NumberInput = r} onChangeText={this.onInputChange} />
							<Text onPress={comingSoonAlert} style={styles.currencyText}>UAH</Text>
						</View>
						<DoubleSegment 
							firstName={'Expenses'} 
							secondName={'Income'} 
							activeNum={this.state.segmentType === 'expenses' ? 1 : 2}
							onChangeSegment={active => this.updateState('segmentType', active === 1 ? 'expenses' : 'income')} 
						/>

						<DatePickerCard title={this.dateTitle} activeDate={this.state.chosenDate} onDateChange={v => this.updateState('chosenDate', v)} />

						<AddMoneyCard style={styles.addMoneyCard} title={this.categoryTitle}>
							<CardItem bordered>
								<Icon name='list' style={styles.icon}/>	
								<Picker 
									note 
									mode="dropdown" 
									style={styles.dropDownPicker} 
									selectedValue={this.state.categoryId} 
									onValueChange={v => this.updateState('categoryId', v)}
								>
									{this.props.categories.map((label, i) => <Picker.Item label={label} value={i} key={i} />)}
								</Picker>
							</CardItem>
						</AddMoneyCard>

						<AddMoneyCard style={styles.addMoneyCard} title={this.descriptionTitle}>
							<View style={styles.descriptionCardWrapper}>
								<Icon name='ios-paper' style={styles.icon}/>	
								<Input
									multiline 
									value={this.state.description}
									placeholder='Add some description'
									onChangeText={v => this.updateState('description', v)}
								/>
							</View>
						</AddMoneyCard>
						
					</Content>
					<Button style={{...styles.bottomButton, bottom: this.state.bottom}} onPress={this.onFocus}>
						<Icon name={(this.state.sum !== '0' && this.state.sum) ? 'md-checkmark' : 'ios-keypad'}/>
					</Button>
				</Container>
			</ScrollView>
		)
	}
}

const mapStateToProps = state => ({
	balance: state.balanceReducer.balance,
	categories: state.categoriesReducer.categories,
	transactions: state.transactionReducer.transactions,
})

const mapDispatchToProps = dispatch => ({
	changeBalance: balance => dispatch(changeBalanceAction(balance)),
	removeTransaction: index => dispatch(removeTransactionAction(index)),
	addTransaction: transaction => dispatch(addTransactionAction(transaction)),
	updateTransaction: (transaction, index) => dispatch(changeTransactionAction(transaction, index)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMoneyScreen))