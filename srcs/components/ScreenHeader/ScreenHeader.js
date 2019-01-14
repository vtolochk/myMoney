import React from 'react'
import { Header,Button, Icon, Left, Body, Right, Title } from 'native-base'

class ScreenHeader extends React.PureComponent {
	render() {
		const { title, history, withBackButton } = this.props

		const withButton = <Left>
			<Button transparent onPress={() => { history.goBack() }}><Icon name='arrow-back' /></Button>
		</Left>
		
		return (
			<Header>
				{ withBackButton ? withButton : <Left style={{flex: 1}}/> }
				<Body style={{flex: 1, alignItems:'center'}}>
					<Title>{title}</Title>
				</Body>
				<Right style={{flex: 1}} />
			</Header>
		)
	}
}

export default ScreenHeader