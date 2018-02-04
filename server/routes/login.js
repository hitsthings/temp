var express = require('express');
var router = express.Router();
var nocache = require('nocache');

const auth = require('../services/authentication');
const users = require('../services/users');

router.post('/', function(req, res, next) {
    const { username, password } = req.body;
    auth.login(username, password)
        .then(user => {
            req.session.user = user;
            res.send({
                user: users.sanitize(user)
            });
        })
        .catch(next);
});

router.get('/', nocache(), function(req, res, next) {
    auth.currentUser().then(user => res.send(user ? {
        user: users.sanitize(user)
    } : null)); return;

    const user = req.session.user;
    if (!user) {
        res.send(null);
    } else {
        res.send({
            user: users.sanitize(user)
        });
    }
});

module.exports = router;
