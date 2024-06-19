// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {console} from "hardhat/console.sol";

contract UserStorage is Ownable {
  
  struct User {
    string username;
    address addr;
    string profilePictureHash;
  }

  mapping(address => User) addressToUser;
  mapping(string => address) usernameToAddress;

  constructor (address owner) Ownable(owner){}

  function _getByUsername (string calldata _username) internal view returns (User storage) {
    return _getByAddress(usernameToAddress[_username]);
  }

  function getByUsername (string calldata _username) external view returns (User memory) {
    User storage user = _getByUsername(_username);

    if (!_doesUserExist(user))
      revert("INEXISTENT_USER_ERROR");

    return user;
  }

  function _getByAddress (address _addr) internal view returns (User storage) {
    return addressToUser[_addr];
  }

  function getByAddress (address addr) external view returns (User memory) {
    User storage user = _getByAddress(addr);

    if (!_doesUserExist(user))
      revert("INEXISTENT_USER_ERROR");

    return user;
  }

  function store(address _userAddress, string calldata _username, string calldata _profilePictureHash) public onlyOwner {
    if (_doesUserExist(_getByUsername(_username)) || _doesUserExist(_getByAddress(_userAddress)))
      revert("USER_ALREADY_REGISTERED_ERROR");

    User memory user = User({
      username: _username,
      addr: _userAddress,
      profilePictureHash: _profilePictureHash
    });
    addressToUser[_userAddress] = user;
    usernameToAddress[_username] = _userAddress;
  }

  function _doesUserExist(User memory _user) public pure returns (bool) {
    return _user.addr != address(0);
  }
}
