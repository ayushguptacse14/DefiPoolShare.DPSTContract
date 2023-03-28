// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0;

import "./erc20/AccessControl.sol";
import "./erc20/utils/Context.sol";
import "./erc20/ERC20.sol";
import "./erc20/ERC20Burnable.sol";

contract DPSTERC20Contract is AccessControl, ERC20Burnable {

    // Defi Pool Share Token decimal
    uint8 public constant _decimals = 18;
    // Total supply for the DPST = 10M
    uint256 private _totalSupply = 10000000 * (10 ** uint256(_decimals));
    // DPST deployer
    address private _dpstDeployer;

    constructor(
      string memory name,
      string memory symbol
    ) ERC20(name, symbol, msg.sender) {
        _dpstDeployer = msg.sender;
        _mint(_dpstDeployer, _totalSupply);
    }
}