## Open Libra Tokenomics – Snapshot

This document summarizes the current economic state and structural design of the Open Libra asset (OL).

### TL;DR
What's remarkable about open libra is that it was a freely mined blockchain, with strong consensus for saving for the future. 100% free mined and 80% dedicated to the investment DAO. You haven't seen this anywhere else.

## Philosophy
Most people see tokenomics as liquidity games around stock and flow. We actually believe in economics. We're designing a long term perpetual source of capital, not a speculative game.
---
### 0. Account & Capital Types
* **User Accounts** – Two variants only:
  * **Unlocked** – Fully liquid, transferable without delay.
  * **Vesting ("Slow")** – Subject to continuous linear release; unreleased balance is non-transferable.
* **Sub-DAO Endowments** – Capital pools governed by independent Sub-DAOs; funded via direct donations plus protocol matching.
* **Matching Fund** – Protocol-controlled pool that amplifies qualified Sub-DAO funding according to transparent rules.

---
### 1. Supply & Issuance
* 100% of total supply was **freely mined** (no ICO, pre-sale, or insider allocation).
* Mining is complete; **fixed max supply: 100,000,000,000 OL**.
* No new minting mechanisms exist; long-term scarcity is enforced at the protocol layer.

---
### 2. Deflationary Mechanics
* Approximately **~5% of total issued OL has been burned** since emission ended.
* Burns occur on a **continuous / daily cadence**, introducing persistent downward pressure on liquid supply.
* Effect: gradual increase in effective scarcity without discretionary monetary policy.

---
### 3. Sub-DAO Ecosystem Flows
* **Inbound:** Direct user donations + Matching Fund disbursements.
* **Outbound:** Mission-aligned allocations governed by each Sub-DAO’s charter and signer set.
* **Expansion:** New Sub-DAOs can launch permissionlessly, enabling horizontal scaling of focused initiatives.

---
### 4. Vesting & Long-Term Alignment
* Early (pre-mainnet) contributor / founder balances reside in **slow (daily vesting) wallets** only.
* Vesting releases are smooth and predictable—no large cliff unlocks.
* Goal: incentivize sustained contribution and reduce short-term speculative churn.

---
### 5. Indicative Distribution
| Category | Approx. % of Max Supply | Status / Notes |
|----------|-------------------------|----------------|
| Unlocked User Accounts | 1% | Fully liquid |
| Vested (Slow) User Accounts | 16% | Linear daily release |
| Sub-DAO Endowments | 40% | Programmatic / governed use |
| Matching Fund | 30% | Protocol-governed amplification pool |
| Burned | ~5% | Permanently retired |

Percentages are rounded; totals may not equal 100% due to rounding and dynamic burns.

---
### 6. Governance & Enforcement Layers
* **Fork-Based Neutrality:** Core protocol remains ossified; changes require broad validator adoption.
* **FILO Principle:** “First In, Last Out” dynamics reward patient capital and discourage rapid exit behavior.
* **Enforcement Stack:**
  1. Deterministic smart contracts (hard constraints)
  2. Social / reputational sanctions
  3. Civil legal recourse (where applicable)
  4. Criminal enforcement (fraud/theft under jurisdictional law)

Design intent: maximize reliance on code; escalate only when necessary.

---
### 7. Long-Term Vision
* Architected for **century-scale durability** (institutional-grade longevity).
* Functions as a neutral capital substrate for social, scientific, and technological endowment-style initiatives.
* Minimizes discretionary levers—predictability compounds trust over multi-decade horizons.

---
### Appendix: On-Chain Supply Stats Query
You can retrieve raw on-chain supply / allocation statistics directly from the public RPC view endpoint.

Command:
```
curl --request POST \
  --url https://rpc.scan.openlibra.io/v1/view \
  --header 'Accept: application/json; charset=utf-8' \
  --header 'Content-Type: application/json; charset=utf-8' \
  --data '{
  "function": "0x1::supply::ge_stats",
  "type_arguments": [  ],
  "arguments": [  ]
}'
```
Sample response:
```
[
  "94801089335988827",
  "15875810102492730",
  "41431150058396731",
  "37244692052128482",
  "249437122970884"
]
```
The array returned is composed of:

  * `total`: The total supply of Libra Coin in existence
  * `user_locked`: Amount of coins locked in slow wallets
  * `sub_daos`: Coins allocated to community endowments via donor voice
  * `matching_funds`: Coins committed to future pledges
  * `user_unlocked`: Total coins that have been unlocked from slow wallets and are in circulation
Interpretation:
* Returns an ordered array of unsigned integer (likely u128) values in the asset's smallest (atomic) units.
* Each index corresponds to an internal category (e.g., unlocked, vesting, Sub-DAO endowments, matching fund, burned or pending burn). Exact mapping should be confirmed against the on-chain module documentation (`0x1::supply`).
* To convert to human-readable OL, divide by the coin's decimal precision. (If the asset uses 6 decimals, divide by 1e6; confirm via a view call to `coin::decimals` with the OL coin type.)

Suggested verification steps:
1. Query decimals:
```
# Replace <OlCoinType> with the fully qualified type, e.g. 0x1::ol_coin::OlCoin
curl -s -X POST https://rpc.scan.openlibra.io/v1/view \
  -H 'Content-Type: application/json' \
  -d '{
    "function": "0x1::coin::decimals",
    "type_arguments": ["<OlCoinType>"],
    "arguments": []
  }'
```
2. Divide each raw value by 10^(decimals) for display.
3. Recompute percentages: value_sum_category / total_sum * 100.

Cautions:
* Raw figures can change intra-day; use a consistent block height when producing comparative analytics.
* Rounding and in-flight burns / vesting ticks may cause small reconciliation differences vs. summarized tables.
