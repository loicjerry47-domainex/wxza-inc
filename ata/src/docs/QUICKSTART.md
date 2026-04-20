# AND TOKEN - QUICK START GUIDE
## For Developers & Stakeholders

**Last Updated:** November 28, 2025

---

## 📁 WHERE TO FIND EVERYTHING

### **Smart Contracts**
```
/contracts/
├── ANDToken.sol          👈 Main ERC-20 token (governance + burns)
├── ANDStaking.sol        👈 Staking system (5 tiers, rewards)
└── ANDGovernance.sol     👈 On-chain voting (OpenZeppelin Governor)
```

### **Documentation**
```
/docs/
├── tokenomics.md                       👈 Complete tokenomics model
├── legal-framework.md                  👈 Regulatory compliance strategy
├── governance-framework.md             👈 DAO governance system
├── AND-Token-Implementation-Summary.md 👈 Full implementation overview
└── QUICKSTART.md                       👈 This file
```

### **React Components**
```
/components/token/
└── ANDTokenDashboard.tsx  👈 Interactive token UI (5 tabs)

/components/prototypes/
└── AtableNeuralPrototype.tsx  👈 Main WXZA dashboard (includes token section)
```

---

## 🚀 VIEWING THE TOKEN DASHBOARD

### **In the WXZA Portfolio Dashboard:**

1. Navigate to the WXZA portfolio page
2. Click the **"AND Token"** tab in the navigation
3. Explore 5 interactive sections:
   - **Overview:** Live metrics, price targets, statistics
   - **Tokenomics:** Allocation, vesting, value accrual
   - **Staking:** Tiers, APY calculator, rewards
   - **Governance:** Active proposals, voting parameters
   - **Legal:** Compliance roadmap, audits, risks

---

## 📖 READING THE DOCUMENTATION

### **1. Start with Tokenomics** (`tokenomics.md`)
**Read this first** to understand:
- Token allocation (who gets what)
- Vesting schedules (when tokens unlock)
- Value accrual (buyback-burn + staking)
- Price projections (Year 1/3/5)

**Key Sections:**
- Token Allocation (page 1)
- Vesting Schedules Summary (page 3)
- Value Accrual Mechanisms (page 5)
- Price Projection Model (page 8)

---

### **2. Then Legal Framework** (`legal-framework.md`)
**Read this second** to understand:
- Why AND is likely a security
- Regulatory compliance strategy
- Entity structure (Swiss Foundation)
- Offshore launch → U.S. Reg A+ path

**Key Sections:**
- Howey Test Analysis (page 2)
- Recommended Approach (page 7)
- Entity Structure (page 9)
- Timeline (page 15)

---

### **3. Then Governance Framework** (`governance-framework.md`)
**Read this third** to understand:
- How token holders vote on decisions
- Proposal lifecycle (Ideation → Execution)
- Delegation system
- Progressive decentralization roadmap

**Key Sections:**
- Governance Parameters (page 2)
- Proposal Lifecycle (page 4)
- Proposal Types (page 6)
- Progressive Decentralization Roadmap (page 12)

---

### **4. Finally, Implementation Summary** (`AND-Token-Implementation-Summary.md`)
**Reference guide** that ties everything together:
- All 4 phases in one document
- Smart contract details
- React component structure
- Deployment roadmap
- Success metrics

---

## 💻 SMART CONTRACT OVERVIEW

### **ANDToken.sol** (Main Token)

**What It Does:**
- ERC-20 token with 1 billion supply
- Built-in governance (ERC20Votes)
- Revenue tracking per venture
- Buyback-and-burn mechanism
- Anti-whale limits

**Key Functions:**
```solidity
// Record revenue from venture X
recordVentureRevenue(uint8 ventureId, uint256 amount)

// Burn tokens bought with profits
buybackAndBurn(uint256 amount)

// Emergency pause
pause() / unpause()
```

**Initial Allocation (in constructor):**
- Treasury: 400M (40%)
- Team: 200M (20%)
- Investors: 150M (15%)
- Public: 150M (15%)
- Community: 100M (10%)

---

### **ANDStaking.sol** (Staking System)

**What It Does:**
- Users lock tokens to earn rewards
- 5 tiers (no lock → 24 months)
- Voting power multipliers (1x → 3x)
- APY from 3% to 10%

**Key Functions:**
```solidity
// Stake tokens
stake(uint256 amount, uint8 tierId)

// Unstake (with penalty if early)
unstake(uint256 stakeId)

// Claim rewards
claimReward(uint256 stakeId)
```

**Staking Tiers:**
| Tier | Lock | Voting | APY | Penalty |
|------|------|--------|-----|---------|
| 0 | None | 1.0x | 3% | 50% |
| 1 | 3mo | 1.2x | 4.5% | 20% |
| 2 | 6mo | 1.5x | 6.3% | 15% |
| 3 | 12mo | 2.0x | 7.5% | 10% |
| 4 | 24mo | 3.0x | 10% | 5% |

---

### **ANDGovernance.sol** (On-Chain Voting)

**What It Does:**
- Token holders vote on proposals
- Timelock delays execution
- Quorum requirements prevent minority control
- Delegation support

**Key Parameters:**
- Proposal threshold: 10,000 AND (0.001%)
- Quorum: 5% of circulating supply
- Voting period: 7 days
- Timelock: 72 hours (standard proposals)

**Proposal Types:**
- Standard (10K, 5% quorum, 50% pass)
- Treasury (50K, 10% quorum, 66% pass)
- Emergency (100K, 20% quorum, 75% pass)
- Constitutional (200K, 30% quorum, 80% pass)

---

## 📊 KEY NUMBERS TO REMEMBER

### **Token Basics**
- **Total Supply:** 1,000,000,000 AND
- **Decimals:** 18
- **Launch Price:** $0.30 - $0.50
- **Blockchain:** Ethereum + Polygon

### **Allocation**
- **Locked at Launch:** 92% (vesting over 4-5 years)
- **Circulating at TGE:** 80M (8%)
- **Year 1 Circulating:** 180M (18%)

### **Value Accrual**
- **Buyback Source:** 30% of portfolio net profits
- **Year 5 Buyback:** $92.6M/year
- **Staking Rewards:** 100M tokens over 5 years (20M/year)

### **Governance**
- **Min to Propose:** 10,000 AND
- **Quorum:** 5% - 30% (depends on proposal type)
- **Voting Period:** 7 days
- **Timelock:** 72 hours - 14 days

---

## 🎯 QUICK REFERENCE: WHAT GOES WHERE

### **If you want to know about...**

**Token allocation and vesting:**
→ Read: `tokenomics.md` (pages 1-4)
→ View: Dashboard → "Tokenomics" tab

**Buyback and burn mechanism:**
→ Read: `tokenomics.md` (page 5)
→ View: Dashboard → "Tokenomics" tab → "Deflationary Mechanism" card

**Staking tiers and APY:**
→ Read: `tokenomics.md` (page 7)
→ View: Dashboard → "Staking" tab
→ Code: `/contracts/ANDStaking.sol`

**Legal and compliance:**
→ Read: `legal-framework.md` (all pages)
→ View: Dashboard → "Legal" tab

**How governance works:**
→ Read: `governance-framework.md` (pages 2-8)
→ View: Dashboard → "Governance" tab
→ Code: `/contracts/ANDGovernance.sol`

**How to vote on proposals:**
→ Read: `governance-framework.md` (page 4: "Proposal Lifecycle")
→ View: Dashboard → "Governance" tab → "Active Proposals"

**Price projections:**
→ Read: `tokenomics.md` (page 8)
→ View: Dashboard → "Overview" tab → "Price Targets" card

**Security and audits:**
→ Read: `AND-Token-Implementation-Summary.md` (page 23)
→ View: Dashboard → "Legal" tab → "Security Audits" card

**Deployment timeline:**
→ Read: `AND-Token-Implementation-Summary.md` (page 22)
→ View: Dashboard → "Legal" tab → "Legal Milestones" timeline

---

## 🔐 SECURITY CHECKLIST

Before deploying:

- [ ] ✅ CertiK audit completed
- [ ] ✅ Trail of Bits audit completed
- [ ] ✅ Bug bounty program live ($500K pool)
- [ ] ✅ Testnet deployment tested (Goerli/Mumbai)
- [ ] ✅ Multi-sig wallet setup (5-of-9 signatures)
- [ ] ✅ Timelock delays configured
- [ ] ✅ Emergency pause tested
- [ ] ✅ Anti-whale limits verified

---

## 🚨 COMMON QUESTIONS

### **Q: Is AND a security?**
A: Likely yes, due to revenue-sharing via buyback-burn. We're launching offshore (Swiss Foundation) to avoid U.S. SEC jurisdiction initially, then filing Reg A+ in Year 2 for U.S. access.

### **Q: How does buyback-burn work?**
A: 30% of WXZA portfolio net profits → Convert to USDC → Buy AND from market → Burn tokens permanently. This reduces supply → increases scarcity → price up (if demand constant).

### **Q: What APY can I earn staking?**
A: Depends on lockup period:
- No lock: 3% APY
- 3 months: 4.5% APY
- 6 months: 6.3% APY
- 12 months: 7.5% APY (recommended)
- 24 months: 10% APY (max)

### **Q: How do I vote on proposals?**
A: 
1. Hold AND tokens (or have them delegated to you)
2. Wait for proposal to be submitted on-chain
3. Vote FOR/AGAINST/ABSTAIN during 7-day voting period
4. If passed, proposal executes after timelock (72hrs - 14 days)

### **Q: Can I lose my staked tokens?**
A: No, your principal is safe. However:
- Early unstaking incurs penalty (5%-50% of rewards)
- If staking contract hacked, tokens at risk (mitigated by audits)

### **Q: When can I sell my tokens?**
A:
- **Public sale participants:** 20% at TGE, 80% over 6 months
- **Team/investors:** 1-year cliff, then linear over 3 years
- **After unlock:** Anytime, subject to max transaction limits (anti-whale)

### **Q: How is this different from a meme token?**
A: AND is backed by real revenue from 9 operational ventures. Buyback amount directly tied to $1.03B Year 5 revenue target. Not speculation-driven.

### **Q: What if a venture fails?**
A: Portfolio diversification (9 ventures across 8 sectors). If 1-2 fail, others compensate. Governance can reallocate capital to successful ventures.

---

## 📞 WHO TO CONTACT

**Technical questions:**
→ tech@wxza.inc

**Legal/compliance:**
→ legal@wxza.inc

**Tokenomics/economics:**
→ ir@wxza.inc (Investor Relations)

**Governance/voting:**
→ governance@wxza.inc

**General inquiries:**
→ hello@wxza.inc

---

## 🔗 USEFUL LINKS

**Governance:**
- Forum: https://gov.wxza.inc
- Snapshot: https://snapshot.org/#/wxza.eth

**Documentation:**
- Full docs: https://docs.wxza.inc
- Litepaper: https://wxza.inc/litepaper.pdf

**Social:**
- Twitter: https://twitter.com/WXZAInc
- Discord: https://discord.gg/wxza
- Telegram: https://t.me/wxza_official

**Contracts (will be published after deployment):**
- Etherscan: https://etherscan.io/token/AND
- Token address: TBD (post-deployment)

---

## ✅ NEXT STEPS

### **For Developers:**
1. Read `/contracts/*.sol` files
2. Review React components in `/components/token/`
3. Test dashboard locally
4. Review security considerations in implementation summary

### **For Legal/Compliance:**
1. Read `legal-framework.md` in full
2. Engage Swiss legal counsel (MME Legal, Lenz & Staehelin)
3. Review Reg A+ requirements
4. Prepare KYC/AML integration plan

### **For Business/Finance:**
1. Read `tokenomics.md` in full
2. Review price projections and revenue models
3. Prepare investor pitch deck
4. Plan private sale structure

### **For Community/Marketing:**
1. Read `governance-framework.md`
2. Draft delegate recruitment plan
3. Plan forum launch (Discourse/Commonwealth)
4. Prepare community education materials

---

**This is a living document. Check for updates before major milestones.**

**Last Updated:** November 28, 2025  
**Version:** 1.0
