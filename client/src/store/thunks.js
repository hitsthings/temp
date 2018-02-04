import {requestLogin, requestCashTrade, requestStockTrade, updateUser, requestLatestQuote, updateQuote } from './action-creators';

import { fetchApi } from '../api';

export function login(username, password, history) {
    return async dispatch => {
        dispatch(requestLogin(username, password));
        const resp = await fetchApi('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        const body = await resp.json();

        //TODO: handle errors

        dispatch(updateUser(body.user));

        history.push('/');
    }
}

export function tradeCash(amount) {
    return async dispatch => {
        dispatch(requestCashTrade(amount));
        const resp = await fetchApi('/account/cash', {
            method: 'POST',
            body: JSON.stringify({ amount })
        });
        const body = await resp.json();

        //TODO: handle errors

        dispatch(updateUser(body.user));
    }
}

export function tradeStock(symbol, shares) {
    return async dispatch => {
        dispatch(requestCashTrade(shares));
        const resp = await fetchApi('/account/shares/' + symbol, {
            method: 'POST',
            body: JSON.stringify({ shares })
        });
        const body = await resp.json();

        //TODO: handle errors

        dispatch(updateUser(body.user));
    }
}

export function getLatestQuote(symbol) {
    return async dispatch => {
        dispatch(requestLatestQuote(symbol));
        const resp = await fetchApi('/quote/' + symbol + '/latest');
        const body = await resp.json();

        //TODO: handle errors

        return dispatch(updateQuote(body.quote));
    }
}