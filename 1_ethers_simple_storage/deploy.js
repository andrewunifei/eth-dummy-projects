// Código para implementar um contrato inteligente na Blockchain

const ethers = require('ethers') // ethers - Para comunicação com a blockchain
const fs = require('fs-extra') // filesystem - Para trabalhar os arquivos do sistema
require("dotenv").config()

async function main(){
    const RPCServer = process.env.RPC_PROVIDER
    const privateKey = process.env.PRIVATE_KEY

    const provider = new ethers.providers.JsonRpcProvider(RPCServer)
    const wallet = new ethers.Wallet(privateKey, provider)

    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi','utf8')
    const bin = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8')

    /* 
        abi: Interface para interação com o contrato usando JavaScript
        bin: Código do contrato em Solidity compilado para binário
        wallet: É necessário assinar o deploy do contrato na blockchain
    */
    const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
    const contract = await contractFactory.deploy()

    await contract.addPerson("Andrew", 1)
    const number = await contract.retrievePerson("Andrew")

    console.log(number.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
})
