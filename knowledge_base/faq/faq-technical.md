
# Technical Architecture & Security

### TL;DR
A best in class blockchain sponsored by hundreds of millions of dollars by Facebook. Our innovations are economic games that are purpose-built for our unique destination.

**What is the state of your codebase? Is it in production, audited, or under testnet use?**

Open Libra has been in production since 2019, running for 6+ years with billions in transactions processed. Our codebase is fully open-source and battle-tested through real-world usage, attacks, and exploits. We've successfully navigated hard forks, validator transitions, and protocol upgrades under adversarial conditions. The system has been stress-tested through economic cycles and regulatory pressure. Unlike many blockchain projects, we're not in testnet or beta—this is production-grade infrastructure that institutions are already using for real capital deployment.

**Why was the Move language a strategic fit for this platform, given tooling and developer availability?**

Move provides enhanced security for financial applications through resource-oriented programming that prevents common smart contract vulnerabilities. Unlike Solidity's account-based model, Move's resource types make assets truly "move" between accounts, preventing double-spending and reentrancy attacks. For institutional capital, security trumps developer convenience. We're not building a general-purpose app platform—we're building specialized infrastructure for capital deployment. Move's formalism and auditability are worth the trade-off in developer ecosystem size. The language was designed by Facebook's team specifically for institutional financial applications.

**How is validator consensus different from typical BFT or PoS systems? How does "Proof of Fee" work under real-world usage?**

Proof of Fee forces validators to compete on operational efficiency rather than capital stake or computational power. Validators propose the lowest fees they're willing to accept, and selection probability is weighted by efficiency and reputation. This reduces centralization pressures and rent-seeking behavior common in PoS systems. Under real-world usage, we've observed healthy competition driving fees down while maintaining network security through reputation mechanisms. Long-term performance matters more than short-term bidding, creating incentives for reliable, cost-effective validation.

**How does the system prevent validator extractive behavior?**

Our Proof-of-Fee mechanism forces validators to compete on cost-efficiency, not on stake or hardware scale. This discourages centralization and excessive rent-seeking.

**Do "Slow Wallets" require social consensus enforcement or is it cryptoeconomically enforced?**

Slow Wallets are enforced entirely through protocol logic—no social consensus required. The vesting mechanism is cryptoeconomically guaranteed through smart contract code that cannot be bypassed. Daily distribution amounts are fixed and automatic, with no way to accelerate vesting regardless of social pressure or market conditions. This "First In, Last Out" structure is mathematically enforced, creating predictable liquidity schedules that encourage long-term participation. The system works regardless of community sentiment or social coordination.

**What are Slow Wallets, and how do they work?**

Slow Wallets are enforced in protocol logic. They distribute funds daily with no way to accelerate vesting. This reduces volatility, limits speculation, and encourages long-term participation. This "First in–Last Out" mechanism creates a game theoretic equilibrium which reduces private insider advantages.

**How does the system respond to lost keys, black swan events, or civil attacks on matching funds?**

Lost keys are handled through multi-signature requirements for Sub-DAOs and recovery mechanisms for individual accounts. Black swan events are addressed through the same governance mechanisms we've already used successfully: validator coordination and hard forks when necessary. Civil attacks on matching funds are mitigated through decentralized fund storage, multiple independent signers, and rapid response capabilities. We've already faced and survived coordinated attacks, including legal warfare and technical exploits. The system's antifragile design becomes stronger through adversarial testing.

**How does the protocol handle black swan events?**

We've already faced one: an exploit that required coordinated upgrade and legal action. The protocol design allows for these rare but critical responses, using the same fork-based mechanism.


A best in class blockchain sponsored by hundreds of millions of dollars by Facebook. Our innovations are economic games rooted that are purpose-build for our unique destination.
11. **What is the state of your codebase? Is it in production, audited, or under testnet use?**

Open Libra has been in production since 2019, running for 6+ years with billions in transactions processed. Our codebase is fully open-source and battle-tested through real-world usage, attacks, and exploits. We've successfully navigated hard forks, validator transitions, and protocol upgrades under adversarial conditions. The system has been stress-tested through economic cycles and regulatory pressure. Unlike many blockchain projects, we're not in testnet or beta—this is production-grade infrastructure that institutions are already using for real capital deployment.

12. **Why was the Move language a strategic fit for this platform, given tooling and developer availability?**

Move provides enhanced security for financial applications through resource-oriented programming that prevents common smart contract vulnerabilities. Unlike Solidity's account-based model, Move's resource types make assets truly "move" between accounts, preventing double-spending and reentrancy attacks. For institutional capital, security trumps developer convenience. We're not building a general-purpose app platform—we're building specialized infrastructure for capital deployment. Move's formalism and auditability are worth the trade-off in developer ecosystem size. The language was designed by Facebook's team specifically for institutional financial applications.

13. **How is validator consensus different from typical BFT or PoS systems? How does "Proof of Fee" work under real-world usage?**

Proof of Fee forces validators to compete on operational efficiency rather than capital stake or computational power. Validators propose the lowest fees they're willing to accept, and selection probability is weighted by efficiency and reputation. This reduces centralization pressures and rent-seeking behavior common in PoS systems. Under real-world usage, we've observed healthy competition driving fees down while maintaining network security through reputation mechanisms. Long-term performance matters more than short-term bidding, creating incentives for reliable, cost-effective validation.

14. **Do "Slow Wallets" require social consensus enforcement or is it cryptoeconomically enforced?**

Slow Wallets are enforced entirely through protocol logic—no social consensus required. The vesting mechanism is cryptoeconomically guaranteed through smart contract code that cannot be bypassed. Daily distribution amounts are fixed and automatic, with no way to accelerate vesting regardless of social pressure or market conditions. This "First In, Last Out" structure is mathematically enforced, creating predictable liquidity schedules that encourage long-term participation. The system works regardless of community sentiment or social coordination.

15. **How does the system respond to lost keys, black swan events, or civil attacks on matching funds?**

Lost keys are handled through multi-signature requirements for Sub-DAOs and recovery mechanisms for individual accounts. Black swan events are addressed through the same governance mechanisms we've already used successfully: validator coordination and hard forks when necessary. Civil attacks on matching funds are mitigated through decentralized fund storage, multiple independent signers, and rapid response capabilities. We've already faced and survived coordinated attacks, including legal warfare and technical exploits. The system's antifragile design becomes stronger through adversarial testing.
