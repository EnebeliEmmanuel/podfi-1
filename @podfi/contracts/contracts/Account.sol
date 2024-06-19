// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Account as ThirdwebAccount, IEntryPoint} from "@thirdweb-dev/contracts/prebuilts/account/non-upgradeable/Account.sol";

contract Account is ThirdwebAccount {
  constructor(
    IEntryPoint _entrypoint,
    address _factory
  ) ThirdwebAccount(_entrypoint, _factory) {
    _disableInitializers();
  }
}
