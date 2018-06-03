// ./bdd/step-definitions/steps.js

module.exports = function () {

  var po = page.trustedTrade;

  this.Given(/^I am at Trusted Trade$/, function () {

    return page.trustedTrade.loadTrustedTradeAndVerify();

  });

  this.When(/^I initialize the Trusted Trade speeltuin Blockchain$/, function () {

    return po.clickInitBlockchain();

  });

  this.When(/^I show the current chain$/, function () {

    return po.clickButton("show current Blockchain");

  });

  this.When(/^transfering$/, function (table) {

    table.rows().map(function (row) {
      po.enterFromAddress(row[0]); // from address
      po.enterToAddress(row[2]); // to address
      po.enterAmount(row[1]); // amount
      po.clickButton("Add transaction");
    })
    return;

  });

  this.When(/^(.*) mines a block$/, function (miner) {

    po.enterMinerAddress(miner);
    return po.clickButton('Mine block');

  });

  this.Then(/^there is only the Genesis block$/, function () {
    //  the test will be for the length of the block array, 
    //  this should be 1 (the Genesis block only).

    return po.numberOfBlocksIs(0);

  });

  this.Then(/^there are no pending transactions$/, function () {

    return po.numberOfPendingTransactionsIs(0);

  });

  this.Then(/^I want to leave the browser open$/, function () {
    // I know, it's ugly, but to force a dump leaves the browser open ....
    driver.get('javascript:"bla"');
  });

};
