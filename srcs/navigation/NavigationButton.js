import React from 'react'
import { withRouter } from 'react-router'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Text } from 'native-base'

const styles = StyleSheet.create({
	text: {
		fontSize: 8
	},
	buttonContent: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'center'
	},
	plusButton: {
		alignSelf: 'center', 
		position: 'absolute', 
		elevation: 4, 
		height: 65, 
		width: 65,
		bottom: 5, 
		borderRadius: 35, 
		justifyContent: 'center',
	}
})

class NavigationButton extends React.PureComponent {

	onButtonPress = () => {
		this.props.changeRoute(this.props.path, this.props.text)
		this.props.history.push(this.props.path)
	}

	render() {
		const { text, icon, path, activeRoute } = this.props

		if (!text) {
			return (<View style={styles.buttonContent}>
				<Button style={styles.plusButton} onPress={this.onButtonPress} active>
					<Icon name={icon}/>
				</Button>
			</View>)
		}
		else {
			return (	
				<Button vertical active={activeRoute === path} onPress={this.onButtonPress}>
					<View style={styles.buttonContent}><Icon name={icon}/></View>
					{text && <Text numberOfLines={1} style={styles.text}>{text}</Text>}
				</Button>
			)
		}
	}
}

export default withRouter(NavigationButton)