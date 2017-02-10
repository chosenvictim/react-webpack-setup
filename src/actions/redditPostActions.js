import { checkHttpStatus, parseJSON } from './utils';
import actionTypes from './actionTypes';
import constants from '../constants';

export default function fetchPosts(post) {
    return function(dispatch) {
        dispatch({ type: actionTypes.GET_REDDIT_POST });
        return fetch(`${constants.REDDIT_URL}/${post}.json`, {
            method: "GET"
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((jsonResponse) => {
            dispatch({
                type: actionTypes.GET_REDDIT_POST_SUCCESS,
                payload: jsonResponse
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.GET_REDDIT_POST_FAILED,
                error: error.message
            });
        })
    }
}
