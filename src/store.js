import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers/index';

export default function configureStore(browserHistory, initialState) {
    const middlewares = [routerMiddleware(browserHistory), thunkMiddleware];
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );
    return store;
}
