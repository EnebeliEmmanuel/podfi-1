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
    string description;
    ContentType _type;
    bool isStreaming;
  }

  mapping(string => address) contentIdToCreatorAddress;
  mapping(string => Content) contentIdToContent;
  mapping(address => string[]) creatorAddressToContentIds;

  constructor (address owner) Ownable(owner){}
  
  function store(string calldata _contentId, address _creatorAddress, string calldata _description, ContentType _type, bool _isStreaming) public onlyOwner {
    Content memory content = Content({
      id: _contentId,
      creatorAddress: _creatorAddress,
      description: _description,
      _type: _type,
      isStreaming: _isStreaming
    });

    require(_contentExists(contentIdToContent[_contentId]) == false, 'Content ID already taken');

    contentIdToCreatorAddress[_contentId] = _creatorAddress;
    contentIdToContent[_contentId] = content;
    creatorAddressToContentIds[_creatorAddress].push(_contentId);
  }

  function get(string calldata _contentId) public view returns (Content memory) {
    Content storage content = contentIdToContent[_contentId];
    require(_contentExists(content), 'INEXISTENT_CONTENT');
    return content;
  }

  function _contentExists(Content storage _content) internal view returns (bool) {
    return _content.creatorAddress != address(0);
  }
}
