import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text, DatePicker, Icon, Card, CardItem } from 'native-base'

const styles = StyleSheet.create({
	cardWrapper: {
		width: '95%', 
		height: 125,
	},
	icon: {
		marginLeft: 15,
		marginRight: 15,
	},
	datePicker: {
		fontSize: 18,
	},
})

class DatePickerCard extends React.Component {
	render() {
		const { activeDate, onDateChange } = this.props
		return (
			<Card style={styles.cardWrapper}>
				<CardItem bordered header>
					<Text>Choose date</Text>
				</CardItem>
				<CardItem bordered>
					<Icon name='calendar' style={styles.icon}/>	
					<DatePicker
						defaultDate={activeDate}
						minimumDate={new Date(2019, 1, 1)}
						maximumDate={new Date(2019, 12, 31)}
						locale={'en'}
						timeZoneOffsetInMinutes={undefined}
						modalTransparent={false}
						animationType={'fade'}
						androidMode={'default'}
						placeHolderText={activeDate.toString().substr(4, 12)}
						textStyle={styles.datePicker}
						placeHolderTextStyle={styles.datePicker}
						onDateChange={onDateChange}
						formatChosenDate={date =>  date.toString().substr(4, 12)}
						disabled={false}
					/>
				</CardItem>
			</Card>
		)
	}
}

export default DatePickerCard