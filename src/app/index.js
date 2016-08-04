/*npm package start*/
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
/*npm package end*/

/*component start*/
import workerTable from './component/workerTable/index'
import worker from './component/workerInfo/index'
/*componen end*/

import * as reducers from './reducers'

let store = createStore(
    combineReducers({...reducers, routing: routerReducer})
);

let routerHistory = useRouterHistory(createHashHistory)({queryKey: false});
let history = syncHistoryWithStore(routerHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={workerTable}/>
            <Route path="/worker/:id" component={worker}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);