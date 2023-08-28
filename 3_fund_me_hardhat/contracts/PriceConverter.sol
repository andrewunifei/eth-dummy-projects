// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns(uint256) {
        (
            /* uint80 roundId */,
            int256 price, // ETH/USD
            /* uint256 startedAt */,
            /* uint256 timeStamp */,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();

        uint256 ethAmountInUsd = (uint256(price * 1e10) * ethAmount) / 1e18;

        return ethAmountInUsd;
    }
}