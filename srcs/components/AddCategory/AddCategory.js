import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import ScreenHeader from '../ScreenHeader/ScreenHeader'
import { Container, Content, Input, Icon, Button, Text } from 'native-base'

const styles = StyleSheet.create({
	input: {
		margin: 5,
		fontSize: 28,
		borderBottomWidth: 0.3,
		borderBottomColor: 'grey',  
	},
	buttonsContainer : {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-around',
	},
	flexCenter: {
		flex: 1,
		margin: 5,
		justifyContent: 'center',
	}
})

class AddCategory extends React.Component {

    state = {
    	categoryName: ''
    }
	
    render() {
    	const { onSave, onClose } = this.props
    	return (
    		<Container>
    			<ScreenHeader title='New category'/>
    			<Content>
    				<Input
    					style={styles.input}
    					autoFocus
    					value={this.state.categoryName} 
    					onChangeText={ categoryName => this.setState({categoryName}) }>
    				</Input>
    				<View style={styles.buttonsContainer}>
    					<Button style={styles.flexCenter} onPress={ () => onSave(this.state.categoryName) }>
    						<Icon name='md-checkmark' />
    						<Text>Save</Text>
    					</Button>
    					<Button style={styles.flexCenter} onPress={onClose}>
    						<Icon name='md-close' />
    						<Text>Cancel</Text>
    					</Button>
    				</View>
    			</Content>
    		</Container>
    	)
    }
}

AddCategory.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

// It would be great to create separate component for buttons

export default AddCategory