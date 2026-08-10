# Week 1 Mini-Project — Blockchain vs Centralized Database

> **Who this is for:** Ayush, Fawaz, Nihar, Raja, Sonu
> **Due:** End of Week 1
> **Where to submit:** Save as `docs/notes/week1-comparison-yourname.md` on your branch and open a Pull Request

---

## Before You Start — Watch This First

**Watch this video completely before filling in anything below (26 minutes):**
https://www.youtube.com/watch?v=bBC-nXj3Ng4

This is 3Blue1Brown explaining Bitcoin from scratch. It is the clearest explanation of how a blockchain actually works. If you skip this, the rest won't make sense.

---

## Part 1 — Answer These Questions in Your Own Words

Open VS Code. Create a new file called `docs/notes/week1-yourname.md`.

Write answers to these 6 questions **in your own words**. Do not copy-paste from the internet or from ChatGPT. Write like you are explaining to a friend who has never heard of blockchain.

---

**Q1. What is a blockchain?**

Write one paragraph. Imagine you are explaining it to your younger sibling who has never heard the word "blockchain" before. No bullet points — just one paragraph of plain English.

*(Hint after watching the video: think about what the "chain" part means and why nobody can secretly change old entries)*

---

**Q2. What is the EVM (Ethereum Virtual Machine)?**

What does it do? Think of it like this — Ethereum is a world computer. What is the EVM's job inside that computer?

*(Hint: it runs the code stored in smart contracts)*

---

**Q3. What is a wallet address?**

If you open MetaMask, you see a long string starting with `0x`. What actually is that? Who generates it? Can two people have the same one?

---

**Q4. What is gas and why does it exist?**

Why doesn't Ethereum let you run free code? What would happen if it did?

*(Hint: think about what someone could do if running code was free)*

---

**Q5. Why can a QR code be faked but a blockchain record cannot?**

This is the most important question for BlockVerify. Think about what happens when you print a QR code vs what happens when you write a product record to a blockchain. Why is one fakeable and the other is not?

---

**Q6. (Bonus — optional but impressive)**

What is the oracle problem? Why does it matter for BlockVerify?

*(Hint: blockchain can't read data from the real world on its own — what problem does that create for a fake product detection system?)*

---

## Part 2 — Fill In This Table

Now fill in this comparison table. **Use your own words for every cell.** There are no wrong answers here as long as you thought about it.

| Feature | Centralized Database (e.g. Amazon's servers) | Blockchain (e.g. Ethereum) |
|---|---|---|
| **Who controls the data?** | | |
| **Can old records be edited or deleted?** | | |
| **Who is allowed to add new records?** | | |
| **Who can read the records?** | | |
| **What happens if the main server goes down?** | | |
| **What if the admin/owner is corrupt?** | | |
| **How fast is writing new data?** | | |
| **How much does writing data cost?** | | |
| **Is there a permanent audit trail?** | | |

---

## Part 3 — Your Conclusion (Most Important Part)

After filling in the table, write **2–3 sentences** answering this:

> **Specifically for tracking fake products — what does a blockchain give you that a centralized database cannot?**

There is no single correct answer. Kushagra wants to see that *you* thought about it.

---

## How to Submit

```bash
# 1. Make sure you are on your own branch (NOT main)
git checkout -b yourname/week1-blockchain-notes

# 2. Save your files in docs/notes/
#    - docs/notes/week1-yourname.md        (6 questions)
#    - docs/notes/week1-comparison-yourname.md  (table + conclusion)

# 3. Add and commit
git add .
git commit -m "Add Week 1 blockchain notes and comparison table"

# 4. Push your branch
git push origin yourname/week1-blockchain-notes

# 5. Open a Pull Request on GitHub
#    Title: [Week 1] YourName — Blockchain Theory Notes
#    Description: Write 2-3 sentences about what you learned
```

---

## What Kushagra Will Ask You in the PR Review

He will pick any 2 of your answers and ask you to explain them in the comments. There is no trick — if you wrote it yourself and understood it, you will answer fine.

If you wrote a good answer to Q5 (QR code vs blockchain), he will almost certainly ask about it. That question is the heart of the entire BlockVerify project.

---

## Stuck? Use These

| Resource | Link |
|---|---|
| The 3Blue1Brown video (watch first) | https://www.youtube.com/watch?v=bBC-nXj3Ng4 |
| IBM — What is Blockchain? (skim) | https://www.ibm.com/topics/blockchain |
| Ethereum for beginners | https://ethereum.org/en/what-is-ethereum/ |
| What is gas? | https://ethereum.org/en/developers/docs/gas/ |

---

*BlockVerify — SHELL Club VNIT Nagpur 2026*
*Week 1 deliverable — due before Week 2 begins*
