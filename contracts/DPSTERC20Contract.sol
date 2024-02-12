// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0;

import "./erc20/AccessControl.sol";
import "./erc20/utils/Context.sol";
import "./erc20/ERC20.sol";
import "./erc20/ERC20Burnable.sol";
import { OFTCore } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";

contract DPSTERC20Contract is OFTCore, AccessControl, ERC20Burnable {

    // Defi Pool Share Token decimal
    uint8 public constant _decimals = 18;
    // Total supply for the DPST = 10M
    uint256 private _totalSupply = 10000000 * (10 ** uint256(_decimals));
    // DPST deployer
    address private _dpstDeployer;


    constructor(
      string memory name,
      string memory symbol,
      address _lzEndpoint, // LayerZero Endpoint address
      address _owner // token owner
    ) ERC20(name, symbol, msg.sender) OFT(_name, _symbol, _lzEndpoint, _owner) Ownable(_owner) {
        _dpstDeployer = msg.sender;
        _mint(_dpstDeployer, _totalSupply);
    }
    // @dev major indicates they shared a compatible msg payload format and CAN communicate between one another
    // @dev minor indicates a varying version, eg. OFTAdapter vs. OFT
    function oftVersion() external pure returns (uint64 major, uint64 minor) {
        return (1, 1);
    }

    function token() external view virtual returns (address) {
        return address(this);
    }

    // @dev burn the tokens from the users specified balance
    function _debitSender(
        uint256 _amountToSendLD,
        uint256 _minAmountToReceiveLD,
        uint32 _dstEid
    ) internal virtual override returns (uint256 amountDebitedLD, uint256 amountToCreditLD) {
        (amountDebitedLD, amountToCreditLD) = _debitView(_amountToSendLD, _minAmountToReceiveLD, _dstEid);

        _burn(msg.sender, amountDebitedLD);
    }

    // @dev burn the tokens that someone has sent into this contract in a push method
    // @dev allows anyone to send tokens that have been sent to this contract
    // @dev similar to how you can push tokens to the endpoint to pay the msg fee, vs the endpoint needing approval
    function _debitThis(
        uint256 _minAmountToReceiveLD,
        uint32 _dstEid
    ) internal virtual override returns (uint256 amountDebitedLD, uint256 amountToCreditLD) {
        (amountDebitedLD, amountToCreditLD) = _debitView(balanceOf(address(this)), _minAmountToReceiveLD, _dstEid);

        _burn(address(this), amountDebitedLD);
    }
    // @dev _srcEid The source chain ID
    function _credit(
        address _to,
        uint256 _amountToCreditLD,
        uint32 /*_srcEid*/
    ) internal virtual override returns (uint256 amountReceivedLD) {
        _mint(_to, _amountToCreditLD);
        return _amountToCreditLD;
    }
}