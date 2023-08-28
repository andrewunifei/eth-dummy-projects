const networkConfig = {
    11155111: {
        name: "sepolia",
        ETHUSDPriceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}

const localNets = ["hardhat", "ganache"]
const testNets = ["sepolia"]

const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = { 
    networkConfig,
    localNets,
    testNets,
    DECIMALS,
    INITIAL_ANSWER
}