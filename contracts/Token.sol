// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0 ;

contract Token {
    string public name= "HardHat token" ;
    string public symbol = "HHT";
    uint public totalSupply = 1000 ;

    address public owner;
    mapping (address=>uint)balances;

    constructor(){
        balances[msg.sender] = totalSuply;
        owner = msg.sender;
    }
    function transfer(address to, uint amount) external{
        require(balances[msg.sender]>=amount, "Not enough funds to transfer");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}