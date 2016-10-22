import actionTypes from '../actions/actionTypes';
const initialState = {
    posts: []
};

export default function redditPost(state = initialState, action) {
    switch(action.type) {
        case actionTypes.GET_REDDIT_POST_SUCCESS: {
            return Object.assign({}, state, {
                posts: action.payload.data.children
            });
        }

        default: {
            return state;
        }
    }
}
