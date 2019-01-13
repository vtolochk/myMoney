import React from 'react'
import { withRouter } from 'react-router'
import { StyleSheet, View } from 'react-native'
import { Route } from 'react-router-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base'
import { Expenses, Overview, Budgets, Wallet } from '@components'

class FooterButton extends React.PureComponent {

	onButtonPress = () => {
		this.props.changeRoute(this.props.path, this.props.text)
		this.props.history.push(this.props.path)
	}

	render() {
		const { text, icon, path, activeRoute } = this.props
		return (
			<Button vertical active={activeRoute === path} onPress={this.onButtonPress}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}><Icon name={icon}/></View>
				{text && <Text numberOfLines={1} style={{fontSize: 8}}>{text}</Text>}
			</Button>
		)
	}
}

const NavigationButton = withRouter(FooterButton)


const ScreenHeader = ({ title }) => {
	return (
		<Header>
			<Left style={{flex: 1}}/>
			<Body style={{flex: 1, alignItems:'center'}}>
				<Title>{title}</Title>
			</Body>
			<Right style={{flex: 1}} />
		</Header>
	)
}

class MainScreen extends React.Component {

	state = {
		activeRoute: '/',
		open: false,
		activeTitle: 'Expenses'
	}

	changeRoute = (activeRoute, activeTitle) => {
		this.setState({ activeRoute, activeTitle })
	}

	render() {
		return (	
			<Container>
				<ScreenHeader title={this.state.activeTitle} openSide={this.openSide} />
				<Content >
					<Route path={'/expenses'} component={Expenses} />
					<Route path={'/overview'} component={Overview} />
					<Route path={'/budgets'} component={Budgets} />
					<Route path={'/wallet'} component={Wallet} />
				</Content>
				<Footer>
					<FooterTab style={styles.nav}>
						<NavigationButton text='Expenses' icon='list' path='/expenses' activeRoute={this.state.activeRoute} changeRoute={this.changeRoute}/>
						<NavigationButton text='Overview' icon='md-stats' path='/overview' activeRoute={this.state.activeRoute} changeRoute={this.changeRoute}/>
						<NavigationButton icon='add' path='/addExpense' activeRoute={this.state.activeRoute} changeRoute={this.changeRoute}/>
						<NavigationButton text='Budgets' icon='md-cash' path='/budgets' activeRoute={this.state.activeRoute} changeRoute={this.changeRoute}/>
						<NavigationButton text='Wallet' icon='settings' path='/wallet' activeRoute={this.state.activeRoute} changeRoute={this.changeRoute}/>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		padding: 10
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end'
	},
})


export default withRouter(MainScreen)