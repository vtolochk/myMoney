export const isNumber = (number) => {    
	const numberPattern = new RegExp(/^(?:[1-9][0-9]*|0)$/)
	return numberPattern.test(number)
}