import React from 'react'
import { withRouter } from 'react-router-native'
import { Container, Content,  Text, Picker,  DatePicker, Textarea, Input, Item } from 'native-base'
import { ScreenHeader } from '@components'

class AddExpense extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 'key1',
			chosenDate: new Date()
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

	render() {
		return (
			<Container>
				<ScreenHeader withBackButton history={this.props.history} title='Add expenses'/>
				<Content >

					<Text>Add category</Text>
					<Picker
						note
						mode="dropdown"
						style={{ width: 120 }}
						selectedValue={this.state.selected}
						onValueChange={this.onValueChange.bind(this)}
					>
						<Picker.Item label="Wallet" value="key0" />
						<Picker.Item label="ATM Card" value="key1" />
						<Picker.Item label="Debit Card" value="key2" />
					</Picker>

					<Text>Add time</Text>
					<DatePicker
						defaultDate={new Date(2018, 4, 4)}
						minimumDate={new Date(2018, 1, 1)}
						maximumDate={new Date(2018, 12, 31)}
						locale={'en'}
						timeZoneOffsetInMinutes={undefined}
						modalTransparent={false}
						animationType={'fade'}
						androidMode={'default'}
						placeHolderText="Select date"
						textStyle={{ color: 'green' }}
						placeHolderTextStyle={{ color: '#d3d3d3' }}
						onDateChange={this.setDate}
						disabled={false}
					/>
					<Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
					</Text>

					<Text>Add description</Text>
					<Item regular>
						<Input multiline placeholder='Regular Textbox' />
					</Item>

					<Text>Add sum of money</Text>
					<Item regular>
						<Input  keyboardType={'numeric'} maxLength = {20} placeholder='Regular Textbox' />
					</Item>
				</Content>
			</Container>
		)
	}
}

export default withRouter(AddExpense)