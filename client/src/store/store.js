import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function userReducer(state = null, action) {
    if (action.type === 'UPDATE_USER') {
        return action.payload;
    }
    return state;
}

function quoteReducer(state = {}, action) {
    if (action.type === 'UPDATE_QUOTE') {
        return {
            ...state,
            [action.payload.symbol]: action.payload
        };
    }
    return state;
}

function quoteLoadingReducer(state = {}, action) {
    if (action.type === 'REQUEST_LATEST_QUOTE') {
        return {
            ...state,
            [action.payload]: true
        };
    }
    if (action.type === 'UPDATE_QUOTE') {
        return {
            ...state,
            [action.payload.symbol]: false
        };
    }
    return state;
}

export default preloadedState => createStore(combineReducers({
        user: userReducer,
        quotes: quoteReducer,
        quoteLoading: quoteLoadingReducer
    }),
    preloadedState,
    applyMiddleware(thunk));