// main.js

const SHA256 = require('crypto-js/SHA256');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    //        console.log(this);
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
};

class Blockchain {
  constructor() {
    //        console.log('constructing new chain');
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;

  }

  createGenesisBlock() {
    return new Block(Date.now(), "Genesis block", "0");
  }

  getLatestBlock(trustedTradeChain) {
    return trustedTradeChain.chain[trustedTradeChain.chain.length - 1];
  }

  static minePendingTransactions(trustedTradeChain, miningRewardAddress) {
    console.log('mining ...');

    console.log('trustedTradeChain.pendingTransactions', trustedTradeChain.pendingTransactions);
    console.log('this.getLatestBlock(trustedTradeChain).hash', trustedTradeChain.chain[trustedTradeChain.chain.length - 1].hash);

    let block = new Block(Date.now(), trustedTradeChain.pendingTransactions, trustedTradeChain.chain[trustedTradeChain.chain.length - 1].hash);
    console.log('new block');
    block.mineBlock(trustedTradeChain.difficulty);

    console.log("Block successfully mined.");
    trustedTradeChain.chain.push(block);

    trustedTradeChain.pendingTransactions = [
            new Transaction(null, miningRewardAddress, trustedTradeChain.miningReward)
        ]
  }

  createTransaction(transaction) {
    //        console.log('pushing transaction');
    this.pendingTransactions.push(transaction);
  }

  static getBalanceOfAddress(trustedTradeChain, address) {
    let balance = 0;

    for (const block of trustedTradeChain.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {

      let currentBlock = this.chain[i];
      let previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      };

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      };
    }
    return true;
  }
};

module.exports = {
  Transaction,
  Block,
  Blockchain
};
