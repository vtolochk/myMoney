import React from 'react'
import { LoginScreen, MainScreen, AddExpense } from '@screens'
import { Route, Router, Switch } from 'react-router-native'
import createHistory from 'history/createMemoryHistory'

const history = createHistory()

const Navigator = () => (
	<Router history={history}>
		<Switch>
			<Route exact path='/' component={LoginScreen} />
			<Route exact path='/AddExpense' component={AddExpense} />
			<Route component={MainScreen} />
		</Switch>
	</Router>
)

export default Navigator