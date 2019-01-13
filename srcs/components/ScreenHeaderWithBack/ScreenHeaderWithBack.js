import React from 'react'
import { Header,Button, Icon, Left, Body, Right, Title } from 'native-base'

class ScreenHeaderWithBack extends React.PureComponent {
	render() {
		return (
			<Header>
				<Left>
					<Button transparent onPress={() => { this.props.history.goBack() }}>
						<Icon name='arrow-back' />
					</Button>
				</Left>
				<Body style={{flex: 1, alignItems:'center'}}>
					<Title>{this.props.title}</Title>
				</Body>
				<Right style={{flex: 1}} />
			</Header>
		)
	}
}

export default ScreenHeaderWithBack