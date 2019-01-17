import React from 'react'
import { connect } from 'react-redux'
import { isNumber } from '@validators'
import { comingSoonAlert } from '@config'
import { addTransactionAction } from '@redux'
import { TRANSACTIONS_PATH } from '@navigation'
import { withRouter } from 'react-router-native'
import { StyleSheet, View, ScrollView, Keyboard } from 'react-native'
import { ScreenHeader, DoubleSegment, DatePickerCard, AddMoneyCard } from '@components'
import { Container, Content,  Text, Picker, Input, Button, Icon, CardItem } from 'native-base'

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
		
	state = {
		sum: '',
		selected: 0,
		description: '',
		chosenDate: new Date(),
		segmentType: 'expenses',
		bottom: 20,
		keyboardHeight: 0
	}

	updateState = (key, value) => {
		if (key === 'sum') { // handling bottom button position
			value ? this.setState({ [key]: value, bottom: this.state.keyboardHeight + 20 }) : this.setState({ [key]: value, bottom: 20 }) 
		} else {
			this.setState({ [key]: value })
		}
	}
	
	onFocus = () => {
		const { sum, segmentType, chosenDate, selected, description } = this.state
		if (this.state.sum !== '0' && this.state.sum) {
			const transaction = {
				sum,
				description,
				type: segmentType,
				date: chosenDate,
				category: this.props.categories[selected],
			}
			this.props.addTransaction(transaction)
			this.props.history.push(TRANSACTIONS_PATH)
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
					<ScreenHeader withBackButton history={this.props.history} title='New transaction'/>
					<Content contentContainerStyle={styles.body}>
						<View style={styles.topInputWrapper}>
							<Input
								{...keyboardSettings}
								value={this.state.sum}
								ref={r => this.NumberInput = r}
								onChangeText={v => { isNumber(v) || !v ? this.updateState('sum', v == '0' ? '' : v) : {} }}
							/>
							<Text onPress={comingSoonAlert} style={styles.currencyText}>UAH</Text>
						</View>

						<DoubleSegment 
							firstName={'Expenses'} 
							secondName={'Income'} 
							activeNum={this.state.segmentType === 'expenses' ? 1 : 2}
							onChangeSegment={active => this.updateState('segmentType', active === 1 ? 'expenses' : 'income')} 
						/>

						<DatePickerCard activeDate={this.state.chosenDate} onDateChange={v => this.updateState('chosenDate', v)} />

						<AddMoneyCard style={styles.addMoneyCard} title={'Choose category'}>
							<CardItem bordered>
								<Icon name='list' style={styles.icon}/>	
								<Picker 
									note 
									mode="dropdown" 
									style={styles.dropDownPicker} 
									selectedValue={this.state.selected} 
									onValueChange={v => this.updateState('selected', v)}
								>
									{this.props.categories.map((label, i) => <Picker.Item label={label} value={i} key={i} />)}
								</Picker>
							</CardItem>
						</AddMoneyCard>

						<AddMoneyCard style={styles.addMoneyCard} title={'Add description'}>
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
	categories: state.categoriesReducer.categories
})

const mapDispatchToProps = dispatch => ({
	addTransaction: transaction => dispatch(addTransactionAction(transaction))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMoneyScreen))