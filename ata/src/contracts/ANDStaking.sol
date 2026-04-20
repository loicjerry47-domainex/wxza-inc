// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title AND Token Staking Contract
 * @notice Allows users to stake AND tokens for governance power and rewards
 * @dev Features:
 *      - Multiple staking tiers with different lockup periods
 *      - Voting power multipliers based on stake duration
 *      - Flexible reward distribution
 *      - Early unstaking penalties
 */
contract ANDStaking is ReentrancyGuard, AccessControl, Pausable {
    using SafeERC20 for IERC20;
    
    // ========== CONSTANTS ==========
    
    bytes32 public constant REWARD_DISTRIBUTOR_ROLE = keccak256("REWARD_DISTRIBUTOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    uint256 public constant PRECISION = 1e18;
    uint256 public constant YEAR = 365 days;
    
    // ========== STRUCTS ==========
    
    struct StakingTier {
        uint256 duration;           // Lock duration in seconds
        uint256 votingMultiplier;   // Voting power multiplier (100 = 1x, 200 = 2x)
        uint256 rewardMultiplier;   // Reward multiplier (100 = 1x, 150 = 1.5x)
        uint256 earlyUnstakePenalty; // Penalty percentage (10 = 10%)
        bool active;                // Whether tier is active
    }
    
    struct Stake {
        uint256 amount;             // Amount of tokens staked
        uint256 startTime;          // When the stake started
        uint256 unlockTime;         // When the stake can be withdrawn
        uint8 tierId;               // Staking tier ID
        uint256 rewardDebt;         // Reward debt for reward calculation
        uint256 votingPower;        // Calculated voting power
    }
    
    // ========== STATE VARIABLES ==========
    
    IERC20 public immutable andToken;
    
    /// @notice Staking tiers configuration
    mapping(uint8 => StakingTier) public stakingTiers;
    
    /// @notice User stakes
    mapping(address => Stake[]) public stakes;
    
    /// @notice Total tokens staked
    uint256 public totalStaked;
    
    /// @notice Total voting power across all stakers
    uint256 public totalVotingPower;
    
    /// @notice Accumulated reward per share
    uint256 public accRewardPerShare;
    
    /// @notice Total rewards distributed
    uint256 public totalRewardsDistributed;
    
    /// @notice Reward pool balance
    uint256 public rewardPool;
    
    /// @notice Emergency withdrawal enabled
    bool public emergencyWithdrawEnabled;
    
    // ========== EVENTS ==========
    
    event Staked(address indexed user, uint256 amount, uint8 tierId, uint256 stakeId);
    event Unstaked(address indexed user, uint256 amount, uint256 stakeId, uint256 penalty);
    event RewardClaimed(address indexed user, uint256 reward, uint256 stakeId);
    event RewardDistributed(uint256 amount);
    event TierAdded(uint8 indexed tierId, uint256 duration, uint256 votingMultiplier);
    event TierUpdated(uint8 indexed tierId, bool active);
    event EmergencyWithdrawEnabled();
    
    // ========== CONSTRUCTOR ==========
    
    constructor(address _andToken) {
        require(_andToken != address(0), "Invalid token address");
        andToken = IERC20(_andToken);
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REWARD_DISTRIBUTOR_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        
        // Initialize default staking tiers
        _initializeDefaultTiers();
    }
    
    // ========== INTERNAL FUNCTIONS ==========
    
    function _initializeDefaultTiers() internal {
        // Tier 0: No lockup (1x voting, 1x rewards, 50% penalty)
        stakingTiers[0] = StakingTier({
            duration: 0,
            votingMultiplier: 100,
            rewardMultiplier: 100,
            earlyUnstakePenalty: 50,
            active: true
        });
        
        // Tier 1: 3 months (1.2x voting, 1.1x rewards, 20% penalty)
        stakingTiers[1] = StakingTier({
            duration: 90 days,
            votingMultiplier: 120,
            rewardMultiplier: 110,
            earlyUnstakePenalty: 20,
            active: true
        });
        
        // Tier 2: 6 months (1.5x voting, 1.25x rewards, 15% penalty)
        stakingTiers[2] = StakingTier({
            duration: 180 days,
            votingMultiplier: 150,
            rewardMultiplier: 125,
            earlyUnstakePenalty: 15,
            active: true
        });
        
        // Tier 3: 12 months (2x voting, 1.5x rewards, 10% penalty)
        stakingTiers[3] = StakingTier({
            duration: 365 days,
            votingMultiplier: 200,
            rewardMultiplier: 150,
            earlyUnstakePenalty: 10,
            active: true
        });
        
        // Tier 4: 24 months (3x voting, 2x rewards, 5% penalty)
        stakingTiers[4] = StakingTier({
            duration: 730 days,
            votingMultiplier: 300,
            rewardMultiplier: 200,
            earlyUnstakePenalty: 5,
            active: true
        });
    }
    
    function _calculateVotingPower(uint256 amount, uint8 tierId) 
        internal 
        view 
        returns (uint256) 
    {
        StakingTier memory tier = stakingTiers[tierId];
        return (amount * tier.votingMultiplier) / 100;
    }
    
    function _calculateReward(Stake memory _stake) 
        internal 
        view 
        returns (uint256) 
    {
        StakingTier memory tier = stakingTiers[_stake.tierId];
        uint256 effectiveStake = (_stake.amount * tier.rewardMultiplier) / 100;
        uint256 pending = (effectiveStake * accRewardPerShare) / PRECISION - _stake.rewardDebt;
        return pending;
    }
    
    // ========== USER FUNCTIONS ==========
    
    /**
     * @notice Stake AND tokens
     * @param amount Amount to stake
     * @param tierId Staking tier (0-4)
     */
    function stake(uint256 amount, uint8 tierId) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        require(amount > 0, "Cannot stake 0");
        require(tierId < 5, "Invalid tier");
        require(stakingTiers[tierId].active, "Tier not active");
        
        StakingTier memory tier = stakingTiers[tierId];
        
        // Transfer tokens from user
        andToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Calculate voting power
        uint256 votingPower = _calculateVotingPower(amount, tierId);
        
        // Create stake
        Stake memory newStake = Stake({
            amount: amount,
            startTime: block.timestamp,
            unlockTime: block.timestamp + tier.duration,
            tierId: tierId,
            rewardDebt: (amount * tier.rewardMultiplier * accRewardPerShare) / (100 * PRECISION),
            votingPower: votingPower
        });
        
        stakes[msg.sender].push(newStake);
        
        // Update global state
        totalStaked += amount;
        totalVotingPower += votingPower;
        
        emit Staked(msg.sender, amount, tierId, stakes[msg.sender].length - 1);
    }
    
    /**
     * @notice Unstake tokens
     * @param stakeId Index of the stake to unstake
     */
    function unstake(uint256 stakeId) 
        external 
        nonReentrant 
    {
        require(stakeId < stakes[msg.sender].length, "Invalid stake ID");
        
        Stake storage _stake = stakes[msg.sender][stakeId];
        require(_stake.amount > 0, "Stake already withdrawn");
        
        uint256 amount = _stake.amount;
        uint256 penalty = 0;
        
        // Check if early unstaking
        if (block.timestamp < _stake.unlockTime && !emergencyWithdrawEnabled) {
            StakingTier memory tier = stakingTiers[_stake.tierId];
            penalty = (amount * tier.earlyUnstakePenalty) / 100;
        }
        
        // Calculate and claim pending rewards
        uint256 reward = _calculateReward(_stake);
        
        // Update global state
        totalStaked -= amount;
        totalVotingPower -= _stake.votingPower;
        
        // Reset stake
        _stake.amount = 0;
        _stake.votingPower = 0;
        
        // Transfer tokens back (minus penalty)
        uint256 amountToReturn = amount - penalty;
        andToken.safeTransfer(msg.sender, amountToReturn);
        
        // Transfer rewards if any
        if (reward > 0 && rewardPool >= reward) {
            rewardPool -= reward;
            andToken.safeTransfer(msg.sender, reward);
            emit RewardClaimed(msg.sender, reward, stakeId);
        }
        
        // Penalty goes to reward pool
        if (penalty > 0) {
            rewardPool += penalty;
        }
        
        emit Unstaked(msg.sender, amount, stakeId, penalty);
    }
    
    /**
     * @notice Claim rewards for a stake
     * @param stakeId Index of the stake
     */
    function claimReward(uint256 stakeId) 
        external 
        nonReentrant 
    {
        require(stakeId < stakes[msg.sender].length, "Invalid stake ID");
        
        Stake storage _stake = stakes[msg.sender][stakeId];
        require(_stake.amount > 0, "Stake withdrawn");
        
        uint256 reward = _calculateReward(_stake);
        require(reward > 0, "No rewards to claim");
        require(rewardPool >= reward, "Insufficient reward pool");
        
        // Update reward debt
        StakingTier memory tier = stakingTiers[_stake.tierId];
        _stake.rewardDebt = (_stake.amount * tier.rewardMultiplier * accRewardPerShare) / (100 * PRECISION);
        
        // Transfer reward
        rewardPool -= reward;
        andToken.safeTransfer(msg.sender, reward);
        
        emit RewardClaimed(msg.sender, reward, stakeId);
    }
    
    /**
     * @notice Emergency unstake (forfeit all rewards)
     */
    function emergencyUnstake(uint256 stakeId) 
        external 
        nonReentrant 
    {
        require(emergencyWithdrawEnabled, "Emergency withdraw not enabled");
        require(stakeId < stakes[msg.sender].length, "Invalid stake ID");
        
        Stake storage _stake = stakes[msg.sender][stakeId];
        require(_stake.amount > 0, "Stake already withdrawn");
        
        uint256 amount = _stake.amount;
        
        // Update global state
        totalStaked -= amount;
        totalVotingPower -= _stake.votingPower;
        
        // Reset stake
        _stake.amount = 0;
        _stake.votingPower = 0;
        
        // Return principal only (no rewards)
        andToken.safeTransfer(msg.sender, amount);
        
        emit Unstaked(msg.sender, amount, stakeId, 0);
    }
    
    // ========== ADMIN FUNCTIONS ==========
    
    /**
     * @notice Distribute rewards to stakers
     * @param amount Amount of tokens to distribute
     */
    function distributeRewards(uint256 amount) 
        external 
        onlyRole(REWARD_DISTRIBUTOR_ROLE) 
    {
        require(amount > 0, "Cannot distribute 0");
        require(totalStaked > 0, "No active stakes");
        
        // Transfer reward tokens to contract
        andToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Update reward pool and accumulator
        rewardPool += amount;
        accRewardPerShare += (amount * PRECISION) / totalStaked;
        totalRewardsDistributed += amount;
        
        emit RewardDistributed(amount);
    }
    
    /**
     * @notice Add or update staking tier
     * @param tierId Tier ID
     * @param duration Lock duration
     * @param votingMultiplier Voting power multiplier
     * @param rewardMultiplier Reward multiplier
     * @param earlyUnstakePenalty Early unstake penalty percentage
     */
    function setStakingTier(
        uint8 tierId,
        uint256 duration,
        uint256 votingMultiplier,
        uint256 rewardMultiplier,
        uint256 earlyUnstakePenalty
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(tierId < 10, "Max 10 tiers");
        require(votingMultiplier >= 100, "Min 1x voting multiplier");
        require(rewardMultiplier >= 100, "Min 1x reward multiplier");
        require(earlyUnstakePenalty <= 100, "Max 100% penalty");
        
        stakingTiers[tierId] = StakingTier({
            duration: duration,
            votingMultiplier: votingMultiplier,
            rewardMultiplier: rewardMultiplier,
            earlyUnstakePenalty: earlyUnstakePenalty,
            active: true
        });
        
        emit TierAdded(tierId, duration, votingMultiplier);
    }
    
    /**
     * @notice Toggle tier active status
     * @param tierId Tier ID
     * @param active New status
     */
    function setTierStatus(uint8 tierId, bool active) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        stakingTiers[tierId].active = active;
        emit TierUpdated(tierId, active);
    }
    
    /**
     * @notice Enable emergency withdrawal
     */
    function enableEmergencyWithdraw() 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        emergencyWithdrawEnabled = true;
        emit EmergencyWithdrawEnabled();
    }
    
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    // ========== VIEW FUNCTIONS ==========
    
    /**
     * @notice Get all stakes for a user
     * @param user User address
     * @return Array of stakes
     */
    function getUserStakes(address user) 
        external 
        view 
        returns (Stake[] memory) 
    {
        return stakes[user];
    }
    
    /**
     * @notice Get total voting power for a user
     * @param user User address
     * @return Total voting power
     */
    function getUserVotingPower(address user) 
        external 
        view 
        returns (uint256) 
    {
        uint256 votingPower = 0;
        Stake[] memory userStakes = stakes[user];
        
        for (uint256 i = 0; i < userStakes.length; i++) {
            if (userStakes[i].amount > 0) {
                votingPower += userStakes[i].votingPower;
            }
        }
        
        return votingPower;
    }
    
    /**
     * @notice Get pending rewards for a stake
     * @param user User address
     * @param stakeId Stake ID
     * @return Pending reward amount
     */
    function getPendingReward(address user, uint256 stakeId) 
        external 
        view 
        returns (uint256) 
    {
        if (stakeId >= stakes[user].length) return 0;
        Stake memory _stake = stakes[user][stakeId];
        if (_stake.amount == 0) return 0;
        return _calculateReward(_stake);
    }
    
    /**
     * @notice Get staking statistics
     * @return _totalStaked Total tokens staked
     * @return _totalVotingPower Total voting power
     * @return _rewardPool Current reward pool
     * @return stakingAPY Estimated APY (basis points)
     */
    function getStakingStats() 
        external 
        view 
        returns (
            uint256 _totalStaked,
            uint256 _totalVotingPower,
            uint256 _rewardPool,
            uint256 stakingAPY
        ) 
    {
        _totalStaked = totalStaked;
        _totalVotingPower = totalVotingPower;
        _rewardPool = rewardPool;
        
        // Calculate APY based on last year's rewards
        // Simplified: APY = (totalRewardsDistributed / totalStaked) * 100
        stakingAPY = totalStaked > 0 
            ? (totalRewardsDistributed * 10000) / totalStaked 
            : 500; // Default 5% if no data
    }
}
