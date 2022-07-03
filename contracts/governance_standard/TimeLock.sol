// We want to wait for a new vote to be "executed"
// Imagin that everyone who holds the governance token has to pay 5 tokens for voting
// With this contrat, we will give time to users to "get out" if they dont like a governance update

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    //mintDelay: How long you have to wait before executing
    //proposers: The list of addresses that can propose
    //executors: Who can execute when a proposal passes

    constructor(
        uint256 mindDelay,
        address[] memory proposers,
        address[] memory executors
    ) TimelockController(mindDelay, proposers, executors) {}
}
