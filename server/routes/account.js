var express = require('express');
var router = express.Router();
var nocache = require('nocache');

var auth = require('../services/authentication');
var users = require('../services/users');
var pricing = require('../services/pricing');

router.post('/cash', nocache(), async function(req, res, next) {
  const amount = req.body.amount;
  const user = await auth.currentUser();
  if (user.cash + amount >= 0) {
    const updated = {
      ...user,
      cash: user.cash + amount
    };
    await users.updateUser(updated);
    res.send({
      user: users.sanitize(updated)
    });
  } else {
    res.status(400).send({
      user: users.sanitize(user)
    });
  }
});

router.post('/shares/:symbol', nocache(), async function(req, res, next) {
  const shares = req.body.shares;
  const symbol = req.params.symbol;
  const user = await auth.currentUser();
  const ownStock = user.stocks.filter((stock) => stock.symbol === symbol)[0];
  const ownShares = ownStock && ownStock.shares || 0;

  const quote = await pricing.getLatestQuote(symbol);
  const cost = quote.close * shares;

  if ((user.cash - cost >= 0) && (ownShares + shares >= 0)) {
    const updated = {
      ...user,
      cash: user.cash - cost,
      stocks: user.stocks.filter((stock) => stock.symbol !== symbol).concat({
        symbol,
        shares: ownShares + shares
      })
    };
    await users.updateUser(updated);
    res.send({
      user: users.sanitize(updated)
    });
  } else {
    res.status(400).send({
      user: users.sanitize(user)
    });
  }
});

module.exports = router;
