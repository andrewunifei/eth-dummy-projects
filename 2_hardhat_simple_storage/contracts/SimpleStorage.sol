// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract SimpleStorage {
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    mapping(string => uint) public nameToFavoriteNumber;

    function retrieve(string memory _name)  public view returns (uint256) {
        return nameToFavoriteNumber[_name];
    }

    function addPerson(string memory _name, uint256 _favoriteNumber)  public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}

