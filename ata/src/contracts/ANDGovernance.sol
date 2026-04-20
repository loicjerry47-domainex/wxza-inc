// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/**
 * @title AND Token Governance
 * @notice On-chain governance for WXZA Inc. portfolio decisions
 * @dev OpenZeppelin Governor with:
 *      - Vote delegation support (ERC20Votes)
 *      - Quorum requirement (5% of total supply)
 *      - Timelock execution (72-hour delay)
 *      - Simple counting (For/Against/Abstain)
 */
contract ANDGovernance is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    // ========== EVENTS ==========
    
    event ProposalThresholdUpdated(uint256 oldThreshold, uint256 newThreshold);
    event VotingDelayUpdated(uint256 oldDelay, uint256 newDelay);
    event VotingPeriodUpdated(uint256 oldPeriod, uint256 newPeriod);
    
    // ========== CONSTRUCTOR ==========
    
    /**
     * @notice Initialize governance contract
     * @param _token ERC20Votes token (AND token)
     * @param _timelock TimelockController address
     * @param _votingDelay Delay before voting starts (in blocks, ~1 day = 7200 blocks)
     * @param _votingPeriod Voting duration (in blocks, ~1 week = 50400 blocks)
     * @param _proposalThreshold Minimum tokens to create proposal (10,000 AND = 0.001%)
     * @param _quorum Quorum percentage (5 = 5% of total supply)
     */
    constructor(
        IVotes _token,
        TimelockController _timelock,
        uint256 _votingDelay,
        uint256 _votingPeriod,
        uint256 _proposalThreshold,
        uint256 _quorum
    )
        Governor("WXZA AND Governance")
        GovernorSettings(
            _votingDelay,     // 1 day = 7200 blocks (12s per block)
            _votingPeriod,    // 7 days = 50400 blocks
            _proposalThreshold // 10,000 AND tokens
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorum) // 5% quorum
        GovernorTimelockControl(_timelock)
    {}
    
    // ========== OVERRIDES REQUIRED BY SOLIDITY ==========
    
    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }
    
    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }
    
    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }
    
    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }
    
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    )
        public
        override(Governor, IGovernor)
        returns (uint256)
    {
        return super.propose(targets, values, calldatas, description);
    }
    
    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }
    
    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    )
        internal
        override(Governor, GovernorTimelockControl)
    {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }
    
    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    )
        internal
        override(Governor, GovernorTimelockControl)
        returns (uint256)
    {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }
    
    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
