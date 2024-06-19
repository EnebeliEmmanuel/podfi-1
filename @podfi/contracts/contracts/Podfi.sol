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

  function registerUser(string calldata _username, string calldata _profilePictureHash) external{
    userStorage.store(msg.sender, _username, _profilePictureHash);
  }

  function getUserProfile() public view returns (UserStorage.User memory) {
    return userStorage.getByAddress(msg.sender);
  }

  function getUserByUsername(string calldata _username) external view returns (UserStorage.User memory) {
    return userStorage.getByUsername(_username);
  }

  function getUserContentsByUsername(string calldata _username) external view returns (ContentStorage.Content memory) {
    UserStorage user = userStorage.getUserByUsername(_username);
    return contentStorage.getByCreatorAddress(user.addr);
  }

  function storeContent (string calldata _contentId, address _creatorAddress, string calldata _description, ContentStorage.ContentType _type, bool _isStreaming) public {
    require(msg.sender == _creatorAddress, "CREATOR_SIGNER_MISMATCH");
    contentStorage.store(_contentId, _creatorAddress, _description, _type, _isStreaming);
  }
}

