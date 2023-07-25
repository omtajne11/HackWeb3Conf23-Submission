// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleLendingProtocol {
    address public owner;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public depositedTimestamps;
    uint256 public totalDeposits;

    IERC20 public token; // The ERC20 token used for lending

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function deposit(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");

        token.transferFrom(msg.sender, address(this), _amount);
        balances[msg.sender] += _amount;
        totalDeposits += _amount;
        depositedTimestamps[msg.sender] = block.timestamp;
    }

    function withdraw(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        require(_amount > 0, "Amount must be greater than 0");

        balances[msg.sender] -= _amount;
        totalDeposits -= _amount;

        token.transfer(msg.sender, _amount);
    }

    function calculateInterest(address _user) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - depositedTimestamps[_user];
        uint256 interestRate = 5; // 5% interest per year (for demonstration purposes)

        return (balances[_user] * interestRate * timeElapsed) / (365 days * 86400);
    }

    function claimInterest() external {
        uint256 interest = calculateInterest(msg.sender);
        require(interest > 0, "No interest to claim");

        token.transfer(msg.sender, interest);
    }
}