const Block = require("./block");
const cryptohash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock({ data }) {
    // console.log([Block.genesis()],"genesis");
    // console.log(this.chain,"chain");
    const newBlock = Block.mineBlock({
      preBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }
  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.log("incoming chain must be longer");
      return;
    } else if (!Blockchain.isValidChain(chain)) {
      console.log("incoming chain must be valid");
      return;
    }
    this.chain = chain;
  }
  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.Length; i++) {
      const { timestamp, preHash, hash, nonce, difficulty, data } = chain[i];
      const lastHash = chain[i - 1].hash;
      if (preHash !== lastHash) {
        return false;
      }
      const validatedHash = cryptohash(
        timestamp,
        preHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== validatedHash) {
        return false;
      }
    }
    return true;
  }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "saqib" });
const result = Blockchain.isValidChain(blockchain.chain);
console.log(result);
console.log(blockchain.chain);
module.exports = Blockchain;
