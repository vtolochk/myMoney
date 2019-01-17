import { Alert } from 'react-native'

export const alert = (title, message) => Alert.alert(
	title,
	message,
	[ { text: 'OK', onPress: () => {} } ],
	{ cancelable: false }
)

export const comingSoonAlert = () => {
	alert('Coming soon!', 'Not supported yet.')
}