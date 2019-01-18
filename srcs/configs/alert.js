import { Alert } from 'react-native'

export const alert = (title = '', message = '', okFunc, cancelFunc = () => {}) => Alert.alert(
	title,
	message,
	[ 
		{ text: 'OK', onPress: okFunc },
		{ text: okFunc ? 'Cancel' : '', onPress: cancelFunc}
	],
	{ cancelable: false }
)

export const comingSoonAlert = () => {
	alert('Coming soon!', 'Not supported yet.')
}