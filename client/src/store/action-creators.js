export function requestLogin(username, password) {
    return {
        type: 'REQUEST_LOGIN',
        payload: {
            username,
            password
        }
    };
}

export function requestCashTrade(amount) {
    return {
        type: 'REQUEST_CASH_TRADE',
        payload: amount
    };
}

export function requestStockTrade(symbol, shares) {
    return {
        type: 'REQUEST_STOCK_TRADE',
        payload: { symbol, shares }
    };
}

export function updateUser(user) {
    return {
        type: 'UPDATE_USER',
        payload: user
    };
}

export function requestLatestQuote(symbol) {
    return {
        type: 'REQUEST_LATEST_QUOTE',
        payload: symbol
    };
}

export function updateQuote (symbolInfo) {
    return {
        type: 'UPDATE_QUOTE',
        payload: symbolInfo
    };
}