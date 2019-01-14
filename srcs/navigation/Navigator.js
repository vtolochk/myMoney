import React from 'react'
import createHistory from 'history/createMemoryHistory'
import { Route, Router, Switch } from 'react-router-native'
import { LoginScreen, MainScreen, AddExpense } from '@screens'
import { DEFAULT_PATH, ADD_EXPENSE_PATH } from './Paths'

const history = createHistory()

const Navigator = () => (
	<Router history={history}>
		<Switch>
			<Route exact path={DEFAULT_PATH} component={LoginScreen} />
			<Route exact path={ADD_EXPENSE_PATH} component={AddExpense} />
			<Route component={MainScreen} />
		</Switch>
	</Router>
)

export default Navigator