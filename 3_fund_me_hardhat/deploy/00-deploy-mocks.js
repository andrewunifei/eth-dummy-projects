const { localNets, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config")

// hre (hardhat environment) é um objeto com as funções do Hardhat, ex: run, ethers, network
module.exports = async({
    getNamedAccounts,
    deployments,
    network
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if(localNets.includes(network.name)){
        log("Local network detected. Deploying mocks...")

        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            args: [
                DECIMALS,
                INITIAL_ANSWER,
            ],
            log: true,
        })
        
        log("Mock is deployed.")
        log("-----------------")
    }
}

module.exports.tags = ["all", "mocks"]