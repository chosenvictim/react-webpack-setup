/**
 * Entry point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store';
import 'whatwg-fetch';

// Base stylesheet
import './styles/index.scss'
// Import Routes
import routes from './routes';

const store = configureStore(browserHistory, {});
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store = {store} key="provider">
        <Router history={history}>
            {routes()}
        </Router>
    </Provider>, document.getElementById('root')
);
