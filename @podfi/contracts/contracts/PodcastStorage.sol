// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PodcastStorage is Ownable {

  enum Type {
    Audio,
    Video
  }

  enum Status {
    StreamingStarted,
    StreamingEnded
  }

  struct Podcast {
    string id;
    address creatorAddress;
    string title;
    string description;
    uint duration;
    string recordingHash;
    string streamingCode;
    Type type_;
    Status status;
    uint publishedAt;
  }

  mapping(string => address) podcastIdToCreatorAddress;
  mapping(string => Podcast) podcastIdToPodcast;
  mapping(address => string[]) creatorAddressToPodcastIds;

  constructor (address owner) Ownable(owner){}
  
  function store(
    string memory _id,
    address _creatorAddress,
    string memory _title,
    string memory _description,
    uint _duration,
    string memory _recordingHash,
    string memory _streamingCode,
    string memory _type,
    Status _status
  ) public onlyOwner {

    if (_doesPodcastExist(podcastIdToPodcast[_id]))
        revert('PODCAST_ID_TAKEN_ERROR');

    Podcast memory podcast = Podcast({
      id: _id,
      creatorAddress: _creatorAddress,
      title: _title,
      description: _description,
      duration: _duration,
      recordingHash: _recordingHash,
      streamnigCode: _streamingCode,
      type_: _type,
      status: _status,
      publishedAt: block.timestamp
    });

    podcastIdToCreatorAddress[_id] = _creatorAddress;
    podcastIdToPodcast[_id] = podcast;
    creatorAddressToPodcastIds[_creatorAddress].push(_id);
  }

  function update(
    string memory _id,
    string memory _title,
    string memory _description,
    uint _duration,
    string memory _recordingHash,
    string memory _streamingCode,
    string memory _type,
    Status status
  ) public onlyOwner {

    if (!_doesPodcastExist(podcastIdToPodcast[_id]))
        revert('INEXISTENT_PODCAST_ERROR');

    Podcast storage podcast = podcastIdToPodcast[_id];
    podcast.title = _title;
    podcast.description = _description;
    podcast.duration = _duration;
    podcast.recordingHash = _recordingHash;
    podcast.streamingCode = _streamingCode;
    podcast.type_ = _type;
    podcast.status = _status;
  }

  function _getPodcastById(string memory _id) internal view returns (Podcast memory){
    return podcastIdToPodcast[_id];
  }

  function getById(string memory _podcastId) external view returns (Podcast memory) {
    Podcast memory podcast = _getPodcastById(_podcastId);

    if (!_doesPodcastExist(podcast))
      revert('INEXISTENT_PODCAST_ERROR');

    return podcast;
  }

  function getByCreatorAddress(address _creatorAddress) public view returns  (Podcast[] memory) {
    string[] memory podcastIds = creatorAddressToPodcastIds[_creatorAddress];
    Podcast[] memory podcasts;

    for (uint i = 0; i < podcastIds.length; i++) {
      podcasts[i]=_getPodcastById(podcastIds[i]);
    }

    return podcasts;
  }

  function _doesPodcastExist(Podcast memory _podcast) internal view returns (bool) {
    return _podcast.creatorAddress != address(0);
  }
}
