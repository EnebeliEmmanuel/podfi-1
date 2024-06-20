// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { UserStorage} from "./UserStorage.sol";
import { PodcastStorage} from "./PodcastStorage.sol";

contract Podfi {
  UserStorage userStorage;
  PodcastStorage contentStorage;

  event PodcastSetup(string title, string description, string category, string creatorUsername);
  event UserRegistered(string username, string name, string bio, string profilePictureHash);

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

  function setupPodcast (string memory _contentId,
                         string memory _title,
                         string memory _description,
                         string memory _category
    ) public {
      UserStorage.User memory creator = userStorage.getByAddress(msg.sender);

    contentStorage.store(_contentId,
                         creator.addr,
                         _title,
                         _description,
                         _category,
                         0,
                         "",
                         "",
                         PodcastStorage.Type.Video,
                         PodcastStorage.Status.StreamingNotStarted);
                         
                         emit PodcastSetup(_title, _description, _category, creator.username);
  }
}

