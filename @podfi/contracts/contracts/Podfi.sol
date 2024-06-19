// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { UserStorage} from "./UserStorage.sol";
import { ContentStorage} from "./ContentStorage.sol";

contract Podfi {
  UserStorage userStorage;
  ContentStorage contentStorage;

  constructor () {
    userStorage = new UserStorage(address(this));
    contentStorage = new ContentStorage(address(this));
  }

  function registerUser(string memory _username,
                        string memory _name,
                        string memory _bio,
                        string memory _profilePictureHash) external{
    userStorage.store(msg.sender,
                      _username,
                      _name,
                      _bio,
                      _profilePictureHash);
  }

  function getUserProfile() public view returns (UserStorage.User memory) {
    return userStorage.getByAddress(msg.sender);
  }

  function getUserByUsername(string memory _username) external view returns (UserStorage.User memory) {
    return userStorage.getByUsername(_username);
  }

  function getUserContentsByUsername(string memory _username) external view returns (ContentStorage.Content[] memory) {
    UserStorage.User memory user = userStorage.getByUsername(_username);
    return contentStorage.getByCreatorAddress(user.addr);
  }

  function storeContent (string memory _contentId, address _creatorAddress, string memory _title, string memory _description, string memory _hash, uint _duration, ContentStorage.ContentType _type, bool _isStreaming) public {
    require(msg.sender == _creatorAddress, "CREATOR_SIGNER_MISMATCH");
    contentStorage.store(_contentId, _creatorAddress, _title, _description, _hash, _duration, _type, _isStreaming);
  }
}

