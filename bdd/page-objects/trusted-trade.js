// ./bdd/page-objects/trusted-trade.js

var pageObject = {

  loadTrustedTradeAndVerify: function () {

    let url = 'http://localhost:3000/';
    let title = 'Trusted Trade - Speeltuin';

    return helpers.loadPage(url)
      .then(function () {
        driver.getTitle()
          .then(function (pageTitle) {
            expect(pageTitle).to.include(title);
          });
      })
  },

  enterFromAddress: function (address) {
    let elm = driver.findElement(by.id('fromAddress'));
    elm.clear();
    elm.sendKeys(address);
  },

  enterToAddress: function (address) {
    let elm = driver.findElement(by.id('toAddress'));
    elm.clear();
    elm.sendKeys(address);
  },

  enterMinerAddress: function (address) {
    let elm = driver.findElement(by.id('mineAddress'));
    elm.clear();
    elm.sendKeys(address);
  },

  enterAmount: function (amount) {
    let elm = driver.findElement(by.id('amount'));
    elm.clear();
    elm.sendKeys(amount);
  },

  clickInitBlockchain: function () {

    let buttonCaption = "Initialize Blockchain";
    return pageObject.clickButton(buttonCaption);

  },

  clickButton: function (buttonCaption) {

    var cssBC = 'input[value="' + buttonCaption + '"]';

    return driver.findElement(by.css(cssBC))
      .then(function (elm) {
        elm.click();
        //        driver.sleep(1000);
      });
  },

  numberOfBlocksIs(nr) {

    return driver.findElement(By.id('current'))
      .then(function (elm) {
        elm.getText()
          .then(function (txt) {
            let blockchain = JSON.parse(txt);
            expect(blockchain.chain.length).to.equal(nr);
          })
      });
  },

  numberOfPendingTransactionsIs(nr) {
    return driver.findElement(By.id('current'))
      .then(function (elm) {
        elm.getText()
          .then(function (txt) {
            let blockchain = JSON.parse(txt);
            expect(blockchain.pendingTransactions.length).to.equal(nr);
          })
      });
  }

};

module.exports = pageObject;
