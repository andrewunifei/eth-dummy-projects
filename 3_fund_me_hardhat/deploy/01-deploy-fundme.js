const { networkConfig, localNets } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

// hre (hardhat environment) é um objeto com as funções do Hardhat exemp: run, ethers, network
module.exports = async({
    getNamedAccounts,
    deployments,
    network
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Price feed address
    let ETHUSDPriceFeedAdress

    if(localNets.includes(network.name)){
        const ETHUSDAggregator = await deployments.get("MockV3Aggregator")
        ETHUSDPriceFeedAdress = ETHUSDAggregator.address
    }
    else{
        ETHUSDPriceFeedAdress = networkConfig[chainId]["ETHUSDPriceFeedAddress"]
    }

    // Quando trabalhando no localhost, ganache ou hardhat nós usamos mock
    const args = [
        ETHUSDPriceFeedAdress,
    ]

    const fundMe = await deploy("FundMe", {
        contract: "FundMe",
        from: deployer,
        args,
        log: true,
        waitConfimations: network.config.blockConfirmation || 1,
    })

    if(!localNets.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(fundMe.address, args)
    }

    log("FundMe is deployed.")
    log("-----------------")
}

module.exports.tags = ["all", "fundme"]