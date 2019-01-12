import React from 'react'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { MoneyAnimation } from '@assets'
import { Container, Header, Button, Icon, Text,  Left, Body, Right, Title } from 'native-base'

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
	googleButton: {
		alignSelf: 'center', 
		color: '#E64032',
		borderColor: '#E64032'
	},
	flex: {
		flex: 1
	}
})

class LoginScreen extends React.Component {
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
					<Button iconLeft bordered style={styles.googleButton} >
						<Icon type="MaterialCommunityIcons" name="google" style={{fontSize: 28, color: '#E64032'}}/>
						<Text style={{ color: '#707070'}} >Login with Google</Text>
					</Button>
				</Body>
			</Container>
		)
	}
}

export default LoginScreen