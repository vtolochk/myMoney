import React from 'react'
import { StyleSheet, View } from 'react-native'
import { withRouter } from 'react-router'
import { Button, Icon, Text } from 'native-base'

const styles = StyleSheet.create({
	text: {
		fontSize: 8
	},
	buttonContent: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'center'
	}
})

class NavigationButton extends React.PureComponent {

	onButtonPress = () => {
		this.props.changeRoute(this.props.path, this.props.text)
		this.props.history.push(this.props.path)
	}

	render() {
		const { text, icon, path, activeRoute } = this.props
		return (
			<Button vertical active={activeRoute === path} onPress={this.onButtonPress}>
				<View style={styles.buttonContent}><Icon name={icon}/></View>
				{text && <Text numberOfLines={1} style={styles.text}>{text}</Text>}
			</Button>
		)
	}
}

export default withRouter(NavigationButton)