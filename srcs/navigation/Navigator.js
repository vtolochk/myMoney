import React from 'react'
import { store } from '@redux'
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import createHistory from 'history/createMemoryHistory'
import { Route, Router, Switch } from 'react-router-native'
import { DEFAULT_PATH, ADD_MONEY_PATH, CATEGORIES_PATH } from './Paths'
import { LoginScreen, MainScreen, AddMoneyScreen, CategoriesScreen } from '@screens'

const history = createHistory()

const Navigator = () => (
	<Router history={history}>
		<Provider store={store}>
			<Root>
				<Switch>
					<Route exact path={DEFAULT_PATH} component={LoginScreen} />
					<Route exact path={ADD_MONEY_PATH} component={AddMoneyScreen} />
					<Route exact path={CATEGORIES_PATH} component={CategoriesScreen} />
					<Route component={MainScreen} />
				</Switch>
			</Root>
		</Provider>
	</Router>
)

export default Navigator