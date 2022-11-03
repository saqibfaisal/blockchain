// const { GENESIS_BLOCK } = require("./config");
// const cryptoHash = require("./crypto-hash");
// class Block {
//   constructor({ timestamp, preHash, hash, data }) {
//     this.timestamp = timestamp;
//     this.preHash = preHash;
//     this.hash = hash;
//     this.data = data;
//   }
//   static genesis() {
//     return new this(GENESIS_BLOCK);
//   }
//   static mineBlock(preBlock, data) {
//     const timestamp = Date.now();
//     const preHash = preBlock.hash;
//     return new this({
//       timestamp,
//       preHash,
//       data,
//       hash:cryptoHash(timestamp,preHash,data),
//     });
//   }
// }
// const genesisBlock = new Block(GENESIS_BLOCK);
// console.log(genesisBlock);

// const block1 = new Block({
//   timestamp: "05/11/2022",
//   preHash: "00000",
//   hash: "0xc12",
//   data: "hello ",
// });
// console.log(block1);

// const block3 = new Block({
//     timestamp: "07/11/2022",
//     preHash: "0xc12",
//     hash: "0xabc",
//     data: "world",
// });
// console.log(block3);
// const result  = Block.mineBlock(block3,{name:"saqib","abc":"xyz"})
// console.log(result);

const { GENESIS_BLOCK } = require("./config");
const cryptoHash = require("./crypto-hash");
class Block {
  constructor({ timestamp, preHash, hash, data,nonce,difficulty }) {
    this.timestamp = timestamp;
    this.preHash = preHash;
    this.hash = hash;
    this.data = data;
    this.nonce=nonce;
    this.difficulty=difficulty;
  }
  static genesis() {
    return new this(GENESIS_BLOCK);
  }
  static mineBlock({preBlock, data}) {
    const timestamp = Date.now();
    const preHash = preBlock.hash;
    return new this({
      timestamp,
      preHash,
      data,
      hash: cryptoHash(timestamp, preHash, data),
    });
  }
}
module.exports = Block;
