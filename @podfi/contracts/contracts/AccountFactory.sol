// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {BaseAccountFactory, IEntryPoint} from "@thirdweb-dev/contracts/prebuilts/account/utils/BaseAccountFactory.sol";
import { Account } from "./Account.sol";

contract AccountFactory is BaseAccountFactory {

event Registered(string username, address account);
mapping(string => address) public usernameToAccount;

constructor(
    IEntryPoint _entrypoint
  )
    BaseAccountFactory(
      address(new Account(_entrypoint, address(this))), address(_entrypoint)
    )
  {}

  function _initializeAccount(
    address _account,
    address _admin,
    bytes calldata _data
  ) internal override {
    Account(payable(_account)).initialize(_admin, "");
  }

  function onRegistered( string calldata username) external {
  address account = msg.sender;
  require(this.isRegistered(account), "Not an account");
  require(usernameToAccount[username] == address(0), "Username taken");
  usernameToAccount[username] = account;
  emit Registered(username, account);
  }
}
