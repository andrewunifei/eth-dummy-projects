// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

error NotOwner();



contract FundMe {
    using PriceConverter for uint256;

    uint constant MINIMUM_USD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_ownerAddress;

    constructor(){
        i_ownerAddress = msg.sender;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= MINIMUM_USD, "Didn't send enough.");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdrawn() public owner {
        for(uint256 i; i < funders.length; i++){
            addressToAmountFunded[funders[i]] = 0;
        }

        // Reset array
        funders = new address[](0);

        // payble(address) -> cast the type address to type payable address

        // "transfer method"
        // payable(msg.sender).transfer(address(this).balance);

        // "send method"
        // Only reverts with require statement
        // bool sendStatus = payable(msg.sender).send(address(this).balance);
        // require(sendStatus, "Send failed"); 

        // "call method" – For the most part using call is the recommended way to send and receive ether 
        // call can be used to call virtually any function in all of Ethereum without the abi
        (bool callStatus, /* bytes memory data */) = payable(msg.sender).call{value: address(this).balance}("");
        require(callStatus, "Call failed");
    }

    modifier owner {
        if(msg.sender != i_ownerAddress) {
            revert NotOwner(); 
        }
        _; // The underscore is to execute the rest of the function
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}