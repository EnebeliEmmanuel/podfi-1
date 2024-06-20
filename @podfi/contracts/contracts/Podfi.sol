// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { UserStorage} from "./UserStorage.sol";
import { PodcastStorage} from "./PodcastStorage.sol";

contract Podfi {
  UserStorage userStorage;
  PodcastStorage contentStorage;

  constructor () {
    userStorage = new UserStorage(address(this));
    contentStorage = new PodcastStorage(address(this));
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

  function getUserPodcastsByUsername(string memory _username) external view returns (PodcastStorage.Podcast[] memory) {
    UserStorage.User memory user = userStorage.getByUsername(_username);
    return contentStorage.getByCreatorAddress(user.addr);
  }

  function storePodcast (string memory _contentId,
                         string memory _title,
                         string memory _description,
                         uint _duration,
                         string memory _recordingHash,
                         string memory _streamingCode,
                         PodcastStorage.Type _type,
                         PodcastStorage.Status _status
    ) public {
    if (msg.sender != _creatorAddress)
      revert("CREATOR_SIGNER_MISMATCH");

    contentStorage.store(_contentId,
                         msg.sender,
                         _title,
                         _description,
                         _duration,
                         _recordingHash,
                         _streamingCode,
                         _type,
                         _status);
  }
}

