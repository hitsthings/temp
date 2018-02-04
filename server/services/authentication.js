const users = require('./users');

let HACK_AROUND_SESSION; // TODO - fix this bug with session


function login(username, password) {
    HACK_AROUND_SESSION = username;
    //TODO - actually implement login
    return users.getOrCreateUser(username);
}

function currentUser() {
    return users.getUser(HACK_AROUND_SESSION);
}

module.exports = {
    login,
    currentUser
};