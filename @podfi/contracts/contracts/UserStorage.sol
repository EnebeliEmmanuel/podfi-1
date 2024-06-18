// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract UserStorage is Ownable {

  struct User {
    string username;
    address addr;
    string profilePictureHash;
  }

  mapping(address => User) addressToUser;
  mapping(string => address) usernameToAddress;

  constructor (address owner) Ownable(owner){}

  function _getByUsername (string calldata username) internal view returns (User storage) {
    return _getByAddress(usernameToAddress[username]);
  }

  function getByUsername (string calldata username) public view returns (User memory) {
    User storage user = _getByUsername(username);
    require(_checkUserExists(user), "INEXISTENT_USER");
    return user;
  }

  function _getByAddress (address addr) internal view returns (User storage) {
    return addressToUser[addr];
  }

  function getByAddress (address addr) public view returns (User memory) {
    User storage user = _getByAddress(addr);
    require(_checkUserExists(user), "INEXISTENT_USER");
    return user;
  }

  function store(address _userAddress, string calldata _username, string calldata _profilePictureHash) public onlyOwner {
    require(_checkUserExists(_getByUsername(_username)) == false, "USER_ALREADY_EXISTS");
    require(_checkUserExists(_getByAddress(_userAddress)) == false, "USER_ALREADY_EXISTS");

    User memory user = User({
      username: _username,
      addr: _userAddress,
      profilePictureHash: _profilePictureHash
    });
    addressToUser[msg.sender] = user;
    usernameToAddress[_username] = msg.sender;
  }

  function _checkUserExists(User memory _user) public pure returns (bool) {
    return _user.addr != address(0);
  }
}
