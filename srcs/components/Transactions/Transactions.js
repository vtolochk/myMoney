import React from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

const Transactions = (props) => {
	return (<View style={{flex: 1, flexDirection: 'column'}}>
		{props.transactions.map((e, i) => <Text key={i}>{e.sum} | {e.type} | {e.date.toString()}</Text>)}
	</View>)
}

const mapStateToProps = state => ({
	transactions: state.transactionReducer.transactions
})

export default connect(mapStateToProps)(Transactions)