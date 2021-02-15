import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import reducer from './reducers/reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import thunk from 'redux-thunk';
import App from './App'
import Table from './components/Table/Table'
import { syncHistoryWithStore } from 'react-router-redux';


const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));   // reducer
const hashHistory = createBrowserHistory();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>  
      <Route path="/" component={App}/>

      <Switch>
          <Route path="/table" component={Table}/>
          <Redirect from="*" to="/"/>
      </Switch>
    </Router>
  </Provider>,

  
  document.getElementById('root')
);

