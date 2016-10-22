import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './containers/Home';

export default () => {
    /*
    * Please keep routes in alphabetical order
    */
    return (
        <Route path="/" component = { App }>
            <Route path = "home" component = { Home } />
        </Route>
    );
}
