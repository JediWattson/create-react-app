import React from 'react';
import { render } from 'react-dom'

import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import promiseApp from './reducers'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, route } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import ListenerRouterContainer from './containers/ListenerRouterContainer'

import { Provider } from 'react-redux'
import RenderRoutesContainer from './containers/RoutesContainer'
import './index.css'

const history = createHistory()
const rMiddleware = routerMiddleware(history)
const combined = combineReducers({
	routing: routerReducer,
	...promiseApp
})

const store = createStore(
	combined,
	applyMiddleware(rMiddleware),
	applyMiddleware(thunk)
)


render(
	<Provider store={store}>
		<div>
		<ListenerRouterContainer/>
		<ConnectedRouter history={history}>
			<div>
				<RenderRoutesContainer />
		   	</div>
		</ConnectedRouter>
		</div>
	</Provider>,
	document.getElementById('root')
)  