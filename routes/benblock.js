// routes/benblock.js

var express = require('express');
const {Transaction, Block, Blockchain} = require('../src/main');
var router = express.Router();

/* POST return initialized blockchain */
router.get('/initBlockchain', function(req, res, next){

    const chain = new Blockchain();
    res.json(chain);

});

/* POST create transaction */
router.post('/createTransaction', function(req, res, next){
    
    const trustedTrade = JSON.parse(req.body.chain);
       
    trustedTrade.pendingTransactions.push(new Transaction(req.body.from, req.body.to, parseInt(req.body.amount)));
    
    res.json(trustedTrade);  
    
});

/* POST mine a new block */
router.post('/mineBlock', function(req, res, next){
    
    const trustedTrade = JSON.parse(req.body.chain);
    const minersAddress = req.body.address;
    
    Blockchain.minePendingTransactions(trustedTrade, minersAddress);
    
    res.json(trustedTrade);  
    
});

router.post('/getBalance', function(req, res, next) {
    
    const trustedTrade = JSON.parse(req.body.chain);
    const balanceAddress = req.body.address;

    let balance  = Blockchain.getBalanceOfAddress(trustedTrade, balanceAddress)
    res.json({"balance": balance});
});

module.exports = router;
