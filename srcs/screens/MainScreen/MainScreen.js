import React from 'react'
import { withRouter } from 'react-router'
import { StyleSheet } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'

const Home = () => <Text style={styles.header}>Home</Text>
const About = () => <Text style={styles.header}>About</Text>
const Topic = () => <Text style={styles.topic}>Topic</Text>

class FooterButton extends React.Component {
	render() {
		const { text, icon, path, active } = this.props
		return (
			<Button vertical active={active} onPress={() => this.props.history.push(path)}>
				<Icon name={icon} />
				<Text>{text}</Text>
			</Button>
		)
	}
}
const NavigationButton = withRouter(FooterButton)

class MainScreen extends React.Component {
	render() {
		return (<NativeRouter>
			<Container>
			
				<Header />
				<Content >
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/topics" component={Topic} />
				</Content>
				<Footer>
				
					<FooterTab>
						<NavigationButton text='Apps' icon='apps' active path='/'/>
						<NavigationButton text='Navigate' icon='navigate' path='/topics'/>
						<NavigationButton text='About' icon='ios-code' path='/about'/>
						<NavigationButton text='About' icon='md-cash' path='/about'/>
					</FooterTab>
                
				</Footer>
			</Container>
		</NativeRouter>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		padding: 10
	},
	header: {
		fontSize: 20
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end'
	},
	navItem: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		justifyContent: 'flex-end',
	},
	subNavItem: {
		padding: 5
	},
	topic: {
		textAlign: 'center',
		fontSize: 15
	}
})

export default MainScreen