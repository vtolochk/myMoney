import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Header,Button, Icon, Left, Body, Right, Title } from 'native-base'

const styles = StyleSheet.create({
	headerBody: {
		flex: 1, 
		alignItems:'center'
	},
	flex: {
		flex: 1
	},
	title: {
		minWidth: 100
	}
})

class ScreenHeader extends React.PureComponent {
	render() {
		const { title, history, withBackButton } = this.props

		const withButton = <Left>
			<Button transparent onPress={() => { history.goBack() }}><Icon name='arrow-back' /></Button>
		</Left>
		
		return (
			<Header>
				{ withBackButton ? withButton : <Left style={styles.flex}/> }
				<Body style={styles.headerBody}>
					<Title style={styles.title}>{title}</Title>
				</Body>
				<Right style={styles.flex} />
			</Header>
		)
	}
}

ScreenHeader.propTypes = {
	history: PropTypes.object,
	title: PropTypes.string,
	withBackButton: PropTypes.bool
}

export default ScreenHeader