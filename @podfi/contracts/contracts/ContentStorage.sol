// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ContentStorage is Ownable {

  enum ContentType {
    Audio,
    Video
  }

  struct Content {
    string id;
    address creatorAddress;
    string hash;
    string title;
    string description;
    uint publishedAt;
    uint duration;
    ContentType _type;
    bool isStreaming;
  }

  mapping(string => address) contentIdToCreatorAddress;
  mapping(string => Content) contentIdToContent;
  mapping(address => string[]) creatorAddressToContentIds;

  constructor (address owner) Ownable(owner){}
  
  function store(
    string memory _contentId,
    address _creatorAddress,
    string memory _title,
    string memory _description,
    string memory _hash,
    uint _duration,
    ContentType _type,
    bool _isStreaming
  ) public onlyOwner {
    Content memory content = Content({
      id: _contentId,
      creatorAddress: _creatorAddress,
      title: _title,
      description: _description,
      hash: _hash,
      duration: _duration,
      publishedAt: block.timestamp,
      _type: _type,
      isStreaming: _isStreaming
    });

    require(_doesContentExist(contentIdToContent[_contentId]) == false, 'Content ID already taken');

    contentIdToCreatorAddress[_contentId] = _creatorAddress;
    contentIdToContent[_contentId] = content;
    creatorAddressToContentIds[_creatorAddress].push(_contentId);
  }

  function _getContentById(string memory _contentId) internal view returns (Content memory){
    return contentIdToContent[_contentId];
  }

  function getById(string memory _contentId) external view returns (Content memory) {
    Content memory content = _getContentById(_contentId);

    if (!_doesContentExist(content))
      revert('INEXISTENT_CONTENT');

    return content;
  }

  function getByCreatorAddress(address _creatorAddress) public view returns  (Content[] memory) {
    string[] memory contentIds = creatorAddressToContentIds[_creatorAddress];
    Content[] memory contents;

    for (uint i = 0; i < contentIds.length; i++) {
      contents[i]=_getContentById(contentIds[i]);
    }

    return contents;
  }

  function _doesContentExist(Content memory _content) internal view returns (bool) {
    return _content.creatorAddress != address(0);
  }
}
