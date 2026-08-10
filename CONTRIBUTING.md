# BlockVerify — Contribution Guide

> Read this fully before touching the repo.
> Kushagra will randomly ask you to explain any line you have pushed.
> If you cannot explain it → it gets removed and you rewrite it.

---

## The Team

| GitHub Branch Prefix | Name |
|---|---|
| `kushagra/` | Kushagra Kushwah (Mentor) |
| `ayush/` | Ayush Gupta |
| `fawaz/` | Fawaz |
| `nihar/` | Nihar A Singh |
| `raja/` | Raja Shekar Chowdary |
| `sonu/` | Sonu Prajapati |

---

## How We Work

Everyone writes everything. Same contracts, same frontend, same tests — each person on their own branch. Kushagra reviews all Pull Requests and merges the best version into `main`.

Being merged is not the goal. **Learning is.** Even if your version is not merged, you learned by writing it. And you will be asked about it.

---

## The One Rule That Cannot Be Broken

> **Understand every line before you push it.**

Whether you figured it out yourself, read it from docs, or got help — you must be able to answer:

**For Solidity code:**
- What does this function do in one sentence?
- What are the inputs and what do they mean?
- What does this `require()` check — what happens if it fails?
- Why `mapping` here and not an array?
- What does this `emit` line do and who listens to it?
- What is `msg.sender` at this point in the code?

**For JavaScript/Web3 code:**
- What is `web3.eth.getAccounts()` returning?
- Why do we `await` this line?
- What is the difference between `.call()` and `.send()`?
- What does `tx.receipt` contain?
- What happens if the user rejects the MetaMask popup?

Using AI assistance is fine and expected. But you must re-read every line, understand it, and be ready to rewrite it from scratch if Kushagra asks you to do so live.

---

## Branch Naming

Format: `yourname/weekN-what-you-built`

Real examples for this team:

```
kushagra/week1-blockchain-notes
ayush/week2-simple-storage
fawaz/week3-ganache-deploy
nihar/week5-role-manager
raja/week6-product-registry
sonu/week10-manufacturer-page

kushagra/week6-product-registry
ayush/week6-product-registry
fawaz/week6-product-registry
nihar/week6-product-registry
raja/week6-product-registry
sonu/week6-product-registry
```

Notice: in Week 6, all 6 people have a branch with the same file. That is intentional.

**Never** name a branch: `main`, `test`, `final`, `final2`, `temp`, `new`, `fix`.

---

## Git Workflow — Every Single Week

### One-time setup (do this once)
```bash
git clone https://github.com/kushagrakushwah/BlockVerify.git
cd BlockVerify
npm install
```

### Start of every new week
```bash
# Always start from the latest main
git checkout main
git pull origin main

# Create your branch for this week
git checkout -b yourname/weekN-what-you-built
```

### While working — commit after every logical step
Do not write 200 lines and commit once. Commit every time you finish a meaningful piece.

```bash
git add .
git commit -m "Add onlyManufacturer modifier to registerProduct"
git push origin yourname/weekN-what-you-built
```

### When done — open a Pull Request
1. Go to https://github.com/kushagrakushwah/BlockVerify in your browser
2. You will see a yellow banner: **"Compare & pull request"** — click it
3. Title format: `[Week N] YourName — What you built`
   - Example: `[Week 5] Ayush — RoleManager with 3 RBAC tests`
4. In the description write:
   - What you built (2–3 sentences)
   - How you tested it
   - What you are unsure about or want feedback on
5. Click **"Create pull request"**

> **💡 Pro Tip:** If you want feedback from Kushagra before you are completely done, click the dropdown next to the "Create pull request" button and choose **"Create Draft Pull Request"**.

---

## Good vs Bad Commit Messages

| ❌ Bad | ✅ Good |
|---|---|
| `update` | `Add registerProduct with duplicate serial check` |
| `fix` | `Fix wrong salt test — was comparing wrong variable` |
| `done` | `Add Week 2 notes on Solidity mappings and structs` |
| `final` | `Complete verifyProduct with auto-expiry on read` |
| `wip` | `Add onlyManufacturer modifier, restrict registration to role` |
| `aaa` | `Add commit-reveal pattern to transfer ownership` |

A good commit message answers: **"What does this commit do?"**

---

## What Kushagra Does When He Reviews Your PR

1. Reads your code on GitHub
2. Picks 2–3 lines and asks you to explain them in the PR comments
3. If you explain correctly → approves and merges (or takes the best parts)
4. If you cannot explain → requests changes, you rewrite that part
5. Always leaves a comment on what was good — not just what was wrong

This is not meant to be harsh. It is meant to make sure everyone actually learns.

---

## Checklist Before Every Push

Run through this before `git push`:

- [ ] Does my code actually run? (Did I test it on Ganache / in the browser?)
- [ ] Can I explain every line out loud right now without looking at notes?
- [ ] Is my branch named `yourname/weekN-description`?
- [ ] Is every commit message a full sentence describing what I did?
- [ ] Did I format my code neatly so it's easy to read? (Helps prevent messy merge conflicts!)
- [ ] Did I accidentally include `node_modules/` or `.env`? (Check with `git status`)
- [ ] Did I test the specific thing I was supposed to test this week?

---

## How to Handle Merge Conflicts

If two people edited the same file, Git shows this:

```
<<<<<<< your-branch
function registerProduct(string memory serial) public {
=======
function registerProduct(string memory serial, string memory name) public {
>>>>>>> main
```

Do NOT panic. Do NOT randomly delete lines.
- Read both versions carefully
- Keep the better one (or combine both if both have something good)
- Delete the `<<<<<<<`, `=======`, `>>>>>>>` marker lines
- Save → `git add .` → `git commit`
- Tell Kushagra if you are stuck — he will help you resolve it

---

## Quick Git Reference

```bash
# See what branch you are on
git branch

# See what files you have changed
git status

# See line-by-line what changed before committing
git diff

# Stage all changes
git add .

# Stage one specific file only
git add contracts/RoleManager.sol

# Commit with a message
git commit -m "Your message here"

# Push your branch
git push origin yourname/weekN-description

# Pull latest main before starting new week
git checkout main
git pull origin main

# Create new branch from updated main
git checkout -b yourname/weekN-description

# See commit history in one line per commit
git log --oneline
```

---

## Week-by-Week — What Everyone Builds

Everyone writes every file listed below, each on their own branch.

| Week | What Everyone Writes | File Location |
|---|---|---|
| 1 | Blockchain theory notes | `docs/notes/week1-yourname.md` |
| 2 | SimpleStorage.sol practice contract | `contracts/practice/SimpleStorage-yourname.sol` |
| 3 | Deploy SimpleStorage, screenshot | `docs/screenshots/week3-yourname-deploy.png` |
| 4 | Minimal Web3.js HTML dApp | `frontend/practice/index-yourname.html` |
| 5 | RoleManager.sol + 3 tests | `contracts/RoleManager.sol` (own branch) |
| 6 | ProductRegistry.sol — register + verify | `contracts/ProductRegistry.sol` (own branch) |
| 7 | ProductRegistry.sol — commit-reveal | `contracts/ProductRegistry.sol` (own branch) |
| 8 | NFTProduct.sol + RecallManager.sol | own branch |
| 9 | web3-init.js + seed-data.js | own branch |
| 10 | manufacturer.html + verify.html | own branch |
| 11 | transfer.html + admin.html + recall-banner.js | own branch |
| 12 | inspector.html + full test run | own branch |
| 13–16 | Advanced features + paper sections | Kushagra leads, everyone contributes |

---

*BlockVerify — SHELL Club VNIT Nagpur 2026*  
*github.com/kushagrakushwah/BlockVerify*
