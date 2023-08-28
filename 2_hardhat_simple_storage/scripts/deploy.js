const { ethers, run, network } = require('hardhat')
require("dotenv").config()

async function main(){
  const contractFactory = await ethers.getContractFactory("SimpleStorage")
  const contract = await contractFactory.deploy()

  await contract.addPerson("Andrew", 1)
  const number = await contract.retrieve("Andrew")

  console.log(number.toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
})