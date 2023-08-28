const { deployments, ethers, getNamedAccounts } = require("Hardhat")
const { assert, expect } = require("chai")

/*
Comentários sobre Unit Tests.

Unit Tests basicamente é testar cada pedaço do código (funções principalmente) 
com a intenção de verificar se o fragmento se comporta da forma como é esperado.
O teste leva em consideração se os parâmetros de entrada e saída, e os comportamentos internos
estão de acordo com a expectativa do desenvolver

Por exemplo o "constructor" do contrato "FundMe" está esperando como parâmetro de entrada
o endereço do contrato AggregatorV3. Então podemos testar se isso está acontecendo corretamente
*/

describe("FundMe", async () => {
    let fundMe 
    let deployer
    let mockV3Aggregator
    const ethAmount = "1000000000000000000"

    beforeEach(async () => {
        // Deploy
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    })

    describe("constructor", async () => {
        it("Sets the aggregator addresses correctly", async () => {
            const response = await fundMe.priceFeed()

            assert.equal(response, mockV3Aggregator.target)
        })
    })

    describe("fund", async () => {
        it("Fails if you don't send enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWith("Didn't send enough.") 
        })

        it("Updated the amount funded data structure", async () => {
            // A minha transação chama a função "fund" do contrato
            // e o parâmetro "value" é a quatidade de ether enviada na mensagem da transação
            await fundMe.fund({value: ethAmount}) 
            const response = await fundMe.addressToAmountFunded(deployer)

            assert.equal(response.toString(), ethAmount)
        })

        it("Adds funder to array of funders", async () => {
            await fundMe.fund({value: ethAmount})
            const response = await fundMe.funders(0)

            assert.equal(response, deployer)
        })
    })

    describe("withdraw", async () => {
        beforeEach(async () => {
            await fundMe.fund({value: ethAmount})
        })

        it("All funds correctly goes to owner", async () => {
            const contractBalanceBefore = await ethers.provider.getBalance(fundMe.target)
            const ownerBalanceBefore = await ethers.provider.getBalance(deployer)

            const response = await fundMe.withdraw()
            const receipt = await response.wait(1)
            const { gasUsed, gasPrice } = receipt
            const gasCost = gasUsed * gasPrice
            
            const contractBalanceAfter = await ethers.provider.getBalance(fundMe.target)
            const ownerBalanceAfter = await ethers.provider.getBalance(deployer)

            assert.equal(contractBalanceAfter, 0)
            assert.equal(
                ((ownerBalanceAfter + gasCost) - contractBalanceBefore).toString(),
                (ownerBalanceBefore).toString())
        })

        // it("Ordinary users can't access this function", async () => {
        //     await expect().to.be.reverted()
        // })
    })
})