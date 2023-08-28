const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
  let contractFactory, contract

  beforeEach(
    async () => {
      contractFactory = await ethers.getContractFactory("SimpleStorage")
      contract = await contractFactory.deploy()
      await contract.addPerson("Andrew", 1)
    }
  )

  it("Retrieved number should be equal to 1", async () => {
    const retrievedNumber = await contract.retrieve("Andrew")
    const expectedNumber = "1"

    assert.equal(retrievedNumber.toString(), expectedNumber)
  })
})