var express = require('express');
var router = express.Router();
var nocache = require('nocache');

const pricing = require('../services/pricing');

router.get('/:symbol/latest', nocache(), function(req, res, next) {
    const symbol = req.params.symbol;
    pricing.getLatestQuote(symbol)
        .then(latest => {
            res.send({
                quote: {
                    symbol,
                    latest
                }
            });
        });
});

module.exports = router;
