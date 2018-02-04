const users = {};

const startingValues = {
    cash: 100.00,
    stocks: [{
        symbol: 'GOOGL',
        shares: 40
    }]
};

function getUser(username) {
    return Promise.resolve(users[username]);
}

function getOrCreateUser(username) {
    return getUser(username).then(user => {
        if (user) {
            return user;
        }
        return updateUser({
            name: username,
            ...startingValues
        });
    });
}

function updateUser(user) {
    users[user.name] = user;
    return Promise.resolve(user);
}

function sanitize(user) {
    return {
        name: user.name,
        cash: user.cash,
        stocks: user.stocks
    };
}

module.exports = {
    getOrCreateUser,
    getUser,
    updateUser,
    sanitize
}