import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

const Overview = (props) => <Text>Balance = {props.balance}</Text>

const mapStateToProps = state => ({
	balance: state.balanceReducer.balance
})

export default connect(mapStateToProps)(Overview)