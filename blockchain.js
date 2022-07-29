
const Block = require('./block')

const sha256 = require('js-sha256')

class Blockchain {
    constructor(genesisBlock) {
        this.blocks = []
        this.addBlock(genesisBlock) 
    }

    addBlock(block) {
        if(this.blocks.length == 0) {
            block.previousHash = "0000000000000000"
            block.hash = this.generateHash(block)
        }

        this.blocks.push(block)
    }

    getNextBlock(transactions) {
        let block = new Block() 
        transactions.forEach((transaction) => {
            block.addTransaction(transaction)
        })
        
        let previousBlock = this.getPreviousBlock() 
        block.index = this.blocks.length 
        block.previousHash = previousBlock.hash 
        block.hash = this.generateHash(block)

        return block 
    }

    getPreviousBlock() {
        return this.blocks[this.blocks.length - 1]
    }

    generateHash(block) {
        let hash = sha256(block.key)

        while(!hash.startsWith('0')) {
            block.nonce += 1 
            hash = sha256(block.key)
            console.log(hash)
        }

        return hash 
    }
}

module.exports = Blockchain 