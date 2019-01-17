import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { isNumber } from '@validators'
import { withRouter } from 'react-router-native'
import { comingSoonAlert } from '@config'
import { TRANSACTIONS_PATH } from '@navigation'
import { addTransactionAction } from '@redux'
import { ScreenHeader, DoubleSegment, DatePickerCard } from '@components'
import { KeyboardAvoidingView } from 'react-native' // here
import { Container, Content,  Text, Picker, Input, Button, Icon,  Card, CardItem } from 'native-base'

const styles = StyleSheet.create({
	topInput: {
		fontSize: 32,
		textAlign: 'right',
		backgroundColor: '#3F51B5',
		padding: 5,
		color: 'white',
	},
	bottomButton: {
		right: 15,
		position: 'absolute',
		elevation: 4, 
		height: 65, 
		width: 65, 
		bottom: 15, 
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
})

class AddMoneyScreen extends React.Component {
		
	state = {
		sum: '',
		selected: 0,
		description: '',
		chosenDate: new Date(),
		segmentType: 'expenses',
	}

	handleSelectionChange = ({ nativeEvent: { selection } }) => this.setState({ selection })

	updateState = (key, value) => {
		this.setState({ [key]: value})
	}
	
	onFocus = () => {
		const { sum, segmentType, chosenDate, selected, description } = this.state
		if (this.state.sum !== '0' && this.state.sum) {
			const transaction = {
				sum,
				type: segmentType,
				date: chosenDate,
				description: description,
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
	}

	render() {
		return (
			<Container>
				<ScreenHeader withBackButton history={this.props.history} title=''/>
				<Content contentContainerStyle={styles.body}>
					<View style={{height: 55, flexDirection: 'row', backgroundColor: '#3F51B5', justifyContent: 'center', alignItems: 'center'}}>
						<Input
							ref={(r) => this.NumberInput = r} 
							caretHidden 
							selectTextOnFocus={false} 
							style={styles.topInput} 
							keyboardType={'numeric'}
							maxLength={13}
							placeholder={'0'}
							placeholderTextColor={styles.topInput.color}
							onChangeText={v => {
								if (isNumber(v) || !v)
									this.updateState('sum', v == '0' ? '' : v)
							}}
							value={this.state.sum} 
						/>
						<Text onPress={comingSoonAlert} style={styles.currencyText}>UAH</Text>
					</View>

					<DoubleSegment 
						firstName={'Expenses'} 
						secondName={'Income'} 
						onChangeSegment={(active) => this.updateState('segmentType', active === 1 ? 'expenses' : 'income')} 
						activeNum={this.state.segmentType === 'expenses' ? 1 : 2} 
					/>

					<DatePickerCard  activeDate={this.state.chosenDate} onDateChange={v => this.updateState('chosenDate', v)} />

					<Card style={{  width: '95%', height: 125,}}>
						<CardItem bordered header><Text>Choose category</Text></CardItem>
						<CardItem bordered>
							<Icon name='list' style={styles.icon}/>	
							<Picker note mode="dropdown" style={{ width: 120 }} selectedValue={this.state.selected} onValueChange={v => this.updateState('selected', v)}>
								{this.props.categories.map((label, i) => <Picker.Item label={label} value={i} key={i} />)}
							</Picker>
						</CardItem>
					</Card>

					<Card style={{ width: '95%', height: 125}}>
						<CardItem bordered header><Text>Add description</Text></CardItem>
						<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
							<Icon name='ios-paper' style={styles.icon}/>	
							<Input value={this.state.description} onChangeText={v => this.updateState('description', v)} multiline placeholder='Add some description' />
						</View>
						
					</Card>
				</Content>
				<Button style={styles.bottomButton} onPress={this.onFocus}>
					<Icon name={(this.state.sum !== '0' && this.state.sum) ? 'md-checkmark' : 'md-cash'}/>
				</Button>
			</Container>
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