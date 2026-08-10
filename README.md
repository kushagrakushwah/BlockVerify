# BlockVerify — Fake Product Identification System Using Blockchain

**SHELL Club — VNIT Nagpur | Summer Project 2025**  
**Stack:** Solidity · Truffle · Ganache · Web3.js · HTML/CSS/JS  
**Duration:** 16 Weeks | **Started:** August 2025  

## Table of Contents
- [What is BlockVerify?](#what-is-blockverify)
- [Why Blockchain?](#why-blockchain)
- [System Architecture](#system-architecture)
- [Smart Contracts](#smart-contracts)
- [Frontend Pages](#frontend-pages)
- [Prerequisites and Installation](#prerequisites-and-installation)
- [Running Locally](#running-locally)
- [Running Tests](#running-tests)
- [Team](#team)
- [Research Paper](#research-paper)
- [Project Roadmap](#project-roadmap)

---

## What is BlockVerify?
BlockVerify is a decentralized product authentication system built on Ethereum smart contracts. Manufacturers register physical products on-chain. Consumers verify authenticity by scanning a QR code. Administrators issue instant recalls — all without trusting any central authority.

**Key Defences (novel combination — no single prior paper combines all of these)**

| Defence | What It Solves |
|---|---|
| **Rotating QR Salt** | Prevents QR code cloning and photography attacks |
| **Commit-Reveal Ownership Transfer** | Prevents mempool front-running during handoff |
| **Auto-Expiry on Read** | Expiry enforced inside `verifyProduct` — no cron job needed |
| **Walletless Public Inspector** | Anyone audits provenance — no MetaMask required |
| **ERC-721 NFT per Product Unit** | Cryptographic ownership proof, wallet-composable |
| **Batch Recall with Event Broadcast** | Instant recall propagation across the supply chain |
| **AI Anomaly Detection** | Flags cloning attacks via Isolation Forest on scan streams |
| **Gnosis Safe Multi-sig Admin** | Eliminates single point of failure on admin key |

---

## Why Blockchain?
Traditional anti-counterfeiting (QR codes, holograms, RFID) fails because all of them rely on a central database that can be tampered with. QR codes can be photographed and reprinted. Holograms can be duplicated. RFID chips can be cloned.

**Blockchain adds:**
- **Immutability** — once registered, a product record cannot be deleted or altered by anyone
- **Write-authentication** — only a verified manufacturer (RBAC) can register a product
- **Public auditability** — anyone verifies any product's full history without logging in or trusting the company

---

## System Architecture

```text
[Manufacturer] ──register──► [ProductRegistry.sol]
                                  │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
   [RoleManager] [NFTProduct] [RecallManager]
 (5-role RBAC)               (batch recall broadcast)
          │           │           │
       [Frontend dApp — 6 Pages]
 ┌─────────────────────────────────┐
 │ index.html — landing page       │
 │ manufacturer.html — register+QR │
 │ verify.html — scan + status     │
 │ transfer.html — commit-reveal   │
 │ inspector.html — walletless     │
 │ admin.html — roles+recall       │
 └─────────────────────────────────┘
```

---

## Smart Contracts

### RoleManager.sol
- **5 roles:** MANUFACTURER, DISTRIBUTOR, RETAILER, CONSUMER, ADMIN
- Role IDs stored as `keccak256("ROLE_NAME")` — cheaper than strings
- **Functions:** `assignRole()`, `revokeRole()`, `getRole()`
- **Events:** `RoleAssigned`, `RoleRevoked`

### ProductRegistry.sol
- Core contract — all product logic
- `registerProduct()` — onlyManufacturer, generates initial QR salt
- `verifyProduct(id, scannedSalt)` — compares salt, auto-expires, increments scan counter
- `commitTransfer()` and `revealTransfer()` — two-phase commit-reveal handoff
- `ScanWindow` struct — rolling 10-minute window, emits `SuspiciousActivity` if more than 20 scans
- **Product statuses:** ACTIVE, RECALLED, EXPIRED, COUNTERFEIT, SOLD

### NFTProduct.sol
- ERC-721, one token per physical product unit
- `tokenId` equals `productId`
- `tokenURI` points to IPFS metadata JSON
- Minted on `registerProduct()`, transferred on `revealTransfer()`

### RecallManager.sol
- `issueBatchRecall(batchId, severity, reason, productIds[])`
- **Severity:** Class I (red) / Class II (orange) / Class III (blue)
- Calls `ProductRegistry.markRecalled()` per product with try/catch
- Emits `RecallIssued` — picked up by `recall-banner.js` on the frontend

---

## Frontend Pages

| Page | File | Who Can Use It | Key Feature |
|---|---|---|---|
| **Landing** | `index.html` | Public | Project intro, wallet connect |
| **Manufacturer** | `manufacturer.html` | MANUFACTURER role | 6-field register form + QR download |
| **Verify** | `verify.html` | Public | Camera QR scan → 4 status cards |
| **Transfer** | `transfer.html` | Current product owner | Commit-reveal in single page |
| **Inspector** | `inspector.html` | Public | Walletless, full provenance timeline |
| **Admin** | `admin.html` | ADMIN role | Role management + recall + pause |

---

## Prerequisites and Installation

Install these in order on your Windows PC:

| Software | Download Link | Purpose |
|---|---|---|
| Git | https://git-scm.com/download/win | Version control |
| Node.js v18+ | https://nodejs.org/ | Runs Truffle and scripts |
| VS Code | https://code.visualstudio.com/ | Code editor |
| Ganache GUI | https://trufflesuite.com/ganache/ | Local blockchain simulator |
| MetaMask | https://metamask.io/download/ | Browser wallet for testing |

After installing Node.js, install Truffle globally:
```bash
npm install -g truffle
truffle version
```

---

## Running Locally

**Step 1 — Clone the repo**
```bash
git clone https://github.com/kushagrakushwah/BlockVerify.git
cd BlockVerify
npm install
```

**Step 2 — Start Ganache**
- Open Ganache GUI → click Quickstart Ethereum
- Note the RPC Server shown (usually `http://127.0.0.1:7545`)

**Step 3 — Compile contracts**
```bash
truffle compile
```

**Step 4 — Deploy contracts**
```bash
truffle migrate --reset
```

**Step 5 — Seed demo data**
```bash
truffle exec scripts/seed-data.js
```
*(This registers 3 demo products: Paracetamol 500mg, Amoxicillin 250mg, Ibuprofen 400mg)*

**Step 6 — Export ABIs to frontend**
```bash
node scripts/export-abis.js
```

**Step 7 — Serve the frontend**
```bash
cd frontend
npx http-server -p 3000
```
Open browser: `http://localhost:3000`

**Step 8 — Connect MetaMask**
- Network: Localhost 7545
- Chain ID: 1337
- Import any Ganache private key into MetaMask

> **Important** — after every `truffle migrate --reset`: MetaMask → Settings → Advanced → Clear activity and nonce data. If you skip this, MetaMask will reject transactions with nonce errors.

---

## Running Tests
```bash
truffle test
```

### Minimum 7 Tests (all must pass before submission)

| # | Test Description |
|---|---|
| **1** | Assign MANUFACTURER role → isManufacturer() returns true |
| **2** | Non-admin tries to assign role → transaction reverts |
| **3** | Register product + verify with correct salt → GENUINE |
| **4** | Verify with wrong salt → COUNTERFEIT (permanently flagged) |
| **5** | EVM fast-forward past expiry → EXPIRED |
| **6** | Correct commit-reveal secret → ownership transferred, salt rotated |
| **7** | Old QR salt after transfer → COUNTERFEIT (anti-cloning proof) |

---

## Team

| Name | Role |
|---|---|
| **Kushagra Kushwah** | Mentor · Project Lead · Paper Author |
| **Ayush Gupta** | Core Developer |
| **Fawaz** | Core Developer |
| **Nihar A Singh** | Core Developer |
| **Raja Shekar Chowdary** | Core Developer |
| **Sonu Prajapati** | Core Developer |

> Everyone on the team writes everything — smart contracts, tests, and frontend pages — each on their own branch. The mentor reviews all Pull Requests and merges the best version into main.

---

## Research Paper
- **Target Conferences:** ICSP 2026 · MVAI 2026 · NGNDAI-MNNIT
- **Novel Contribution:** BlockVerify is the first system to combine rotating QR salt, commit-reveal ownership transfer, auto-expiry on read, walletless public inspector, ERC-721 per unit, and AI anomaly detection in a single deployable Solidity stack. No prior IEEE paper combines all of these defences.
- **Paper structure (written in Week 16):** Abstract → Introduction → Related Work → System Architecture → Smart Contract Design → Frontend Implementation → Security Analysis → Gas Cost Benchmark → Conclusion → References
- **Location:** Paper will be at `/paper/blockverify-ieee.pdf` after Week 16.

---

## Project Roadmap

### Phase 1 — Foundations (Weeks 1–4)
- [ ] **Week 1:** Blockchain theory + Ethereum architecture + mini-project
- [ ] **Week 2:** Solidity basics + `ProductRegistry.sol` v1 (practice)
- [ ] **Week 3:** Truffle + Ganache setup + first deploy
- [ ] **Week 4:** Web3.js + minimal HTML dApp

### Phase 2 — Core Smart Contracts (Weeks 5–8)
- [ ] **Week 5:** `RoleManager.sol` + RBAC tests
- [ ] **Week 6:** `ProductRegistry.sol` — register + rotating QR salt + verify
- [ ] **Week 7:** `ProductRegistry.sol` — commit-reveal ownership transfer
- [ ] **Week 8:** `NFTProduct.sol` (ERC-721) + `RecallManager.sol`

### Phase 3 — Frontend dApp (Weeks 9–12)
- [ ] **Week 9:** `web3-init.js` + seed script + ABI export
- [ ] **Week 10:** `manufacturer.html` + `verify.html`
- [ ] **Week 11:** `transfer.html` + `admin.html` + `recall-banner.js`
- [ ] **Week 12:** `inspector.html` + full integration testing

### Phase 4 — Advanced Features + Paper (Weeks 13–16)
- [ ] **Week 13:** Gnosis Safe multi-sig admin
- [ ] **Week 14:** Python AI anomaly detection (Isolation Forest on scan streams)
- [ ] **Week 15:** Sepolia testnet deploy + solidity-coverage
- [ ] **Week 16:** IEEE research paper + GitHub cleanup + conference submission

---

## .gitignore Summary
The repo ignores: `node_modules/`, `build/`, `.env`, and OS files. **Never commit your `.env` file.** It contains private keys.

---
**SHELL Club — VNIT Nagpur | BlockVerify 2026 | github.com/kushagrakushwah/BlockVerify**
