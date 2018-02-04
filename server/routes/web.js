var express = require('express');
var router = express.Router();
var path = require('path');

var PUBLIC_DIR = path.join(__dirname, '..', '..', 'client', 'build');

function renderReact(res) {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
};

router.get('/', function(req, res, next) {
  renderReact(res);
});

module.exports = router;
