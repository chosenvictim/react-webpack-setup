import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import redditPost from './redditPost';

export default combineReducers({
    redditPost,
    routing: routerReducer
});
