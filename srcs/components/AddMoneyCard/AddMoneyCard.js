import React from 'react'
import { Card, CardItem, Text } from 'native-base'

class AddMoneyCard extends React.PureComponent {
	render() {
		const { style, title } = this.props
		return (
			<Card style={style}>
				<CardItem bordered header>
					<Text>{title}</Text>
				</CardItem>
				{this.props.children}
			</Card>
		)
	}
}

export default AddMoneyCard