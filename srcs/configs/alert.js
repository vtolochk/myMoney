import { Alert } from 'react-native'

const alert = (title, message) => Alert.alert(
	title,
	message,
	[ { text: 'OK', onPress: () => {} } ],
	{ cancelable: false }
)

export default alert