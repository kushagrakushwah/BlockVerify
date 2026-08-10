# BlockVerify — Week-by-Week Tasks
> For: Ayush Gupta, Fawaz, Nihar A Singh, Raja Shekar Chowdary, Sonu Prajapati
> Mentor: Kushagra Kushwah
> Started: August 2026

---

## How This Works

- Everyone does every task every week. Same task, same files, own branch.
- Kushagra may ask any one of you to explain anything you pushed — at any time.
- If you cannot explain it → rewrite it. No exceptions.
- The goal is not to have your version merged. The goal is to understand what you wrote.
- Each week produces something you commit to GitHub. No week ends without a commit.

---

## Software to Install Before Week 1 (Do This Now)

Install in this exact order:

1. **Git** — https://git-scm.com/download/win
   After install, open Git Bash and run: `git --version` (should print a version number)

2. **Node.js v18+** — https://nodejs.org/ (download the LTS version)
   After install: `node -v` and `npm -v` (both should print version numbers)

3. **VS Code** — https://code.visualstudio.com/
   This is your code editor for all 16 weeks.

4. **Ganache GUI** — https://trufflesuite.com/ganache/
   This runs a fake local blockchain on your laptop.

5. **MetaMask** — https://metamask.io/download/
   Browser extension. Install in Chrome or Brave.

6. **Truffle** — after Node.js is installed, open Git Bash and run:
   ```bash
   npm install -g truffle
   truffle version
   ```

Clone the repo:
```bash
git clone https://github.com/kushagrakushwah/BlockVerify.git
cd BlockVerify
npm install
```

Read `CONTRIBUTING.md` fully before doing anything else.

---

## PHASE 1 — FOUNDATIONS (Weeks 1–4)
### Goal: Understand what blockchain is. Deploy your first smart contract. Build a tiny frontend that talks to it.

---

### WEEK 1 — Blockchain Theory and Ethereum Architecture

**What you learn:** What a blockchain actually is. Why it matters for fake products. What Ethereum adds on top.

**Resources — go through all of these:**
- Watch (26 min, watch fully): https://www.youtube.com/watch?v=bBC-nXj3Ng4
- Read (skim, not memorize): https://ethereum.org/en/whitepaper/
- Read (first 3 sections only): https://www.ibm.com/topics/blockchain
- Read (Ethereum basics): https://ethereum.org/en/developers/docs/

**Your deliverable — commit this to your branch:**

Create the file `docs/notes/week1-yourname.md` (replace yourname with your actual name).

Answer these questions in your own words inside that file. Do not copy-paste. Write like you are explaining to a friend:

1. What is a blockchain in one paragraph? (no bullet points, write a paragraph)
2. What is the EVM? What does it actually do?
3. What is an Ethereum account? What is the difference between an EOA and a contract account?
4. What is gas and why does it exist?
5. What is `keccak256`? Where is it used in Ethereum?
6. Why can a QR code be faked but a blockchain record cannot be faked?
7. **Bonus:** What is the oracle problem? Why is it relevant to BlockVerify?

**Mini-project (also commit this):**

Create `docs/notes/week1-comparison-yourname.md` and fill this table:

| Feature | Centralized Database | Blockchain |
|---|---|---|
| Who controls the data? | | |
| Can past records be edited? | | |
| Who can write new records? | | |
| Who can read records? | | |
| What if the server goes down? | | |
| What if the admin is corrupt? | | |
| Cost of writing data | | |
| Speed of writing data | | |
| Audit trail | | |

Then write 2–3 sentences: **What does a centralized database NOT give you that a blockchain does, specifically for tracking fake products?**

---

### WEEK 2 — Solidity Programming Core Concepts

**What you learn:** How to write smart contracts in Solidity. Data types, mappings, structs, functions, modifiers, events, error handling.

**Resources — go through all of these:**
- Do Lessons 1 and 2 (required): https://cryptozombies.io/
- Read all examples: https://solidity-by-example.org/
- Reference docs: https://docs.soliditylang.org/
- OpenZeppelin (read the intro): https://docs.openzeppelin.com/contracts/

**Your deliverable — commit this to your branch:**

Create `contracts/practice/SimpleStorage-yourname.sol`

Write a Solidity contract that does all of the following:
```
- Stores a number (uint256) called storedNumber
- Stores a string called storedName
- Has a modifier called onlyOwner that restricts certain functions to the deployer
- Has a function setNumber(uint256 _number) that only the owner can call
- Has a function setName(string memory _name) that only the owner can call
- Has a function getNumber() that anyone can call (returns storedNumber)
- Has a function getName() that anyone can call (returns storedName)
- Emits an event called NumberUpdated(uint256 oldNumber, uint256 newNumber) when setNumber is called
- Uses require() with a meaningful error message in at least one place
```

Also create `docs/notes/week2-yourname.md` and answer:
1. What is the difference between `storage`, `memory`, and `calldata`?
2. What is the difference between `public`, `external`, `internal`, and `private` visibility?
3. What does a `modifier` do? How is it different from just writing an if-statement inside the function?
4. What does `emit` do? Who can listen to events?
5. What is the difference between `require()` and `revert()`?

---

### WEEK 3 — Truffle, Ganache, and the Development Toolchain

**What you learn:** How to compile, deploy, and interact with smart contracts using Truffle and Ganache.

**Resources:**
- https://trufflesuite.com/docs/truffle/quickstart/
- https://trufflesuite.com/docs/ganache/
- https://metamask.io/download/

**Your deliverable — commit this to your branch:**

1. Open Ganache GUI → Quickstart Ethereum. Note the RPC URL and port.
2. In the repo root, check that `truffle-config.js` has the correct port.
3. Compile and deploy your SimpleStorage contract:
   ```bash
   truffle compile
   truffle migrate --reset
   ```
4. Interact with it in the Truffle console:
   ```bash
   truffle console
   ```
   Inside the console:
   ```javascript
   let instance = await SimpleStorage.deployed()
   await instance.setNumber(42)
   let result = await instance.getNumber()
   result.toString()  // should print "42"
   ```
5. Import a Ganache account into MetaMask (copy the private key from Ganache GUI → click the key icon next to any account)

**Commit these to your branch:**
- Screenshot of `truffle migrate` output → `docs/screenshots/week3-yourname-deploy.png`
- Screenshot of Truffle console showing your `getNumber()` result → `docs/screenshots/week3-yourname-console.png`
- Screenshot of MetaMask showing Ganache account with ETH → `docs/screenshots/week3-yourname-metamask.png`

Also create `docs/notes/week3-yourname.md` and answer:
1. What does `truffle compile` actually produce? Where does it go?
2. What is a migration script? Why does Truffle need it?
3. What is the ABI? Why does the frontend need it?
4. What is `msg.sender` inside a contract call from Truffle console?

---

### WEEK 4 — Web3.js and a Minimal dApp Frontend

**What you learn:** How a webpage talks to a smart contract using Web3.js and MetaMask.

**Resources:**
- https://web3js.readthedocs.io/en/v1.10.0/web3-eth-contract.html
- https://docs.metamask.io/wallet/reference/provider-api/
- https://buildspace.so/

**Your deliverable — commit this to your branch:**

Create `frontend/practice/index-yourname.html` — a single HTML file (no separate JS file needed this week) that:

```
- Connects to MetaMask when a "Connect Wallet" button is clicked
- Shows the connected wallet address in the page
- Has a number input and a "Set Number" button → calls setNumber() on your SimpleStorage contract
- Has a "Get Number" button → calls getNumber() and displays the result on the page
- Shows a status message after each transaction ("Transaction sent...", "Done!", "Error: ...")
```

Use Web3.js from CDN (no npm needed for this practice file):
```html
<script src="https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js"></script>
```

You will need to copy the contract ABI from `build/contracts/SimpleStorage.json` and paste it into your HTML file.

Also create `docs/notes/week4-yourname.md` and answer:
1. What is `window.ethereum`? Where does it come from?
2. What is the difference between `.call()` and `.send()` in Web3.js? Why does `.send()` cost gas?
3. What is a contract ABI and why does Web3.js need it?
4. What does `await web3.eth.getAccounts()` return?
5. What happens if the user clicks "Reject" on the MetaMask popup?

---

## PHASE 2 — CORE SMART CONTRACTS (Weeks 5–8)
### Goal: Build all four BlockVerify contracts. Write 7+ Truffle tests. All contracts deployed and talking to each other.

---

### WEEK 5 — RoleManager.sol

**What you learn:** Role-Based Access Control on Ethereum. How to restrict who can do what.

**Resources:**
- https://docs.openzeppelin.com/contracts/4.x/access-control
- https://solidity-by-example.org/mapping/
- Week 2 Solidity notes you already wrote

**Your deliverable:**

Write `contracts/RoleManager.sol` with:
```
- 5 role constants using keccak256: MANUFACTURER, DISTRIBUTOR, RETAILER, CONSUMER, ADMIN
- A mapping: address => bytes32 to store each address's role
- A mapping: address => bool to store isRegistered
- Constructor: sets deployer as ADMIN
- assignRole(address account, bytes32 role) — onlyAdmin
- revokeRole(address account) — onlyAdmin
- getRole(address account) — returns bytes32
- hasRole(address account, bytes32 role) — returns bool
- Events: RoleAssigned(address indexed account, bytes32 role, address indexed assignedBy)
- Events: RoleRevoked(address indexed account, address indexed revokedBy)
```

Write `test/rolemanager-yourname.test.js` with 3 tests:
1. Assign MANUFACTURER to accounts[1] → `hasRole(accounts[1], MANUFACTURER)` returns true
2. Try assigning a role from accounts[2] (non-admin) → transaction reverts
3. Revoke a role from accounts[1] → `hasRole(accounts[1], MANUFACTURER)` returns false

Run your tests: `truffle test test/rolemanager-yourname.test.js`
All 3 must pass before you push.

---

### WEEK 6 — ProductRegistry.sol Part 1 (Register + Verify)

**What you learn:** The core product logic. Rotating QR salt. Auto-expiry. Scan counting.

**Resources:**
- https://docs.openzeppelin.com/contracts/4.x/api/security#Pausable
- https://docs.soliditylang.org/en/latest/units-and-global-variables.html
- Your Week 5 RoleManager.sol

**Your deliverable:**

Write `contracts/ProductRegistry.sol` with at minimum:
```
- ProductStatus enum: ACTIVE, RECALLED, EXPIRED, COUNTERFEIT, SOLD
- Product struct: id, serialNumber, name, batchId, productPrice, manufacturer,
  currentOwner, registeredAt, expiresAt, status, qrSalt
- registerProduct(serial, name, batchId, price, expiresAt) — onlyManufacturer
  - checks for duplicate serial number
  - generates initial qrSalt = keccak256(abi.encodePacked(id, block.timestamp, msg.sender))
  - emits ProductRegistered event
- verifyProduct(uint256 id, bytes32 scannedSalt) — returns ProductStatus
  - if block.timestamp >= expiresAt → set status EXPIRED, return EXPIRED
  - if scannedSalt != p.qrSalt → set status COUNTERFEIT, return COUNTERFEIT
  - increment scan counter
  - return ACTIVE (genuine)
```

Write 3 tests:
1. Register product → verify with correct salt → returns ACTIVE (genuine)
2. Verify with wrong salt → returns COUNTERFEIT
3. Use `evm_increaseTime` to fast-forward past expiry → returns EXPIRED

---

### WEEK 7 — ProductRegistry.sol Part 2 (Commit-Reveal Transfer)

**What you learn:** Why mempool front-running is a real attack. How commit-reveal prevents it.

**Resources:**
- https://solidity-by-example.org/hacks/front-running/
- https://ethereum.org/en/developers/docs/transactions/

**Your deliverable:**

Add to your `contracts/ProductRegistry.sol`:
```
- commitTransfer(uint256 id, bytes32 commitHash)
  - only current owner can commit
  - stores commitHash in product's pendingCommit field
  - emits TransferCommitted event
- revealTransfer(uint256 id, address newOwner, bytes32 secret, string memory note)
  - verifies keccak256(abi.encodePacked(id, newOwner, secret)) == pendingCommit
  - transfers ownership to newOwner
  - rotates qrSalt = keccak256(abi.encodePacked(id, newOwner, block.timestamp))
  - records OwnershipEvent (from, to, timestamp, note)
  - emits OwnershipTransferred event
```

Write 2 tests:
1. Correct secret → transfer completes, ownership changes, salt rotates
2. Old QR salt (pre-transfer) used after transfer → verifyProduct returns COUNTERFEIT

---

### WEEK 8 — NFTProduct.sol + RecallManager.sol

**What you learn:** ERC-721 tokens. IPFS. Batch recall broadcasts.

**Resources:**
- https://docs.openzeppelin.com/contracts/4.x/erc721
- https://docs.ipfs.tech/
- https://pinata.cloud/

**Your deliverable:**

Write `contracts/NFTProduct.sol`:
```
- Inherits OpenZeppelin ERC721
- tokenId = productId
- mint(address to, uint256 productId, string memory ipfsHash) — onlyRegistry
- tokenURI returns IPFS link
```

Write `contracts/RecallManager.sol`:
```
- issueBatchRecall(string batchId, uint8 severity, string reason, uint256[] productIds)
  - onlyAdmin
  - loops through productIds, calls ProductRegistry.markRecalled(id) for each
  - uses try/catch so one failed ID does not stop the rest
  - emits RecallIssued(batchId, severity, reason, timestamp)
- getSeverityLabel(uint8 severity) → "Class I", "Class II", "Class III"
```

Write 1 test:
- Issue recall for a batch with product IDs [1, 2] → both products have status RECALLED

---

## PHASE 3 — FRONTEND dAPP (Weeks 9–12)
### Goal: Build all 6 frontend pages. Connect them to live Ganache contracts via Web3.js.

---

### WEEK 9 — web3-init.js + Seed Script + ABI Export

**Resources:**
- https://web3js.readthedocs.io/en/v1.10.0/web3-eth-contract.html
- https://docs.metamask.io/wallet/reference/provider-api/

**Your deliverable:**

Write `frontend/js/web3-init.js`:
```javascript
// Must do all of the following:
// - Detect window.ethereum (MetaMask)
// - Call eth_requestAccounts to connect wallet
// - Auto-switch to Chain ID 1337 (Ganache) using wallet_switchEthereumChain
// - Instantiate all 4 contracts using new web3.eth.Contract(ABI, address)
// - Call getRole(currentAccount) and display role in navbar
// - Export: web3, accounts, roleManager, productRegistry, nftProduct, recallManager
```

Write `scripts/seed-data.js` (Truffle exec script):
```javascript
// Run with: truffle exec scripts/seed-data.js
// Must:
// - Assign MANUFACTURER to accounts[1]
// - Assign DISTRIBUTOR to accounts[2]
// - Assign RETAILER to accounts[3]
// - Assign CONSUMER to accounts[4]
// - Register 3 products from accounts[1]:
//   Paracetamol 500mg | BATCH-2026-01 | price: 25 | no expiry
//   Amoxicillin 250mg | BATCH-2026-02 | price: 80 | no expiry
//   Ibuprofen 400mg   | BATCH-2026-03 | price: 40 | no expiry
// - Log all contract addresses and product IDs after seeding
```

Write `scripts/export-abis.js` (Node.js script):
```javascript
// Run with: node scripts/export-abis.js
// Reads Truffle build artifacts from build/contracts/
// Writes frontend/js/contracts-abi.js with:
// const CONTRACTS = { RoleManager: { abi, address }, ProductRegistry: { abi, address }, ... }
```

---

### WEEK 10 — manufacturer.html + verify.html

**Resources:**
- QRCode.js: https://github.com/davidshimjs/qrcodejs
- html5-qrcode: https://github.com/mebjas/html5-qrcode

**Your deliverable:**

`frontend/manufacturer.html` + `frontend/js/manufacturer.js`:
```
- 6-field form: serialNumber, productName, batchId, price, expiresAt (date input), ipfsHash
- On submit: call registerProduct() via web3.js send
- Show "Waiting for transaction..." while pending
- After confirm: call getQRSalt(productId) → generate QR with payload "productId|salt"
- QR displayed on page using QRCode.js
- "Download QR as PNG" button
- "Copy Salt to Clipboard" button
```

`frontend/verify.html` + `frontend/js/verify.js`:
```
- Camera QR scanner using html5-qrcode library
- Decodes "productId|salt" from scanned QR
- Auto-fills productId and salt fields
- Calls verifyProduct(productId, salt) on-chain
- Displays one of 4 status cards:
    GENUINE   → green card
    COUNTERFEIT → red card
    RECALLED  → orange card
    EXPIRED   → grey card
- Each card shows: product name, serial, batch, price, expiry countdown, scan count
```

---

### WEEK 11 — transfer.html + admin.html + recall-banner.js

**Your deliverable:**

`frontend/transfer.html` + `frontend/js/transfer.js`:
```
- Step 1 Commit: enter productId, newOwner address, secret, note
  → call commitTransfer() → store secret in sessionStorage (NOT localStorage)
- Step 2 Reveal: same page, no page refresh
  → reads secret from sessionStorage → call revealTransfer()
- Show "Transfer complete. New owner: 0x..." on success
```

`frontend/admin.html` + `frontend/js/admin.js`:
```
- Role assignment: address input + role dropdown → call assignRole()
- Show current roles in a table (load on page open)
- Emergency Pause button → call pause() on ProductRegistry
- Unpause button → call unpause()
- Batch Recall form: batchId, severity dropdown, reason text
  → loop getTotalProducts(), collect IDs where batchId matches
  → call issueBatchRecall(batchId, severity, reason, matchingIds[])
```

`frontend/js/recall-banner.js`:
```
- Poll RecallManager.getPastEvents('RecallIssued') every 8 seconds
- Show sticky banner at top of every page:
    Class I  → red banner
    Class II → orange banner
    Class III → blue banner
- Dismiss button → store dismissed IDs in localStorage so banner does not return
```

---

### WEEK 12 — inspector.html + Full Integration Testing

**Your deliverable:**

`frontend/inspector.html` + `frontend/js/inspector.js`:
```
- Uses: new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
- NO MetaMask. NO window.ethereum. Zero browser extensions needed.
- Input: product ID
- Display: productId, serial, batch, price, manufacturer address,
  currentOwner address, registeredAt, expiresAt, totalScans, ipfsHash, status
- Full ownership history timeline from getHistory(id)
  → each entry: from address, to address, timestamp, note
```

Test this in incognito mode (Ctrl+Shift+N) to prove it works without MetaMask.

**Integration test checklist (screenshot every step):**
- [ ] GENUINE card — correct QR scan
- [ ] COUNTERFEIT card — wrong salt entered manually
- [ ] RECALLED card — issue recall from admin page, then scan
- [ ] EXPIRED card — use Truffle console evm_increaseTime, then scan
- [ ] Recall banner appears within 8 seconds on verify.html after recall issued
- [ ] Commit-reveal transfer — complete full flow, verify new owner
- [ ] Old QR after transfer → COUNTERFEIT
- [ ] Pause test — registration fails while paused, reads still work
- [ ] Inspector walletless — works in incognito, shows full history
- [ ] All 7 Truffle tests passing — screenshot of `truffle test` output

---

## PHASE 4 — ADVANCED + PAPER (Weeks 13–16)
### Goal: Advanced features, testnet deploy, and research paper.

---

### WEEK 13 — Multi-sig Admin (Gnosis Safe)

**Resources:**
- https://docs.safe.global/
- https://docs.openzeppelin.com/upgrades-plugins/

**Task:**
Replace the single admin address with a Gnosis Safe 2-of-3 multisig on Ganache.
Test: issuing a recall from a single key fails. Requires 2 out of 3 confirmations.

---

### WEEK 14 — AI Anomaly Detection

**Resources:**
- https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html
- https://web3py.readthedocs.io/

**Task:**
Write `scripts/anomaly-detection.py`:
- Subscribe to SuspiciousActivity events from Ganache using web3.py
- Run Isolation Forest on the scan event stream
- Generate 25 rapid scans on one product manually → model should flag it
- Plot scan rate time-series with matplotlib

---

### WEEK 15 — Sepolia Testnet Deploy

**Resources:**
- https://infura.io/
- https://hardhat.org/
- https://github.com/sc-forks/solidity-coverage

**Task:**
- Get Sepolia ETH from a faucet
- Deploy BlockVerify to Sepolia via Infura
- Register a real product
- Verify it from a phone browser
- Run: `npx solidity-coverage` and screenshot the coverage report

---

### WEEK 16 — Research Paper

**Task:**
Write the full IEEE-format paper (6–8 pages) in Overleaf:
- Abstract, Introduction, Related Work
- System Architecture, Smart Contract Design
- Frontend Implementation
- Security Analysis
- Gas Cost Benchmark Table (registerProduct, verifyProduct, commitTransfer, revealTransfer, issueBatchRecall)
- Conclusion, References

Target conferences:
- ICSP 2026: https://icsp.co.in/2026/
- MVAI 2026: https://2026.mvai.in/
- NGNDAI-MNNIT: https://www.ngndai.mnnit.ac.in/

Submit to at least one. Upload final paper PDF to `/paper/blockverify-ieee.pdf`.

---

## Master Resources Bookmark List

| Resource | Link |
|---|---|
| 3Blue1Brown Bitcoin (watch first, Week 1) | https://www.youtube.com/watch?v=bBC-nXj3Ng4 |
| Ethereum Whitepaper | https://ethereum.org/en/whitepaper/ |
| IBM Blockchain Explained | https://www.ibm.com/topics/blockchain |
| CryptoZombies (Solidity interactive) | https://cryptozombies.io/ |
| Solidity by Example | https://solidity-by-example.org/ |
| Solidity Official Docs | https://docs.soliditylang.org/ |
| OpenZeppelin Contracts | https://docs.openzeppelin.com/contracts/ |
| Web3.js Docs | https://web3js.readthedocs.io/ |
| Truffle Docs | https://trufflesuite.com/docs/truffle/ |
| Ganache Docs | https://trufflesuite.com/docs/ganache/ |
| MetaMask Provider API | https://docs.metamask.io/wallet/reference/provider-api/ |
| QRCode.js | https://github.com/davidshimjs/qrcodejs |
| html5-qrcode (camera scanner) | https://github.com/mebjas/html5-qrcode |
| IPFS Docs | https://docs.ipfs.tech/ |
| Pinata IPFS Pinning | https://pinata.cloud/ |
| Patrick Collins Full Course (YouTube) | https://www.youtube.com/watch?v=gyMwXuJrbJQ |

---

*BlockVerify — SHELL Club VNIT Nagpur 2026*
*Mentor: Kushagra Kushwah | github.com/kushagrakushwah/BlockVerify*
