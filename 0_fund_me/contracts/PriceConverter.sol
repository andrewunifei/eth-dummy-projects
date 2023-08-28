// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
        function getPrice() internal view returns(uint256) {
        // Get ABI through contract interface
        // Address 0x694AA1769357215DE4FAC081bf1f309aDC325306

        address priceFeedContractAdress = 0x694AA1769357215DE4FAC081bf1f309aDC325306;

        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedContractAdress);

        (
            /* uint80 roundId */,
            int256 price, // ETH/USD
            /* uint256 startedAt */,
            /* uint256 timeStamp */,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();

        return uint256(price * 1e10);
    }

    function getConversionRate(uint256 ethAmount) internal view returns(uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;

        return ethAmountInUsd;
    }
}