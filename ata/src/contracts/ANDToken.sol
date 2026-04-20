// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title AND Token - Aggregated Network Dividend Token
 * @notice ERC-20 governance token for WXZA Inc. 9-venture portfolio
 * @dev Implements:
 *      - ERC20Votes for on-chain governance
 *      - ERC20Permit for gasless approvals
 *      - Burnable for deflationary tokenomics
 *      - AccessControl for role-based permissions
 *      - Pausable for emergency stops
 * 
 * Token Economics:
 * - Total Supply: 1,000,000,000 AND
 * - Decimals: 18
 * - Features: Governance voting, revenue distribution, staking rewards
 */
contract ANDToken is 
    ERC20, 
    ERC20Burnable, 
    ERC20Votes, 
    ERC20Permit, 
    AccessControl, 
    Pausable,
    ReentrancyGuard 
{
    // ========== CONSTANTS ==========
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant REVENUE_DISTRIBUTOR_ROLE = keccak256("REVENUE_DISTRIBUTOR_ROLE");
    
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant MAX_SUPPLY = TOTAL_SUPPLY; // Hard cap, no infinite minting
    
    // ========== STATE VARIABLES ==========
    
    /// @notice Tracks total revenue distributed to token holders
    uint256 public totalRevenueDistributed;
    
    /// @notice Tracks total tokens burned for deflationary mechanism
    uint256 public totalBurned;
    
    /// @notice Address of the staking contract
    address public stakingContract;
    
    /// @notice Address of the governance contract
    address public governanceContract;
    
    /// @notice Address of the revenue distribution contract
    address public revenueDistributor;
    
    /// @notice Mapping of venture IDs to their revenue contribution
    mapping(uint8 => uint256) public ventureRevenue;
    
    /// @notice Anti-whale: Maximum transaction amount (1% of supply initially)
    uint256 public maxTransactionAmount = TOTAL_SUPPLY / 100;
    
    /// @notice Anti-whale: Maximum wallet balance (2% of supply initially)
    uint256 public maxWalletBalance = TOTAL_SUPPLY / 50;
    
    /// @notice Whitelist for exchanges and contracts (exempt from limits)
    mapping(address => bool) public isWhitelisted;
    
    // ========== EVENTS ==========
    
    event RevenueDistributed(uint256 amount, uint256 timestamp);
    event VentureRevenueRecorded(uint8 indexed ventureId, uint256 amount);
    event StakingContractUpdated(address indexed newStakingContract);
    event GovernanceContractUpdated(address indexed newGovernanceContract);
    event RevenueDistributorUpdated(address indexed newDistributor);
    event MaxTransactionAmountUpdated(uint256 newAmount);
    event MaxWalletBalanceUpdated(uint256 newAmount);
    event WhitelistUpdated(address indexed account, bool status);
    event TokensBuybackAndBurned(uint256 amount, uint256 timestamp);
    
    // ========== CONSTRUCTOR ==========
    
    /**
     * @notice Initializes the AND token with complete allocation
     * @param treasuryAddress Address to receive treasury allocation (40%)
     * @param teamAddress Address to receive team allocation (20%)
     * @param investorAddress Address to receive investor allocation (15%)
     * @param publicSaleAddress Address to receive public sale allocation (15%)
     * @param communityAddress Address to receive community rewards (10%)
     */
    constructor(
        address treasuryAddress,
        address teamAddress,
        address investorAddress,
        address publicSaleAddress,
        address communityAddress
    ) 
        ERC20("WXZA Aggregated Network Dividend", "AND") 
        ERC20Permit("WXZA Aggregated Network Dividend")
    {
        require(treasuryAddress != address(0), "Treasury address cannot be zero");
        require(teamAddress != address(0), "Team address cannot be zero");
        require(investorAddress != address(0), "Investor address cannot be zero");
        require(publicSaleAddress != address(0), "Public sale address cannot be zero");
        require(communityAddress != address(0), "Community address cannot be zero");
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(REVENUE_DISTRIBUTOR_ROLE, msg.sender);
        
        // Token Allocation
        _mint(treasuryAddress, TOTAL_SUPPLY * 40 / 100);      // 400M tokens
        _mint(teamAddress, TOTAL_SUPPLY * 20 / 100);          // 200M tokens
        _mint(investorAddress, TOTAL_SUPPLY * 15 / 100);      // 150M tokens
        _mint(publicSaleAddress, TOTAL_SUPPLY * 15 / 100);    // 150M tokens
        _mint(communityAddress, TOTAL_SUPPLY * 10 / 100);     // 100M tokens
        
        // Whitelist deployer and initial addresses
        isWhitelisted[msg.sender] = true;
        isWhitelisted[treasuryAddress] = true;
        isWhitelisted[teamAddress] = true;
    }
    
    // ========== CORE FUNCTIONS ==========
    
    /**
     * @notice Records revenue from a specific venture
     * @param ventureId ID of the venture (0-8 for the 9 ventures)
     * @param amount Revenue amount in USD (18 decimals)
     */
    function recordVentureRevenue(uint8 ventureId, uint256 amount) 
        external 
        onlyRole(REVENUE_DISTRIBUTOR_ROLE) 
    {
        require(ventureId < 9, "Invalid venture ID");
        require(amount > 0, "Amount must be greater than 0");
        
        ventureRevenue[ventureId] += amount;
        totalRevenueDistributed += amount;
        
        emit VentureRevenueRecorded(ventureId, amount);
        emit RevenueDistributed(amount, block.timestamp);
    }
    
    /**
     * @notice Buyback and burn mechanism (30% of portfolio profits)
     * @param amount Amount of tokens to burn
     */
    function buybackAndBurn(uint256 amount) 
        external 
        onlyRole(REVENUE_DISTRIBUTOR_ROLE) 
        nonReentrant 
    {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        totalBurned += amount;
        
        emit TokensBuybackAndBurned(amount, block.timestamp);
    }
    
    /**
     * @notice Update staking contract address
     * @param _stakingContract New staking contract address
     */
    function setStakingContract(address _stakingContract) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(_stakingContract != address(0), "Invalid address");
        stakingContract = _stakingContract;
        isWhitelisted[_stakingContract] = true;
        emit StakingContractUpdated(_stakingContract);
    }
    
    /**
     * @notice Update governance contract address
     * @param _governanceContract New governance contract address
     */
    function setGovernanceContract(address _governanceContract) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(_governanceContract != address(0), "Invalid address");
        governanceContract = _governanceContract;
        isWhitelisted[_governanceContract] = true;
        emit GovernanceContractUpdated(_governanceContract);
    }
    
    /**
     * @notice Update revenue distributor address
     * @param _revenueDistributor New revenue distributor address
     */
    function setRevenueDistributor(address _revenueDistributor) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(_revenueDistributor != address(0), "Invalid address");
        revenueDistributor = _revenueDistributor;
        _grantRole(REVENUE_DISTRIBUTOR_ROLE, _revenueDistributor);
        emit RevenueDistributorUpdated(_revenueDistributor);
    }
    
    /**
     * @notice Update max transaction amount
     * @param _maxTransactionAmount New maximum transaction amount
     */
    function setMaxTransactionAmount(uint256 _maxTransactionAmount) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(_maxTransactionAmount >= TOTAL_SUPPLY / 1000, "Too restrictive"); // Min 0.1%
        maxTransactionAmount = _maxTransactionAmount;
        emit MaxTransactionAmountUpdated(_maxTransactionAmount);
    }
    
    /**
     * @notice Update max wallet balance
     * @param _maxWalletBalance New maximum wallet balance
     */
    function setMaxWalletBalance(uint256 _maxWalletBalance) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(_maxWalletBalance >= TOTAL_SUPPLY / 100, "Too restrictive"); // Min 1%
        maxWalletBalance = _maxWalletBalance;
        emit MaxWalletBalanceUpdated(_maxWalletBalance);
    }
    
    /**
     * @notice Update whitelist status for an address
     * @param account Address to update
     * @param status Whitelist status
     */
    function setWhitelist(address account, bool status) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        isWhitelisted[account] = status;
        emit WhitelistUpdated(account, status);
    }
    
    // ========== EMERGENCY FUNCTIONS ==========
    
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    // ========== OVERRIDES ==========
    
    /**
     * @dev Override _beforeTokenTransfer to add:
     *      - Pausable functionality
     *      - Anti-whale limits
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
        
        // Skip limits for whitelisted addresses (exchanges, contracts)
        if (isWhitelisted[from] || isWhitelisted[to]) {
            return;
        }
        
        // Skip limits for minting and burning
        if (from == address(0) || to == address(0)) {
            return;
        }
        
        // Anti-whale: Max transaction amount
        require(amount <= maxTransactionAmount, "Exceeds max transaction amount");
        
        // Anti-whale: Max wallet balance
        require(
            balanceOf(to) + amount <= maxWalletBalance,
            "Exceeds max wallet balance"
        );
    }
    
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }
    
    function _mint(address to, uint256 amount) 
        internal 
        override(ERC20, ERC20Votes) 
    {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        super._mint(to, amount);
    }
    
    function _burn(address account, uint256 amount) 
        internal 
        override(ERC20, ERC20Votes) 
    {
        super._burn(account, amount);
    }
    
    // ========== VIEW FUNCTIONS ==========
    
    /**
     * @notice Get total revenue for a specific venture
     * @param ventureId Venture ID (0-8)
     * @return Total revenue contributed by the venture
     */
    function getVentureRevenue(uint8 ventureId) external view returns (uint256) {
        require(ventureId < 9, "Invalid venture ID");
        return ventureRevenue[ventureId];
    }
    
    /**
     * @notice Get circulating supply (total supply - burned)
     * @return Circulating supply amount
     */
    function circulatingSupply() external view returns (uint256) {
        return totalSupply();
    }
    
    /**
     * @notice Get deflationary stats
     * @return burnRate Percentage of total supply burned (in basis points)
     */
    function getDeflationaryStats() external view returns (uint256 burnRate) {
        burnRate = (totalBurned * 10000) / TOTAL_SUPPLY; // Basis points
    }
}
