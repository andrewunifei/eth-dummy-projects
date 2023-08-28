// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 public favoriteNumber;
    uint256 public id;

    struct People {
        uint256 favoriteNumber;
        string name;
        uint256 id;
    }

    People[] public people;

    mapping(string => uint) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber)  public {
        people.push(People(_favoriteNumber, _name, id));
        nameToFavoriteNumber[_name] = _favoriteNumber;
        id++;
    }

    function retrievePerson(string memory _name)  public view returns (uint256) {
        return nameToFavoriteNumber[_name];
    }
}

