import React from 'react'
import { StyleSheet, View } from 'react-native'
import { withRouter } from 'react-router-native'
import { Container, Content,  Text, Picker,  DatePicker, Input, Button, Icon, Body,  Card, CardItem } from 'native-base'
import { ScreenHeader } from '@components'
import { alert, INITIAL_CATEGORIES } from '@config'

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
	}
})

class AddMoneyScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			chosenDate: new Date(),
			sum: '0'
		}
		this.setDate = this.setDate.bind(this)
	}
	onValueChange(value) {
		this.setState({
			selected: value
		})
	}

	setDate(newDate) {
		this.setState({ chosenDate: newDate })
	}
	
	onFocus = () => {
		this.NumberInput.wrappedInstance.focus()
	}

	componentDidMount() {
		this.NumberInput.wrappedInstance.focus()
	}

	render() {
		return (
			<Container>
				<ScreenHeader withBackButton history={this.props.history} title='Add expenses'/>
				<Content contentContainerStyle={styles.body}>
					<View style={{height: 55, flexDirection: 'row', backgroundColor: '#3F51B5', justifyContent: 'center', alignItems: 'center'}}>
						<Input 
							ref={(r) => this.NumberInput = r} 
							caretHidden 
							selectTextOnFocus={false} 
							style={styles.topInput} 
							keyboardType={'numeric'} 
							maxLength={13}
							onChangeText={(sum) => this.setState({sum})}
							value={this.state.sum}  
						/>
						<Text onPress={() => alert('Coming soon!', 'Not supported yet.')} style={{fontSize: 32, color: 'white', backgroundColor: '#3F51B5', alignSelf: 'center', padding: 5, paddingRight: 15}}>UAH</Text>
					</View>


					<Card style={{ width: '95%', height: 125}}>
						<CardItem bordered header><Text>Choose date</Text></CardItem>
						<CardItem bordered>
							<Icon name='calendar' style={styles.icon}/>	
							<DatePicker
								defaultDate={this.state.chosenDate}
								minimumDate={new Date(2019, 1, 1)}
								maximumDate={new Date(2019, 12, 31)}
								locale={'en'}
								timeZoneOffsetInMinutes={undefined}
								modalTransparent={false}
								animationType={'fade'}
								androidMode={'default'}
								placeHolderText={this.state.chosenDate.toString().substr(4, 12)}
								textStyle={styles.datePicker}
								placeHolderTextStyle={styles.datePicker}
								onDateChange={this.setDate}
								formatChosenDate={date =>  date.toString().substr(4, 12)}
								disabled={false}
							/>
						</CardItem>
						
					</Card>

					<Card style={{  width: '95%', height: 125,}}>
						<CardItem bordered header><Text>Choose category</Text></CardItem>
						<CardItem bordered>
							<Icon name='list' style={styles.icon}/>	
							<Picker note mode="dropdown" style={{ width: 120 }} selectedValue={this.state.selected} onValueChange={this.onValueChange.bind(this)}>
								{INITIAL_CATEGORIES.map((label, i) => <Picker.Item label={label} value={i} key={i} />)}
							</Picker>
						</CardItem>
					</Card>

					<Card style={{ width: '95%', height: 125}}>
						<CardItem bordered header><Text>Add description</Text></CardItem>
						<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
							<Icon name='ios-paper' style={styles.icon}/>	
							<Input multiline placeholder='Add some description' />
						</View>
						
					</Card>
				</Content>
				<Button style={styles.bottomButton} onPress={this.onFocus}>
					<Icon name={'md-cash'}/>
				</Button>
			</Container>
		)
	}
}

// TODO: split into smaller components

export default withRouter(AddMoneyScreen)