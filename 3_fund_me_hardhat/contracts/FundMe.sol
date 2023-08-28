// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

error FundMe__NotOwner();

/// @title A contract for crowd funding 
/// @author Andrew E. O.
/// @notice This contract is to learn Solidity technicalities

contract FundMe {
    using PriceConverter for uint256;

    // Get ABI through contract interface
    AggregatorV3Interface public priceFeed;
    uint constant MINIMUM_USD = 50 * 1e18;
    address public immutable i_ownerAddress;  
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    modifier owner {
        if(msg.sender != i_ownerAddress) {
            revert FundMe__NotOwner(); 
        }
        _; // The underscore is to execute the rest of the function
    }

    constructor(address priceFeedAddress){
        i_ownerAddress = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /// @notice This function fund this contract
    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "Didn't send enough.");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    /// @notice This function withdrawn the contract funds to the deployer address
    function withdraw() public owner {
        for(uint256 i; i < funders.length; i++){
            addressToAmountFunded[funders[i]] = 0;
        }

        // Reset array
        funders = new address[](0);

        // "call method" – For the most part using call is the recommended way to send and receive ether 
        // call can be used to call virtually any function in all of Ethereum without the abi
        (bool callStatus, /* bytes memory data */) = payable(msg.sender).call{value: address(this).balance}("");
        require(callStatus, "Call failed");
    }
}