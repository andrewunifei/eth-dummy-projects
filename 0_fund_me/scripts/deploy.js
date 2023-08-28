const { ethers } = require('hardhat')
require("dotenv").config()

async function main(){
  const contractFactory = await ethers.getContractFactory("FundMe")
  const contract = await contractFactory.deploy()

  const number = await contract.retrieve()

  console.log(number.toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
})