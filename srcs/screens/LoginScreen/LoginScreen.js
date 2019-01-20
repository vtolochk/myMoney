import React from 'react'
import { connect } from 'react-redux'
import { authUserAction } from '@redux'
import { MoneyAnimation } from '@assets'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { TRANSACTIONS_PATH } from '@navigation'
import { withRouter } from 'react-router-native'
import { Container, Header, Button, Text,  Left, Body, Right, Title } from 'native-base'

const styles = StyleSheet.create({
	headerText: {
		alignSelf: 'center', 
		fontSize: 24, 
		color: '#707070', 
		height: 100,
	},
	body: {
		flex: 1,
		alignSelf:'center', 
		justifyContent: 'center',
	},
	flex: {
		flex: 1
	}
})

class LoginScreen extends React.Component {

	LoginUser = () => {
		this.props.setAuth(true)
		this.props.history.push(TRANSACTIONS_PATH)
	}

	componentDidUpdate() { // it takes some time to read data from async storage, so u will see login screen for a second after next login,
		if (this.props.isAuth) { // could be solved by adding load spinner
			this.props.history.push(TRANSACTIONS_PATH)
		}
	}

	render() {
		return (
			<Container>
				<Header>
					<Left style={styles.flex}/>
					<Body style={{...styles.flex, alignItems:'center'}}>
						<Title>Welcome</Title>
					</Body>
					<Right style={styles.flex} />
				</Header>
				<Body style={styles.body}>
					<Text style={styles.headerText}>Start track your money now!</Text>
					<LottieView source={MoneyAnimation} autoPlay loop />
					<Button block onPress={this.LoginUser} >
						<Text>Start now!</Text>
					</Button>
				</Body>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: state.userReducer.auth
})

const mapDispatchToProps = dispatch => ({
	setAuth: auth => dispatch(authUserAction(auth))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen))