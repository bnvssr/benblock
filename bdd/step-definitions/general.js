// ./bdd/step-definitions/general.js

module.exports = function () {

  this.Given(/^I am at Trusted Trade$/, function () {

    return page.trustedTrade.loadTrustedTradeAndVerify();

  });

}
