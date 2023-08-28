require("@nomicfoundation/hardhat-toolbox");
require("./tasks/block-number")
//require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("hardhat-gas-reporter")
require("solidity-coverage")

const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    ganache: {
      url: GANACHE_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1337
    }
  },
  solidity: "0.8.7",
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true
  }
};
 