import React from 'react'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { MoneyAnimation } from '@assets'
import { Container, Header, Button, Text,  Left, Body, Right, Title } from 'native-base'
import { withRouter } from 'react-router-native'
import { EXPENSES_PATH } from '@navigation'

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
		this.props.history.push(EXPENSES_PATH)
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

export default withRouter(LoginScreen)