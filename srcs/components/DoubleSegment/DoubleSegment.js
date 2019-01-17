import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native' 
import { Segment, Button, Text } from 'native-base'

const styles = StyleSheet.create({
	buttons: {
		borderColor: '#3F51B5',
		borderWidth: 0.5,
		color: 'black',
		flex: 1
	},
	firstButton: {
		marginLeft: 5,
	},
	secondButton: {
		marginRight: 5,
	},
	active: {
		color: '#3F51B5'
	},
	inActive: {
		color: 'grey', 
		opacity: 0.3
	}
})

class DoubleSegment extends React.PureComponent {
	render() {
		const { firstName, secondName, onChangeSegment, activeNum } = this.props
		return (
			<Segment>
				<Button style={{...styles.buttons, ...styles.firstButton}} first onPress={() => onChangeSegment(1)}>
					<Text style={activeNum === 1 ? styles.active : styles.inActive}>{firstName}</Text>
				</Button>
				<Button style={{...styles.buttons, ...styles.secondButton}} last onPress={() => onChangeSegment(2)}>
					<Text style={activeNum === 2 ? styles.active : styles.inActive}>{secondName}</Text>
				</Button>
			</Segment>
		)
	}
}

DoubleSegment.propTypes = {
	firstName: PropTypes.string,
	secondName: PropTypes.string,
	activeNum: PropTypes.number,
	onChangeSegment: PropTypes.func.isRequired
}

export default DoubleSegment