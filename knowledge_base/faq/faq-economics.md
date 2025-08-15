# Economic Design & Tokenomics

**How do you measure "performance" in Match Index? Can it be gamed?**

Performance is measured through time-weighted donation volume, Sub-DAO asset growth, and community reputation scores. Gaming is mitigated through several mechanisms: newer donations carry more weight than older ones, multiple independent signers are required, and donors retain veto rights over disbursements. The system rewards sustained performance over short-term manipulation. We've run adversarial testnets specifically to identify and patch gaming vectors. Perfect game-theory-proof systems don't exist, but we've built robust defenses against the most obvious attack vectors.

**How does the matching system for Sub-DAOs avoid abuse?**

Matching is based on time-weighted donations. Newer donations carry more weight. Each Sub-DAO requires 3 unrelated signers, and donors can vote to dissolve it. We've tested these mechanics in adversarial testnets.

**What stops someone from hijacking a Sub-DAO?**

A Sub-DAO can't be run by one actor. Three independent signers are required, and fund disbursements require both donor and global approval. Additionally donors retain veto rights, and ultimately can vote to liquidate the DAO.

**How do you bootstrap liquidity and incentives without moral hazard or ponzinomics?**

We solved the bootstrap problem through proof-of-labor rather than token sales. All $LBR was freely mined over three years with no pre-mine or insider allocation. 95% of supply is locked in Slow Wallets, creating natural scarcity and preventing speculation. Incentives come from real capital deployment and matching fund rewards based on performance, not artificial yield farming. This approach eliminated the moral hazard of promising returns to early investors while ensuring patient capital is rewarded through the Match Index.

**Q: What are Slow Wallets, and how do they work?**

**A:** Slow Wallets are enforced in protocol logic. They distribute funds daily with no way to accelerate vesting. This reduces volatility, limits speculation, and encourages long-term participation. This "First in–Last Out" mechanism creates a game theoretic equilibrium which reduces private insider advantages.

**Q: How does the matching system for Sub-DAOs avoid abuse?**

**A:** Matching is based on time-weighted donations. Newer donations carry more weight. Each Sub-DAO requires 3 unrelated signers, and donors can vote to dissolve it. We've tested these mechanics in adversarial testnets.

**Q: What stops someone from hijacking a Sub-DAO?**

**A:** A Sub-DAO can't be run by one actor. Three independent signers are required, and fund disbursements require both donor and global approval. Donors retain veto rights.

**Q: What happens if validator collusion or governance deadlock occurs?**

**A:** The system defaults to the status quo — no upgrade unless broad consensus emerges. In contentious scenarios, this protects liveness while allowing legitimate forks to develop.

**Q: How does the system prevent validator extractive behavior?**

**A:** Our Proof-of-Fee mechanism forces validators to compete on cost-efficiency, not on stake or hardware scale. This discourages centralization and excessive rent-seeking.

**Q: How does the protocol handle black swan events?**

**A:** We've already faced one: an exploit that required coordinated upgrade and legal action. The protocol design allows for these rare but critical responses, using the same fork-based mechanism.
